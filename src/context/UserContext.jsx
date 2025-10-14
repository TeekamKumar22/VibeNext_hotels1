import { useContext, createContext, useEffect, useState } from "react";

const AuthContext = createContext();
const Authprovider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });
    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            try {
                const parseData = JSON.parse(data);
                setAuth({
                    user: parseData?.user || null,
                    token: parseData?.token || "",
                });
            } catch (error) {
                console.error("Error parsing auth data from localStorage:", error);
                localStorage.removeItem("auth"); // Clear invalid data
            }
        } else {
            console.log("No auth data found in localStorage");
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => 
          useContext(AuthContext);
       
        
//  const { auth, setAuth } = useContext(AuthContext);  
    
export { useAuth,  Authprovider };


