import { IconButton, Link, PrimaryButton, TooltipHost } from '@fluentui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IActionButtonWithIdProps } from './types';

export const ShowButton = ({
  id,
  type = 'primary',
  title = 'Show',
}: IActionButtonWithIdProps) => {
  const router = useRouter();
  const { resource } = router.query;
  const onClick = () => router.push(`/${resource}/${id}/show`);
  return type === 'link' ? (
    <Link onClick={onClick} underline>
      {title}
    </Link>
  ) : type === 'primary' ? (
    <PrimaryButton text={title} onClick={onClick} />
  ) : (
    <TooltipHost content={title} id={id}>
      <IconButton iconProps={{ iconName: 'RedEye' }} onClick={onClick} />
    </TooltipHost>
  );
};
