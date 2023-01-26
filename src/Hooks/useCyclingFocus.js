import { useState, useEffect, useCallback } from "react";
/** 
 * Listens for up/down arrow key presses on the target, and cycles through list
 * @param {ref} targetRef React ref to put the event listener on
 * @param {number} listSize length of the list
 * @param {number} initialFocus index of initially focused number, defaults to null
 */
function useCyclingFocus(targetRef, listSize, initialFocus = null) {
    const [currentFocus, setCurrentFocus] = useState(initialFocus);

    useEffect(() => {
        // When list changes (e.g. user types), reset to first item
        setCurrentFocus(initialFocus);
    }, [listSize])

    const handleKeyDown = useCallback((e) => {
        // Cycle up or down. Start over if outside list bounds
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setCurrentFocus( prev =>
                    currentFocus === null
                        ? 0
                        : currentFocus === listSize - 1
                            ? 0
                            : prev + 1
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setCurrentFocus(prev => 
                    currentFocus === null
                        ? listSize - 1
                        : currentFocus === 0
                            ? listSize - 1
                            : prev - 1
                );
                break;
        }
    }, [listSize, currentFocus, setCurrentFocus])

    useEffect(() => {
        targetRef?.addEventListener('keydown', handleKeyDown, false);

        return () => {
            targetRef?.removeEventListener('keydown', handleKeyDown, false);
        }
    }, [targetRef, handleKeyDown])

    return [currentFocus, setCurrentFocus];
}

export default useCyclingFocus;