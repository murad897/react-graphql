import "../styles/globals.css";
import { Link } from "@mui/material";

function MyApp({ Component, pageProps }) {
  console.log(Component, pageProps, "gfdgdf");
  return <Component {...pageProps} />;
}

export default MyApp;
