import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <RecoilRoot>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};

export default MyApp;
