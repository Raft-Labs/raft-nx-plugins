import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .email('Email must be valid')
    .required('Please enter your ${label}')
    .label('Email'),
  password: yup
    .string()
    .required('Please enter your ${label}')
    .label('Password'),
});
const loginSchema = yupResolver(schema);

export default loginSchema;
