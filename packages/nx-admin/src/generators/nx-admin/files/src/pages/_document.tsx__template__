/* eslint-disable react/display-name */
import { InjectionMode, resetIds, Stylesheet } from '@fluentui/react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';
const stylesheet = Stylesheet.getInstance();
stylesheet.setConfig({
  injectionMode: InjectionMode.none,
  namespace: 'server',
});
export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    stylesheet.reset();
    resetIds();
    const page = renderPage((App) => (props) => <App {...props} />);
    return { ...page, styleTags: stylesheet.getRules(true) };
  }
  render() {
    return (
      <Html>
        <Head>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: this.props.styleTags }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
