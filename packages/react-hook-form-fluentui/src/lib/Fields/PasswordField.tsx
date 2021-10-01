import {
  IStyleFunctionOrObject,
  ITextFieldProps,
  ITextFieldStyleProps,
  ITextFieldStyles,
  Label,
  ProgressIndicator,
  Stack,
  StackItem,
  TextField,
} from '@fluentui/react';
import { SharedColors } from '@fluentui/theme';
import { FC, useEffect, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

export interface PasswordFieldProps extends ITextFieldProps {
  formHook: UseFormReturn<any>;
  Styles: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles>;
  name: string;
  strengthMeter?: boolean;
}

const isNumberRegx = /\d/;
const upperCaseRegx = /[A-Z]/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export const PasswordInputField: FC<PasswordFieldProps> = ({
  formHook,
  Styles,
  name,
  strengthMeter = false,
  ...props
}) => {
  const { control } = formHook;
  const [passwordFocussed, setPasswordFocussed] = useState(false);

  const [passwordValidity, setPasswordValidity] = useState({
    typing: 0,
    minChar: 0,
    number: 0,
    specialChar: 0,
    upperCase: 0,
  });

  const [strength, setStrength] = useState<0 | 0.5 | 1.5 | 2.5 | 3.5 | 4.5>(0);

  const strengthValues = {
    0: {
      percent: 0,
      color: SharedColors.gray40,
      text: 'Strength',
    },
    0.5: {
      percent: 0.2,
      color: SharedColors.gray30,
      text: 'Too Short',
    },
    1.5: {
      percent: 0.25,
      color: SharedColors.red20,
      text: 'Weak',
    },
    2.5: {
      percent: 0.5,
      color: SharedColors.orangeYellow20,
      text: 'Okay',
    },
    3.5: {
      percent: 0.75,
      color: SharedColors.orange20,
      text: 'Good',
    },
    4.5: {
      percent: 1,
      color: SharedColors.green20,
      text: 'Strong',
    },
  };

  useEffect(() => {
    setStrength(
      // @ts-ignore
      passwordValidity.typing +
        passwordValidity.minChar +
        passwordValidity.number +
        passwordValidity.specialChar +
        passwordValidity.upperCase
    );
  }, [passwordValidity]);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextField
            {...props}
            onChange={(e, value = '') => {
              onChange(value);
              setPasswordValidity({
                typing: value.length >= 1 ? 0.5 : 0,
                minChar: value.length >= 8 ? 1 : 0,
                number: isNumberRegx.test(value) ? 1 : 0,
                specialChar: specialCharacterRegx.test(value) ? 1 : 0,
                upperCase: upperCaseRegx.test(value) ? 1 : 0,
              });
            }}
            value={value}
            onBlur={() => {
              onBlur();
              setPasswordFocussed(false);
            }}
            name={name}
            errorMessage={error && error.message}
            type="password"
            canRevealPassword
            revealPasswordAriaLabel="Show password"
            onFocus={() => setPasswordFocussed(true)}
            styles={{ root: { width: '250px' } }}
          />
          {strengthMeter && (
            <ProgressIndicator
              styles={{
                progressBar: { background: strengthValues[strength].color },
              }}
              percentComplete={strengthValues[strength].percent}
              progressHidden={!passwordFocussed}
            />
          )}
          <Stack>
            <StackItem align="end">
              <Label
                styles={{
                  root: {
                    lineHeight: 0,
                    color: strengthValues[strength].color,
                    marginBottom: '10px',
                    display: passwordFocussed ? '' : 'none',
                  },
                }}
              >
                {strengthValues[strength].text}
              </Label>
            </StackItem>
          </Stack>
        </>
      )}
    />
  );
};
