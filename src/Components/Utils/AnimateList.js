import { useEffect, useState } from 'react';
import calculateBoundingBoxes from "./calculateBoundingBoxes";
import usePrevious from "../DisplayComponents/Hooks/usePrevious";

/**
 * 
 * @param {object} children 
 */
const AnimateList = ({ children }) => {
    const [boundingBox, setBoundingBox] = useState({});
    const [prevBoundingBox, setPrevBoundingBox] = useState({});
    const prevChildren = usePrevious(children);
  
    useEffect(() => {
      const newBoundingBox = calculateBoundingBoxes(children);
      setBoundingBox(newBoundingBox);
    }, [children]);
  
    useEffect(() => {
      const prevBoundingBox = calculateBoundingBoxes(prevChildren);
      setPrevBoundingBox(prevBoundingBox);
    }, [prevChildren]);
  
    return children;
  };

export default AnimateList;