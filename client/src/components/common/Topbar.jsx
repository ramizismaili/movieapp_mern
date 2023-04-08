import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import { cloneElement, useState } from "react";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
// import UserMenu from "./UserMenu";
// import Sidebar from "./Sidebar";
import Logo from "./Logo";


const ScrollAppBar= ({children, window}) => {
    const { themeMode} = useSelector((state) => state.themeMode)

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        theshold: 50,
        target: window ? window() : undefined
    }
    )

    // Cloning the child element passed to this component and setting its styles based on current scroll position and theme mode
    return cloneElement(children, {
        sx: {
            color: trigger ? 'text.primary' : themeMode === themeModes.dark ? 'primary.contrastText' : 'text.primary',
            backgroundColor: trigger ? 'background.paper' : themeMode === themeModes.dark ? 'transparent' : 'background.paper'
        }
    })
}

const Topbar = () => {

    const { user } = useSelector((state) => state.user)
    const { appState } = useSelector((state) => state.appState)
    const { themeMode } = useSelector((state) => state.themeMode)


    const [sidebarOpen, setSidebarOpen] = useState(false)


    const dispatch = useDispatch()

    const onSwitchTheme = () => {
        const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark 
        dispatch(setThemeMode(theme))
    }
  return (
    <>
    <ScrollAppBar>
        <AppBar elevation={0} sx={{zIndex: 9999}}>
            <Toolbar sx={{alignItems: 'center', justifyContent: 'space-between'}}>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <IconButton 
                    color='inherit'
                    sx={{mr: 2, display: {md: 'none'}}}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{display: {xs: 'inline-block', md: 'none'}}}>
                        <Logo />
                    </Box>
                </Stack>


                {/* main menu */}
                {/* Displaying main menu items based on menuConfigs file */}
                <Box flexGrow={1} alignItems='center' display={{ xs: 'none', md: 'flex'}}>
                    <Box sx={{marginRight: '30px'}}>
                        <Logo />
                    </Box>
                    {menuConfigs.main.map((item, index) => (
                        <Button
                        key={index}
                        sx={{
                            color: appState.includes(item.state) ? 'primary.contrastText' : 'inherit',
                            mr: 2
                        }}
                        component={Link}
                        to={item.path}
                        variant={appState.includes(item.state) ? 'contained' : 'text'}
                        >
                            {item.display}
                        </Button>
                    ))}

                    <IconButton sx={{
                        color: 'inherit'
                    }} onClick={onSwitchTheme}>
                        {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                        {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
                    </IconButton>
                </Box>

                {/* user menu */}
                
            </Toolbar>
        </AppBar>
    </ScrollAppBar>
    </>
  )
}

export default Topbar
