import { Box, Button, Paper, Stack } from "@mui/material";
import React from "react";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.configs";
import Container from "./Container";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      {/* Rendering a Paper component with a background image and padding */}
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            {/* Mapping over menuConfigs.main array to render main menu buttons */}
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "inherit" }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;
