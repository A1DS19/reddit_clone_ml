import dynamic from 'next/dynamic';
import React from 'react';

export const NonSSRPage = (Component: React.FunctionComponent) =>
  dynamic(() => Promise.resolve(Component), { ssr: false });
