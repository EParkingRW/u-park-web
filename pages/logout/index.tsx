import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Http from "../../utils/http";
import endpoints from "../../system/constants/endpoints";
import SecureLs from "../../system/helpers/secureLs";
import Keys from "../../system/constants/keys";
import Head from "next/head";

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    Http.axios
      .post(endpoints.LOGOUT)
      .then(() => {
        SecureLs.removeToken();
        SecureLs.remove(Keys.USER_INFO as string);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        router
          .push('/login')
          .then(() => {
            router.reload();
          })
          .catch(err => console.error(err));
      });
  }, [router]);
  return (
    <>
        <Head>
            <title>logout</title>
        </Head>

      <div className="flex h-screen w-screen bg-primary text-white justify-center items-center">
        Logout....
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = context => {
  return {
    props: {
      protected: true,
    },
  };
};

export default Logout;
