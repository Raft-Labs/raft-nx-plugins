import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IconButton,
  Link,
  PrimaryButton,
  TooltipHost,
} from '@fluentui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from 'urql';
import { IDeleteButtonProps } from './types';

export const DeleteButton = ({
  id,
  type = 'primary',
  mutation,
  title = 'Delete',
}: IDeleteButtonProps) => {
  const router = useRouter();
  const { resource } = router.query;
  const [hide, setHide] = useState<boolean>(true);
  const [, deleteMutation] = useMutation(mutation);
  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Delete',
    closeButtonAriaLabel: 'Close',
    subText: 'Do you want to delete the current record?',
  };
  const toggleHide = () => {
    setHide((prev) => !prev);
  };
  return (
    <>
      {type === 'link' ? (
        <Link onClick={toggleHide} underline>
          {title}
        </Link>
      ) : type === 'primary' ? (
        <PrimaryButton text={title} onClick={toggleHide} />
      ) : (
        <TooltipHost content={title}>
          <IconButton iconProps={{ iconName: 'Delete' }} onClick={toggleHide} />
        </TooltipHost>
      )}
      <Dialog
        hidden={hide}
        onDismiss={toggleHide}
        dialogContentProps={dialogContentProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={toggleHide} text="Delete" />
          <DefaultButton
            onClick={() => {
              deleteMutation({ id });
              router.push(`/${resource}/list`);
            }}
            text="Cancel"
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};
