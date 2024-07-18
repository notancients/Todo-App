import { useState, useRef, createContext, useContext } from 'react';


const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: any }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);
    
    const value = {
        currentUser
    }


    return(
    <>
    <AuthContext.Provider value={value}>
    </AuthContext.Provider>
    </>
    )
}