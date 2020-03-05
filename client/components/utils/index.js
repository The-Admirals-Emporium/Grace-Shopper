export const costDisplay = (costInt, display = '$ USD ') => {
  return display + (costInt / 100).toFixed(2);
};
