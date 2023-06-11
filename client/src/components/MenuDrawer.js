import React, { useState } from "react";
import {
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
} from "@mui/material";
import Menu from '@mui/icons-material/Menu'
import { Link } from "react-router-dom";

function MenuDrawerComponent({cookies, logout}) {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <Drawer
                sx={{
                    color: 'primary.main'
                }}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/">Home</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="#">Recipes</Link>
                            <List>
                                <ListItem>
                                    <ListItemText>
                                        <Link to="/">All Recipes</Link>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <Link to="/create-recipe">Create Recipe</Link>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <Link to="/saved-recipes">Favorite Recipes</Link>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    {cookies.access_token ? (
                        <Button variant={'contained'} onClick={()=>{
                            logout()
                            setOpenDrawer(false)
                        }}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link to="/Login">Login</Link>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link to="/Register">Register</Link>
                                </ListItemText>
                            </ListItem>
                        </>
                    )}
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <Menu />
            </IconButton>
        </>
    );
}
export default MenuDrawerComponent;