import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { IEnvConfiguration } from './envConfiguration';

@Injectable()
export class TypeOrmConfig {
  constructor(private configService: ConfigService<IEnvConfiguration>) {}

  private dev_config(): PostgresConnectionOptions {
    return {
      type: this.configService.get('DB_TYPE'),
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      entities: ['dist/src/entities/**/*.entity.js'],
      migrations: ['dist/src/migrations/**/*.js'],
      synchronize: true,
      logging: 'all',
      logger: 'advanced-console',
    };
  }

  private prod_config(): PostgresConnectionOptions {
    return {
      type: this.configService.get('DB_TYPE'),
      url: process.env.DATABASE_URL,
      entities: ['dist/src/entities/**/*.entity.js'],
      migrations: ['dist/src/migrations/**/*.js'],
      synchronize: false,
      logging: 'all',
      logger: 'advanced-console',
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }

  public getConfiguration(): PostgresConnectionOptions {
    if (process.env.NODE_ENV === 'development') {
      return this.dev_config();
    }
    return this.prod_config();
  }
}
