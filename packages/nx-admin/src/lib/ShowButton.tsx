import { IconButton, PrimaryButton, TooltipHost } from '@fluentui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IActionButtonWithIdProps } from './types';

export const ShowButton = ({
  id,
  type = 'primary',
  tooltip = 'Show',
}: IActionButtonWithIdProps) => {
  const router = useRouter();
  const { resource } = router.query;

  return type === 'primary' ? (
    <PrimaryButton
      text="Show"
      onClick={() => router.push(`/${resource}/${id}/show`)}
    />
  ) : (
    <TooltipHost content={tooltip} id={id}>
      <IconButton
        iconProps={{ iconName: 'RedEye' }}
        onClick={() => router.push(`/${resource}/${id}/show`)}
      />
    </TooltipHost>
  );
};
