import Head from "next/head";
import LoginActivity from "../../modules/activities/LoginActivity";
import AuthScaffold from "../../modules/layouts/AuthScaffold";

const LoginPage = () => {
    return <>
        <Head>
            <title>U park Login</title>
        </Head>
        <AuthScaffold>
            <LoginActivity/>
        </AuthScaffold>
    </>
}

export default LoginPage