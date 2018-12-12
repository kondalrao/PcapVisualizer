var isString = value => {
  return typeof value === "string" || value instanceof String;
};

var isNumber = value => {
  return typeof value === "number" && isFinite(value);
};

var isArray = value => {
  return value && typeof value === "object" && value.constructor === Array;
};

var isFunction = value => {
  return typeof value === "function";
};

var isObject = value => {
  return value && typeof value === "object" && value.constructor === Object;
};

var isNull = value => {
  return value === null;
};

var isUndefined = value => {
  return typeof value === "undefined";
};

var isBoolean = value => {
  return typeof value === "boolean";
};

var isRegExp = value => {
  return value && typeof value === "object" && value.constructor === RegExp;
};

var isError = value => {
  return value instanceof Error && typeof value.message !== "undefined";
};

var isDate = value => {
  return value instanceof Date;
};

var isSymbol = value => {
  return typeof value === "symbol";
};

module.export = {
  isString,
  isNumber,
  isArray,
  isFunction,
  isObject,
  isNull,
  isUndefined,
  isBoolean,
  isRegExp,
  isError,
  isDate,
  isSymbol
};
