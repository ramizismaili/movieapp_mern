import React, { useEffect, useState } from 'react'
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { Paper, Box, LinearProgress, Toolbar } from "@mui/material";

const GlobalLoading = () => {

    // Accessing globalLoading state using useSelector hook
    const { globalLoading} = useSelector((state) => state.globalLoading)

    const [isLoading, setIsLoading] = useState(true)

    // Using useEffect hook to conditionally update isLoading state based on globalLoading state
    useEffect(() => {
        if(globalLoading) {
            setIsLoading(true)
        } else {
            setTimeout(() => {
                setIsLoading(false)
            }, [1000])
        }
    }, [globalLoading])

  // Rendering JSX containing a Paper component that covers the entire screen and displays a loading spinner
  return (
    <>
    <Paper sx={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: 'none',
        transition: 'all .3s ease',
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 999
    }}>
        <Toolbar />
        <LinearProgress />
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Logo />
        </Box>

    </Paper>
        </>
  )
}

export default GlobalLoading
