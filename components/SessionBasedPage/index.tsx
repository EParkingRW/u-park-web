import Secure from "../../system/helpers/secureLs";
import {useRouter, } from "next/router";
import {useEffect, useState} from "react";

const getPlaceHolder = () => {
    return (
        <div className="w-full h-full border border-blue-300 shadow rounded-md p-4 mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const SessionBased = ({children}:any) =>{
    const router = useRouter();
    const [content, setContent] = useState(getPlaceHolder())
    useEffect(() =>{
        const isLoggedIn = Secure.getToken() === null || undefined
        if(isLoggedIn){
            setContent(children)
        }else{
            setContent(<p>Redirecting</p>)
            router.push("/login").catch(error => {console.error(error)})
        }
    },[children, router])


    return content
}