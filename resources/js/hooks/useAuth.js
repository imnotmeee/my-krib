import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { logout } from "../axios/authCalls";

const useAuth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!cookies.token) {
            removeCookie('token');
            removeCookie('user');
        }
        setToken(cookies.token);
        setUser(cookies.user);
    }, [cookies.token]);
  
    const storeData = ({data}) => {
        const expirationDate = new Date(data.expiration);
        setCookie('token', data.token, {path: '/', expires: expirationDate});
        setCookie('user', data.user,  {path: '/', expires: expirationDate});
    }

    const destroy = async () => {
        logout(token);
        removeCookie('token');
        removeCookie('user');
      }
  
    return {token, user, destroy, storeData};
  }
  
  
  export default useAuth;

