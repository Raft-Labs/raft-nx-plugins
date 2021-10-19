import { IconButton, Link, PrimaryButton, TooltipHost } from '@fluentui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IActionButtonWithIdProps } from './types';

export const EditButton = ({
  id,
  type = 'primary',
  title = 'Edit',
}: IActionButtonWithIdProps) => {
  const router = useRouter();
  const { resource } = router.query;
  const onClick = () => router.push(`/${resource}/${id}/edit`);
  return type === 'link' ? (
    <Link onClick={onClick} underline>
      {title}
    </Link>
  ) : type === 'primary' ? (
    <PrimaryButton text={title} onClick={onClick} />
  ) : (
    <TooltipHost content={title}>
      <IconButton iconProps={{ iconName: 'Edit' }} onClick={onClick} />
    </TooltipHost>
  );
};
