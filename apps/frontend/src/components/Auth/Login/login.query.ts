import { gql } from 'urql';

export const login = gql`
  mutation login($data: loginInput!) {
    login(object: $data) {
      display_name
      jwt_expires_in
      jwt_token
      refresh_token
      user_id
    }
  }
`;
