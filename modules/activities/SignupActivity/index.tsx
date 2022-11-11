import Image from "next/image";
import React from "react";

const SignupActivity = () => {
    return<>
        <div className={"flex flex-col w-[380px] gap-2 bg-white rounded-2xl items-center py-5 px-5"}>
            <Image
                width={48} height={48}
                src={"/asserts/images/u_park_logo.svg"} alt={""}/>
            <span className={"text-[#A4A6B3] bold"}>
                C Park
            </span>
            <span className={"text-2xl mt-5"}>
                Sign up to C park
            </span>
            <span className={"text-[#A4A6B3]"}>
                Enter your informations below
            </span>
            <form className={"flex flex-col mt-5 gap-5 w-full text-black_light"}>
                <label className={"flex flex-col"}>
                    <span>
                    Names
                </span>
                    <input type={"text"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"your names"}/>
                </label>
                <label className={"flex flex-col"}>
                    <span>
                    Username
                </span>
                    <input type={"text"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"username"}/>
                </label>

                <label className={"flex flex-col"}>
                    <span>
                    Email
                </span>
                    <input type={"email"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"adeli....@gmail.com"}/>
                </label>


                <label className={"flex flex-col"}>
                    <span>Password</span>
                    <input id={"password_input_c"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} type={"password"} placeholder={"************"}/>
                </label>
                <label className={"flex flex-col"}>
                    <span>Confirm password</span>
                    <input id={"password_input_conf"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} type={"password"} placeholder={"************"}/>
                </label>


                <button className={"py-4 bg-primary text-white w-full rounded-2xl"}>Sign up</button>
            </form>
            <span>
                <span>Already have an account?</span>
                <span className={"cursor-pointer pl-1 text-primary"}>Login</span>
            </span>
        </div>
    </>

}

export default SignupActivity;