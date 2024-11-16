export const hasNestedOptions = (nestedData) =>
  nestedData && Array.isArray(nestedData) && nestedData.length > 1;

export const checkAllFalse = (obj) => {
  return Object.values(obj).every((value) => {
    if (typeof value === "object" && value !== null) {
      return checkAllFalse(value); 
    }
    return value === false; 
  });
};
