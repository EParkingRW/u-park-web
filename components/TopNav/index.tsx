import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Secure from "../../system/helpers/secureLs";
import axios from "axios";
import Constants from "../../system/constants";
import {getHeaders} from "../../system/constants/config";
import keys from "../../system/constants/keys";

const TopNav = () => {
    const [token, setToken] = useState(null)
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

  const handleLogout = () => {
      axios.post(Constants.BACKEND_URL + Constants.endpoints.LOGOUT,{}, getHeaders()).then(() =>{
          Secure.removeToken()
          Secure.remove(keys.USER_INFO as string)
          router.push("/").catch(error => console.error("error", error))
      }).catch(error =>{
          console.error("error", error)
      });
  }
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
              token ? <button onClick={()=>handleLogout()} className="cursor-pointer font-bold uppercase px-12 py-3 rounded-full bg-[#BC0063]">
                  Logout
              </button>:<Link href="/login">
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
