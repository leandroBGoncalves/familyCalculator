import { createClient } from "@supabase/supabase-js";
import { parseCookies } from "nookies";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
import Head from "next/head";

import Dashboard from "../components/DashBoard/DashBord";
import Header from "../components/Header/Header";

export default function Home() {

  return (
    <>
      <Head>
        <title>Home | family calculator</title>
      </Head>
      <Header />
      <Dashboard />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { ["Family_token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
