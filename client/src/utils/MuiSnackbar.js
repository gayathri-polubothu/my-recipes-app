import {Snackbar, Button, Alert, AlertProps} from "@mui/material";
import {useState, forwardRef} from "react";

const SnackbarAlert = forwardRef(
    function SnackbarAlert(props, ref){
        return <Alert elevation={6} ref={ref} {...props}/>
    }
)
export const MuiSnackbar = ({message, severity, setOpen, open}) => {

    const handleClose = (event, reason)=> {
        if(reason==='clickaway') return
        setOpen(false)
    }
    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <SnackbarAlert onClose={handleClose} severity={severity}>
                    {message}
                </SnackbarAlert>
            </Snackbar>
        </>
    )
}