import Head from "next/head";
import AuthScaffold from "../../modules/layouts/AuthScaffold";
import SignupActivity from "../../modules/activities/SignupActivity";

const SignPage = () => {
    return <>
        <Head>
            <title>sign up</title>
        </Head>
        <AuthScaffold>
            <SignupActivity/>
        </AuthScaffold>
    </>
}

export default SignPage