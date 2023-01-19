import { useEffect, useRef } from 'react';

/**
 * 
 * @param {*} value 
 * @returns 
 */
const usePrevious = value => {
  const prevChildrenRef = useRef();

  useEffect(() => {
    prevChildrenRef.current = value;
  }, [value]);

  return prevChildrenRef.current;
};

export default usePrevious;