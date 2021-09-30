import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, FormItemProps, Image, message, Upload, UploadProps } from 'antd';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import { RcFile } from 'antd/lib/upload';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface ImageUploadFieldProps extends UploadProps {
  name: string;
  label: string;
  customHelp?: string;
  formHook: UseFormReturn<any>;
  formItemProps?: FormItemProps;
  buttonLabel: string;
  cropProps?: ImgCropProps;
  url?: string;
}
const FormItem = Form.Item;

export const ImageUploadField = ({
  name,
  label,
  formHook,
  customHelp,
  formItemProps,
  buttonLabel,
  cropProps,
  url,
  ...props
}: ImageUploadFieldProps) => {
  const {
    control,
    formState: { errors },
  } = formHook;

  const [dataUri, setDataUri] = useState(url);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Controller
      name={name}
      render={({ field }) => {
        const { onChange, value } = field;

        const beforeUpload = async (file: RcFile) => {
          setLoading(true);
          const isJpgOrPng =
            file.type === 'image/jpeg' || file.type === 'image/png';
          if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
          }
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            message.error('File must smaller than 2MB!');
          }
          if (!(isJpgOrPng && isLt2M)) {
            setLoading(false);
            return isJpgOrPng && isLt2M;
          }
          onChange(file);
          const fileUrl = await getBase64(file);
          setDataUri(fileUrl as string);
          setLoading(false);
          return isJpgOrPng && isLt2M;
        };
        const getBase64 = async (file: RcFile) => {
          if (file) {
            const data: string | ArrayBuffer = await new Promise((resolve) => {
              const reader = new FileReader();
              reader?.readAsDataURL(file);
              reader.onload = () => resolve(reader?.result as string);
            });

            return data;
          }
          return '';
        };

        const uploadButton = (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );

        return (
          <FormItem
            {...formItemProps}
            label={label}
            validateStatus={
              !isEmpty(errors) && errors?.[name] ? 'error' : 'validating'
            }
            help={
              errors && errors?.[name]
                ? errors[name]?.message
                : customHelp || undefined
            }
          >
            <ImgCrop {...cropProps}>
              <Upload
                {...props}
                listType="picture-card"
                showUploadList={false}
                maxCount={1}
                beforeUpload={beforeUpload}
                onRemove={() => {
                  onChange(undefined);
                }}
              >
                {url && !value ? (
                  <Image width={120} preview={false} src={url} />
                ) : value ? (
                  <Image width={120} preview={false} src={dataUri} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </ImgCrop>
          </FormItem>
        );
      }}
      control={control}
    />
  );
};
