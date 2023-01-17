import Image from "next/image";
import React, { useState } from 'react';
import axios from "axios";
import swal from "sweetalert";
import Constants from "../../../system/constants";
import joi from "joi";
import {joiResolver} from "@hookform/resolvers/joi";
import {formatJoiErorr} from "../../../system/format";
import {useForm} from "react-hook-form";



const fields = {
    fullName: joi.string().required(),
    userName: joi.string().required(),
    email: joi.string().required(),
    company: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string()
    .valid(joi.ref('password'))
    .required()
    .messages({
        'any.only': 'Confirm Password must match with Password',
    })
};

const schema = joi.object(fields);

const SignupActivity = () => {
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

    // const [formData, setFormData] = useState({
    //     fullName: '',
    //     userName: '',
    //     email: '',
    //     password: '',
    //     company:''
    //   });
    
    //   const handleChange = (event:any) => {
    //     setFormData({
    //       ...formData,
    //       [event.target.name]: event.target.value
    //     });
    //   }
    
      const onSubmit = async (query: any) => {
        //event.preventDefault();
        console.log("quee", query)
        // query.delete('confirmPassword');
        delete query.confirmPassword;
        axios.post(Constants.BACKEND_URL + Constants.endpoints.SIGNUP, {...query})
          .then(response => {
            swal('Signup successfully!', response.data.message, 'success').then(()=>reset());
          })
          .catch(error => {
            swal('Signup fail!', error.response.data.message || "Fail to signup", 'error');
          });
      }
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
            <form className={"flex flex-col mt-5 gap-5 w-full text-black_light"} onSubmit={event => {
                handleSubmit(onSubmit)(event);
            }}>
                <label className={"flex flex-col"}>
                    <span>
                    Names
                </span>
                    {errors.fullName?.message && (
                        <p className="mt-1 text-red-500">
                            {formatJoiErorr(`${errors.fullName.message}`)}
                        </p>
                    )}
                    <input type={"text"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"your names"} {...register("fullName")} name="fullName"/>
                </label>
                <label className={"flex flex-col"}>
                    <span>
                    Username
                </span>
                    {errors.userName?.message && (
                        <p className="mt-1 text-red-500">
                            {formatJoiErorr(`${errors.userName.message}`)}
                        </p>
                    )}
                    <input type={"text"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"username"} {...register("userName")} name="userName"/>
                </label>

                <label className={"flex flex-col"}>
                    <span>
                    Company
                </span>
                    {errors.company?.message && (
                        <p className="mt-1 text-red-500">
                            {formatJoiErorr(`${errors.company.message}`)}
                        </p>
                    )}
                    <input type={"text"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"company ltd"} {...register("company")} name="company"/>
                </label>

                <label className={"flex flex-col"}>
                    <span>
                    Email
                </span>
                    {errors.email?.message && (
                        <p className="mt-1 text-red-500">
                            {formatJoiErorr(`${errors.email.message}`)}
                        </p>
                    )}
                    <input type={"email"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} placeholder={"adeli....@gmail.com"} {...register("email")} name="email"/>
                </label>
                <label className={"flex flex-col"}>
                    <span>Password</span>
                    {errors.password?.message && (
                        <p className="mt-1 text-red-500">
                            {formatJoiErorr(`${errors.password.message}`)}
                        </p>
                    )}
                    <input id={"password_input_c"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} type={"password"} placeholder={"************"} {...register("password")} name="password"/>
                </label>
                <label className={"flex flex-col"}>
                    <span>Confirm password</span>
                    {errors.confirmPassword?.message && (
                        <p className="mt-1 text-red-500">
                            {formatJoiErorr(`${errors.confirmPassword.message}`)}
                        </p>
                    )}
                    <input id={"password_input_conf"} className={"p-4 rounded-xl w-full bg-[#DEE7FF]"} type={"password"} placeholder={"************"}  {...register("confirmPassword")} name="confirmPassword"/>
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