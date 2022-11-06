import Head from 'next/head'
import React from "react";
import LandingPage from "../modules/activities/LandingActivity";
import Scaffold from "../modules/layouts/Scaffold";

export default function Home() {

    return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="e parking website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Scaffold>
            <LandingPage/>
        </Scaffold>
    </>
  )
}
