import React from 'react';
import { ILayoutProvider } from '../types/interfaces';

const LayoutProvider = ({ children, resources }: ILayoutProvider) => {
  return <div>{children}</div>;
};

export default LayoutProvider;
