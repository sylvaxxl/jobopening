import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import Navbar from "../components/navbar/navbar";
import {UserProvider} from "../components/userContext"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin=""
      />
    </UserProvider>
  );
}

export default MyApp;
