import { IconButton, PrimaryButton, TooltipHost } from '@fluentui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IActionButtonWithIdProps } from './types';

export const EditButton = ({
  id,
  type = 'primary',
  tooltip = 'Edit',
}: IActionButtonWithIdProps) => {
  const router = useRouter();
  const { resource } = router.query;

  if (type === 'primary') {
    return (
      <PrimaryButton
        text="Edit"
        onClick={() => router.push(`/${resource}/${id}/edit`)}
      />
    );
  }
  return (
    <TooltipHost content={tooltip}>
      <IconButton
        iconProps={{ iconName: 'Edit' }}
        onClick={() => router.push(`/${resource}/${id}/edit`)}
      />
    </TooltipHost>
  );
};
