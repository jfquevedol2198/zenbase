const combineLoading = (...loadingStates) => {
  return loadingStates.reduce((accumulator, current, index) => {
    return accumulator || current;
  });
};
