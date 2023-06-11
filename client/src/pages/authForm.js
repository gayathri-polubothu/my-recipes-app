import { Button, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
export const AuthForm = ({username, password, setUsername, setPassword, label, email ,setEmail, handleSubmit}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Stack direction={'column'} spacing={4} m={8} sx={{
            backgroundColor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            maxWidth: 600,
            paddingBottom: 4,
            display: 'inline-block'
        }}>
            <Typography sx={{textAlign: 'center'}} variant={'h5'}>{label}</Typography>
            <Stack direction='column' spacing={2}>
                <TextField label={'User Name'} required
                           helperText={!username ? 'Required': null}
                           variant={'outlined'} value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <TextField label={'Password'} required value={password} onChange={(e)=> setPassword(e.target.value)}
                           type={showPassword ? 'text': 'password'}
                           InputProps={{endAdornment: showPassword ? <Visibility onClick={()=>setShowPassword(false)}/> : <VisibilityOff onClick={()=>setShowPassword(true)}/>}}
                           helperText={!password ?  'Required' : label === 'Register' ? 'Do not share your password to anyone': null}
                           variant={'outlined'}/>
                {(email === '' || email )&&(
                    <TextField label={'Email'} variant={'outlined'} value={email} onChange={(e)=> setEmail(e.target.value)}/>
                )}
                <Button variant="contained" onClick={handleSubmit} disabled={!username || !password}>{label}</Button>
            </Stack>
        </Stack>
    )
}
