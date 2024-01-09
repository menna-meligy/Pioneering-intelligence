const AuthLayout = ({children} :  {children : React.ReactNode;}) => {
    return ( <div className="flex place-items-center justify-center h-full bg-gray-900">
        {children}
    </div> );
}
 
export default AuthLayout;