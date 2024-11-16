export const valueFiltering = (object, parentKey = "") => {
  if (object === null || object === undefined) {
    return [];
  }

  return Object.entries(object).flatMap(([key, value]) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === "boolean" && value) {
      return [[fullKey, value]];
    } else if (typeof value === "object") {
      return valueFiltering(value, fullKey);
    }
    return [];
  });
};
