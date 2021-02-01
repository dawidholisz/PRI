import React, { useState,useContext } from 'react'

const AuthContext = React.createContext()

const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(window.sessionStorage.getItem('user'))


    const _setUser = (user)=>{
        window.sessionStorage.setItem('user',user)
        setUser(user)
    }

    return <AuthContext.Provider value={{user,setUser:_setUser, isAuth: !!user}}>
        {children}
    </AuthContext.Provider>
}

const useAuth = ()=>useContext(AuthContext)

export { AuthProvider, useAuth}