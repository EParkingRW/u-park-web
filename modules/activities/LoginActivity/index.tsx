import Image from "next/image";
import React from "react";

const LoginActivity = () => {
    return<>
        <div className={"flex flex-col w-[380px] h-[582px] gap-2 bg-white rounded-2xl items-center py-5 px-5"}>
            <Image
                width={48} height={48}
                src={"/asserts/images/u_park_logo.svg"} alt={""}/>
            <span className={"text-[#A4A6B3] bold"}>
                C Park
            </span>
            <span className={"text-2xl mt-5"}>
                Log In to U park
            </span>
            <span className={"text-[#A4A6B3]"}>
                Enter your email and password below
            </span>
            <form className={"flex flex-col mt-5 gap-5 w-full text-black_light"}>
                <label className={"flex flex-col"}>
                    <span>
                    Email
                </span>
                    <input type={"email"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"adeli....@gmail.com"}/>
                </label>

                <div className={"flex flex-col"}>
                    <div className={"flex justify-between"}>
                        <label>Password</label> <span className={"cursor-pointer"}>Forgot password?</span>
                    </div>

                    <input id={"password_input"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} type={"password"} placeholder={"************"}/>
                </div>
                <button className={"py-4 bg-primary text-white w-full rounded-2xl"}>Login</button>
            </form>
            <span>
                <span>Don’t have an account?</span>
                <span className={"cursor-pointer pl-1 text-primary"}>Sign up</span>
            </span>
        </div>
    </>

}

export default LoginActivity;