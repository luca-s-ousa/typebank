export const dateAndHours = (moment: Date) => {
  return `${moment.getFullYear()}-${String(moment.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(moment.getDate()).padStart(
    2,
    "0"
  )}  ${moment.getHours()}:${moment.getMinutes()}:${String(
    moment.getSeconds()
  ).padStart(2, "0")}`;
};
