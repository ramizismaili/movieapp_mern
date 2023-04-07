import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

const PageWrapper = ({ state, children }) => {
  // Initializing the useDispatch hook from Redux to dispatch actions
  const dispatch = useDispatch();

  // useEffect hook is called when the component mounts and it resets the window scroll position to (0,0)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //  useEffect hook is called whenever the state prop or the dispatch function changes.
  // It resets the window scroll position to (0,0) again and also sets the app state using the Redux action creator.
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(state));
  }, [state, dispatch]);

  return children;
};

export default PageWrapper;
