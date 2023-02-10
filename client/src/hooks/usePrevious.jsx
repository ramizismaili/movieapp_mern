import { useEffect, useRef } from "react";

// Custom hook to track previous state/props values
const usePrevious = (value) => {
  // Ref to store previous value
  const ref = useRef();

  // Use Effect to update ref.current with the latest value on every render
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return the previous value stored in ref.current
  return ref.current;
};

export default usePrevious;
