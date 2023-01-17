import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {useData} from "../../../modules/context/DataContext";
import DropChildren from "../../DropChildren";
import CustomImage from "../../CustomImage";
import {useRouter} from "next/router";

const UserProfile = () => {
  const { profile } = useData();
  const router = useRouter();
  return (
    <DropChildren
      toggle={
        <div
          className="inline-flex bg-primary p-3 rounded text-white justify-center items-center group max-w-[150px]"
          aria-haspopup="true"
        >
          <CustomImage
            className="w-8 h-8 rounded-full border border-white"
            src={'/asserts/images/placeholder.png'}
            errorImage="/images/avatars/avatar.png"
            width={32}
            height={32}
            alt="User"
          />

          <div className="flex items-center truncate">
            <span className="truncate font-sans ml-2 hidden 2xl:block text-sm font-medium group-hover:text-white/80">
              {profile?.fullName}
            </span>
            <svg
              className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
              viewBox="0 0 12 12"
            >
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div>
        </div>
      }
    >
      <div className="flex flex-col">

        <Link href="/logout">
          <button className="cursor-pointer w-full font-bold px-6 py-1 hover:text-primary hover:bg-white/60">
            Logout
          </button>
        </Link>
        <Link href="/dashboard">
          <button
            className="cursor-pointer w-full font-bold px-6 py-1 hover:text-primary hover:bg-white/60"
          >
            Dashboard
          </button>
        </Link>

      </div>
    </DropChildren>
  );
};

export default UserProfile;
