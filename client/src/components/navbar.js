import {Link} from "react-router-dom"
import {
    AppBar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import MenuBook from "@mui/icons-material/MenuBook";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"
import {useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import MenuDrawerComponent from "./MenuDrawer";

export const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [cookies, setCookies] = useCookies('access_token')
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID")
        navigate("/login")
        navigate(0)
    }
    return (
        <AppBar position={'static'}>
            <Toolbar>
                <IconButton size={'large'} edge={'start'} color={'inherit'} aria-label={'logo'}>
                    <MenuBook />
                </IconButton>
                <Typography variant={'h6'} component={'div'} sx={{
                    flexGrow: 1,
                    textAlign: 'left',
                    ml: 4
                }}>
                    My Recipes Application
                </Typography>
                {isMobile ? (
                    <MenuDrawerComponent cookies={cookies} logout={logout} />
                ) : (
                    <>
                        <Stack direction={'row'} spacing={2}>
                            {!cookies.access_token ? (
                                   <>
                                       <Link to={'/login'}>
                                           <Button color={'inherit'}>
                                               Login
                                           </Button>
                                       </Link>
                                       <Link to={'/register'}>
                                           <Button color={'inherit'}>
                                               Register
                                           </Button>
                                       </Link>
                                   </>
                            ) : (
                                <>
                                    <Link to={"/"}>
                                        <Button color={'inherit'}>
                                            Home
                                        </Button>
                                    </Link>
                                    <Button color={'inherit'} id={'resources-button'} onClick={handleClick}
                                            aria-controls={open? 'resources-menu': undefined}
                                            aria-haspopup={'true'}
                                            aria-expanded={open ? 'true':  undefined}
                                            endIcon={<KeyboardArrowDown />}
                                    >
                                        Recipes
                                    </Button>
                                    <Button variant={'contained'} onClick={logout}>
                                        Logout
                                    </Button>
                                </>
                                )}
                        </Stack>
                        <Menu open={open} id={'resources-menu'} anchorEl={anchorEl}
                              MenuListProps={{
                                  'aria-labelledby': 'resources-button'
                              }}
                              onClose={handleClose}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal:'right'
                              }}
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right'
                              }}
                        >
                            <MenuItem onClick={handleClose}><Link to={'/'}>All Recipes</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to={'/create-recipe'}>Create Recipe</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to={'/saved-recipes'}>Favorite Recipes</Link></MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}
