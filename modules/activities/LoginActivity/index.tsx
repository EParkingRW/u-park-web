import Image from "next/image";
import React, {useState} from "react";
import joi from 'joi';
import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";
import {formatJoiErorr} from "../../../system/format";
import axios from "axios";
import Constants from "../../../system/constants";
import Secure from "../../../system/helpers/secureLs";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Keys from "../../../system/constants/keys";
import {useData} from "../../context/DataContext";
import {getHeaders} from "../../../system/constants/config";


const fields = {
    email: joi.string().required(),
    password: joi.string().required(),
};

const schema = joi.object(fields);

const LoginActivity = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const { setProfile } = useData();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });


    async function getAndSetProfile(){
        axios.get(Constants.BACKEND_URL + Constants.endpoints.PROFILE, getHeaders()).then(response =>{
            console.log("response", response.data.profile)
            setProfile({...response.data.profile})
            Secure.set(Keys.USER_INFO as string, { ...response.data.profile });
        }).catch(error =>{
           console.error("error", error)
        });
    }
    const onSubmit = async (query: any) => {
        axios.post(Constants.BACKEND_URL + Constants.endpoints.LOGIN, {...query}).then(response =>{

            const {
                data: { token },
            } = response;
            Secure.setToken(token);
            getAndSetProfile()


            router.push("/dashboard")
        }).catch(error => {
            console.error(error)
            swal('Login fail!', error.response.data.message || 'incorrect username or password', 'error');
        })
    }

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
            <form onSubmit={event => {
                handleSubmit(onSubmit)(event);
            }}
                className={"flex flex-col mt-5 gap-5 w-full text-black_light"}>
                <label className={"flex flex-col"}>
                    <span>
                    Email
                </span>
                    {errors.email?.message && (
                        <p className="mt-1 text-red-500">
                            {formatJoiErorr(`${errors.email.message}`)}
                        </p>
                    )}
                    <input {...register("email")}
                        type={"email"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"adeli....@gmail.com"}/>
                </label>

                <div className={"flex flex-col"}>
                    <div className={"flex justify-between"}>
                        <label>Password</label> <span className={"cursor-pointer"}>Forgot password?</span>
                    </div>
                    {errors.password?.message && (
                        <p className="mt-1 text-red-500">
                            {formatJoiErorr(`${errors.password.message}`)}
                        </p>
                    )}
                    <input {...register("password")}
                        id={"password_input"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} type={"password"} placeholder={"************"}/>
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