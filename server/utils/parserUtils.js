module.exports = {
    parsePaginationAndConditionVariables: object => {
      let newObject = { where: {} };
      for (const [key, value] of Object.entries(object)) {
        if (key === 'limit' || key === 'offset') newObject[key] = parseInt(value);
        else newObject.where[key] = value;
      }
      return newObject;
    }
  };