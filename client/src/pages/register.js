import {useState} from "react";
import {AuthForm} from "./authForm";
import * as Services from "../Services/services";
import {MuiSnackbar} from "../utils/MuiSnackbar";

export const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({})


    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await Services.registerUser({username, password, email})
        console.log('-response in register--', response)
        if(response.error) {
           setData({
                   message:'Registration Failed!',
                   severity: 'error'
               }
           )
        }else {
            setData({
                    message: response.message || 'Registration Successful!',
                    severity: 'success'
                }
            )
        }
        setOpen(true)
        setUsername('');
        setPassword('')
        setEmail('')
    }
    return (
        <>
            <AuthForm
                username={username} password={password}
                setUsername={setUsername} setPassword={setPassword}
                email={email} setEmail={setEmail} label={'Register'}
                handleSubmit={handleSubmit}
            />
            {open && (
                <MuiSnackbar severity={data.severity} message={data.message} setOpen={setOpen} open={true}/>
            )}
        </>
    )
}
