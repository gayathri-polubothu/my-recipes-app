import {useCookies} from "react-cookie";

export const useCookieState = ({key, value}) => {
    const [cookies, setCookies] = useCookies()

    const setCookie = ()=> {
        setCookies(key, value)
    }
    if(key && value) {
        setCookie()
    }
    return cookies[key]
}
