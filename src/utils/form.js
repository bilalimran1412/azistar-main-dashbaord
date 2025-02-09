export const evaluateInitialValue = (input) => {
  return input === false ? false : input || input === 0 ? input : '';
};
