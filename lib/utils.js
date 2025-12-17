export const getDateTime = () => {
  let generatedDate = new Date(Date.now()).toISOString();
  return generatedDate;
};
