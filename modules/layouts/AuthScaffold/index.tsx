const AuthScaffold = ({ children }: { children: any }) => {
    return <div className={"flex justify-center items-center w-screen h-screen bg-primary"}>
        {children}
    </div>
}

export default AuthScaffold