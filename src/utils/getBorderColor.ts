export const getBorderColor = (errorMsg: string | undefined, isFocused: boolean): string => {
  if (isFocused) return 'blue.100';
  if (errorMsg) return 'red.100';
  return 'black.10';
};
