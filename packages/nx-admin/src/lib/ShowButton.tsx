import { IconButton, PrimaryButton, TooltipHost } from '@fluentui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IActionButtonProps } from './types';

export const ShowButton = ({
  id,
  type = 'primary',
  tooltip = 'Show',
}: IActionButtonProps) => {
  const router = useRouter();
  const { resource } = router.query;

  if (type === 'primary') {
    return (
      <PrimaryButton
        text="Show"
        onClick={() => router.push(`/${resource}/${id}/show`)}
      />
    );
  }
  return (
    <TooltipHost content={tooltip} id={id}>
      <IconButton
        iconProps={{ iconName: 'RedEye' }}
        onClick={() => router.push(`/${resource}/${id}/show`)}
      />
    </TooltipHost>
  );
};
