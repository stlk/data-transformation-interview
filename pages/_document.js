import Document, { Head, Main, NextScript } from "next/document";

export default class MainDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css"
            rel="stylesheet"
          />
        </Head>
        <body className="font-sans bg-grey-lighter flex justify-center w-full">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
