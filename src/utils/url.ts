import isValid from "valid-url";
export const isHttp = (url: string) => {
  return isValid.isHttpsUri(url);
};
