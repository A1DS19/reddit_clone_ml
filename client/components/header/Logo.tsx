import React from 'react';
import Image from 'next/image';
import redditLogo from '../../public/reddit_512x512.png';

interface LogoProps {}

export const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <a href='/'>
      <Image src={redditLogo} alt='Reddit logo' width={35} height={35} />
    </a>
  );
};
