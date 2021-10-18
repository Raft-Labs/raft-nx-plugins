import { IconButton, Link, PrimaryButton, TooltipHost } from '@fluentui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IActionButtonWithoutIdProps } from './types';

export const CreateButton = ({
  type = 'primary',
  title = 'Create',
}: IActionButtonWithoutIdProps) => {
  const router = useRouter();
  const { resource } = router.query;
  const onClick = () => router.push(`/${resource}/create`);
  return type === 'link' ? (
    <Link onClick={onClick} underline>
      {title}
    </Link>
  ) : type === 'primary' ? (
    <PrimaryButton text={title} onClick={onClick} />
  ) : (
    <TooltipHost content={title}>
      <IconButton iconProps={{ iconName: 'Add' }} onClick={onClick} />
    </TooltipHost>
  );
};
