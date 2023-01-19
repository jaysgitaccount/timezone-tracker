/**
 * For each child, access each child's ref and get bounding client rect
 * @param {array} children array of objects with id:ref
 * @returns object with id:rect pairs of each child
 */
const calculateBoundingBoxes = children => {
    const boundingBoxes = {};

    children.forEach(child => {
        const domNode = child.ref;
        const nodeBoundingBox = domNode.getBoundingClientRect();

        boundingBoxes[child.id] = nodeBoundingBox;
    });
    console.log(boundingBoxes)
    return boundingBoxes;
};

export default calculateBoundingBoxes;