export const costDisplay = (costInt, display = '$ USD ') => {
  const formattedCost = costInt ? (costInt / 100).toFixed(2) : 0;
  return display + formattedCost;
};
