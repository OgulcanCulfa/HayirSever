module.exports = (object) => {
  let newObject = { where: {}, limit: 5 };
  for (const [key, value] of Object.entries(object)) {
    if (key === "offset") {
      const skip = (parseInt(value) - 1) * 5;
      newObject[key] = parseInt(skip);
    }
    if (key === "categoryId" && value > 0) {
      newObject.where[key] = parseInt(value);
    }
    if (key === "categoryId" && value === "undefined") {
      true;
    }
  }
  return newObject;
};
