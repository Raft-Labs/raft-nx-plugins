import { Linter } from '@nrwl/linter';
import { SupportedStyles } from '@nrwl/react';
export interface NxAdminGeneratorSchema {
  name: string;
  style?: SupportedStyles;
  server?: string;
  skipFormat?: boolean;
  directory?: string;
  tags?: string;
  unitTestRunner?: 'jest' | 'none';
  e2eTestRunner?: 'cypress' | 'none';
  linter?: Linter;
  skipWorkspaceJson?: boolean;
  js?: boolean;
  setParserOptionsProject?: boolean;
  standaloneConfig?: boolean;
}
