import { IconButton, PrimaryButton, TooltipHost } from '@fluentui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IActionButtonWithoutIdProps } from './types';

export const CreateButton = ({
  type = 'primary',
  tooltip = 'Create',
}: IActionButtonWithoutIdProps) => {
  const router = useRouter();
  const { resource } = router.query;

  return type === 'primary' ? (
    <PrimaryButton
      text="Create"
      onClick={() => router.push(`/${resource}/create`)}
    />
  ) : (
    <TooltipHost content={tooltip}>
      <IconButton
        iconProps={{ iconName: 'Add' }}
        onClick={() => router.push(`/${resource}/create`)}
      />
    </TooltipHost>
  );
};
