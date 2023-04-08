import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import GlobalLoading from '../common/GlobalLoading'
import Footer from '../common/Footer'
import Topbar from '../common/Topbar'


const MainLayout = () => {
  return (
    <>
    <GlobalLoading />
    <Box display='flex' minHeight='100vh'>
      <Topbar />
        <Box component='main' flexGrow={1} overflow='hidden' minHeight='100vh' >
            <Outlet />
        </Box>
    </Box>

    <Footer />
    </>
  )
}

export default MainLayout
