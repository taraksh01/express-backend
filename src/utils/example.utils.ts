export const capitalizeString = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
