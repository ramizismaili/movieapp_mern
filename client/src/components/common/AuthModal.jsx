import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import Logo from "./Logo";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

// Defining an object with action states
const actionState = {
  signin: "signin",
  signup: "signup",
};

const AuthModal = () => {
  const { authModalOpen } = useSelector((state) => state.authModal);

  const dispatch = useDispatch();

  // Defining the initial value of 'action' state as 'signin', also using the 'useState' hook to update its value
  const [action, setAction] = useState(actionState.signin);

  // Applying a side effect that changes the value of 'action' state if 'authModalOpen' is true
  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [authModalOpen]);

  // Dispatching the 'setAuthModalOpen' action with a false value to close the modal
  const handleClose = () => dispatch(setAuthModalOpen(false));

  // A function to switch between 'signin' and 'signup' actions
  const switchAuthState = (state) => setAction(state);

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: "none",
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: "background.paper",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <Logo />
          </Box>
          {/* If action value equals to signin, then the SigninForm will be rendered with the switchAuthState function passed as a prop.  */}
          {action === actionState.signin && (
            <SigninForm
              switchAuthState={() => switchAuthState(actionState.signup)}
            />
          )}

          {action === actionState.signup && (
            <SignupForm
              switchAuthState={() => switchAuthState(actionState.signin)}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
