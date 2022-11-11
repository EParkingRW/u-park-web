const AuthScaffold = ({ children }: { children: any }) => {
    return <div className={"flex justify-center items-center py-5 w-screen min-h-screen bg-primary"}>
        {children}
    </div>
}

export default AuthScaffold