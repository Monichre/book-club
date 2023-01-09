import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { CssBaseline } from '@nextui-org/react';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    const cache = createCache()
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <StyleProvider cache={cache}>
                <App {...props} />
              </StyleProvider>
            ),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          ...React.Children.toArray([initialProps.styles]),
          sheet.getStyleElement(),
          <style
            data-test='extract'
            dangerouslySetInnerHTML={{ __html: extractStyle(cache) }}
          />,
        ],
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />

          <script src='https://www.google.com/books/jsapi.js'></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
