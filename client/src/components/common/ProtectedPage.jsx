import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from "../../redux/features/authModalSlice";

const ProtectedPage = ({ children }) => {
  
    const dispatch = useDispatch();
  
    // useSelector hook to retrieve the user object from the Redux store
    const { user } = useSelector((state) => state.user);
  
    // useEffect hook is called whenever the user object changes. 
    // It toggles the authentication modal's visibility using the Redux action creator based on whether the user object is truthy or falsy
    useEffect(() => {
      dispatch(setAuthModalOpen(!user));
    }, [user, dispatch]);
  
    return (
      user ? children : null
    );
  };

export default ProtectedPage;