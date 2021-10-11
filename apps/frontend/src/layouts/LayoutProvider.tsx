import React from 'react';
import { ILayoutProvider } from '../types/interfaces';
import MainLayout from './MainLayout';

const LayoutProvider = ({ children, resources }: ILayoutProvider) => {
  return <MainLayout resources={resources}>{children}</MainLayout>;
};

export default LayoutProvider;
