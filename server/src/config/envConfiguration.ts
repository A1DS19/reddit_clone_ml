export interface IEnvConfiguration {
  PORT: number;
  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

export const envConfiguration = (): IEnvConfiguration => {
  return {
    PORT: parseInt(process.env.PORT),
    DB_HOST: process.env.DB_HOST,
    DB_TYPE: process.env.DB_TYPE,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: parseInt(process.env.DB_PORT),
    DB_USERNAME: process.env.DB_USERNAME,
  };
};
