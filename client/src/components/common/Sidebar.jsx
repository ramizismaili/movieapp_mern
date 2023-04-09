import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import Logo from "./Logo";
import uiConfigs from "../../configs/ui.configs";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";


const Sidebar = ({ open, toggleSidebar }) => {
    const dispatch = useDispatch();
  
    // Get user state, thememode and appState from Redux store
    const { user } = useSelector((state) => state.user);
    const { appState } = useSelector((state) => state.appState);
  
    const { themeMode } = useSelector((state) => state.themeMode);
  
    // Get sidebar width from UI configs
    const sidebarWidth = uiConfigs.size.sidebarWidth;
  
    // Function to switch between light and dark theme mode
    const onSwitchTheme = () => {
      const theme =
        themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
      dispatch(setThemeMode(theme));
    };
  
    // Define drawer content
    const drawer = (
      <>
        <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
          <Stack width="100%" direction="row" justifyContent="center">
            <Logo />
          </Stack>
        </Toolbar>
  
        <List sx={{ paddingX: "30px" }}>
          <Typography variant="h6" marginBottom="20px">
            MENU
          </Typography>
          {/* Map through main menu items and render each one */}
          {menuConfigs.main.map((item, index) => (
            <ListItemButton
              key={index}
              sx={{
                borderRadius: "10px",
                marginY: 1,
                backgroundColor: appState.includes(item.state)
                  ? "primary.main"
                  : "unset",
              }}
              component={Link}
              to={item.path}
              onClick={() => toggleSidebar(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase">
                    {item.display}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
          {/* If user is logged in, render personal menu items */}
          {user && (
            <>
              <Typography variant="h6" marginBottom="20px">
                PERSONAL
              </Typography>
              {/* Map through user menu items and render each one */}
              {menuConfigs.user.map((item, index) => (
                <ListItemButton
                  key={index}
                  sx={{
                    borderRadius: "10px",
                    marginY: 1,
                    backgroundColor: appState.includes(item.state)
                      ? "primary.main"
                      : "unset",
                  }}
                  component={Link}
                  to={item.path}
                  onClick={() => toggleSidebar(false)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography textTransform="uppercase">
                        {item.display}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </>
          )}
  
          {/* Render theme switcher */}
          <Typography variant="h6" marginBottom="20px">
            THEME
          </Typography>
          <ListItemButton>
            {/* If the current theme mode is dark, render dark mode icon; otherwise, render light mode icon */}
            <ListItemIcon onClick={onSwitchTheme}>
              {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
              {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                // If the current theme mode is dark, display "dark mode"; otherwise, display "light mode"
                <Typography textTransform="uppercase" onClick={onSwitchTheme}>
                  {themeMode === themeModes.dark ? "dark mode" : "light mode"}
                </Typography>
              }
            />
          </ListItemButton>
        </List>
      </>
    );


      // Render drawer component with defined properties and styles
  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          width: sidebarWidth,
          borderRight: "0",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
