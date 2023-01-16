import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Secure from "../../system/helpers/secureLs";
import axios from "axios";
import Constants from "../../system/constants";
import {getHeaders} from "../../system/constants/config";
import keys from "../../system/constants/keys";
import CustomImage from "../CustomImage";
import DropChildren from "../DropChildren";
import {useData} from "../../modules/context/DataContext";
import UserProfile from "./UserProfile";

const TopNav = () => {
    const [token, setToken] = useState(null)
    const {profile} = useData()
    useEffect(() => {
        setToken(Secure.getToken())
    }, [])
  const router = useRouter();
  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex absolute top-0 gap-x-12 w-full px-4 md:px-8 py-2 z-60 bg-primary/30 text-white">
      <div className={"flex gap-1"}>
        <Image
            width={"40"} height={40}
            src={"/asserts/images/u_park_logo.svg"} alt={""}/>
      <p className="cursor-pointer font-bold uppercase py-3">park</p>
      </div>

      <div className="flex space-x-8 items-center ml-auto">
          {
              token ? <UserProfile/>:<Link href="/login">
                  <p className="cursor-pointer font-bold uppercase px-12 py-3 rounded-full bg-[#BC0063]">
                      Login
                  </p>
              </Link>
          }

      </div>
    </div>
  );
};

export default TopNav;
