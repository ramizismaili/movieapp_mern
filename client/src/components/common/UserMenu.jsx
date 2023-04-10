import React, { useState } from "react";
import LogoutOutLinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { setUser } from "../../redux/features/userSlice";

const UserMenu = () => {
     // Get user information from Redux store using useSelector hook
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

    // State for managing the anchor element of the Menu component
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
    {/* Render the user menu only if there is a logged-in user */}
      {user && (
        <>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", useSelect: "none" }}
            onClick={toggleMenu}
          >
            {user.displayName}
          </Typography>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
             {/* Map through the items in the user menu configuration file and create a List Item for each item */}
            {menuConfigs.user.map((item, index) => (
                <ListItemButton
                coponent={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText disableTypography primary={
                        <Typography textTransform='uppercase' >{item.display}</Typography>
                    } />
                </ListItemButton>
            ))}
            <ListItemButton sx={{borderRadius: '10px'}} onClick={() => dispatch(setUser(null))}>
                <ListItemIcon>
                    <LogoutOutLinedIcon />
                    </ListItemIcon>
                    <ListItemText disableTypography primary={
                        <Typography textTransform='uppercase' >Sign Out</Typography>
                    } />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
