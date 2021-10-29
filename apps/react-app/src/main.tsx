import { GraphQLProvider } from '@raftlabs/hasura-react';
import { AuthProvider } from '@raftlabs/hbp-react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/app';
import { HASURA_BASE_URL } from './config';
import { auth } from './helpers/hbp-helper';

ReactDOM.render(
  <StrictMode>
    <AuthProvider auth={auth}>
      <GraphQLProvider auth={auth} url={HASURA_BASE_URL}>
        <App />
      </GraphQLProvider>
    </AuthProvider>
  </StrictMode>,
  document.getElementById('root')
);
