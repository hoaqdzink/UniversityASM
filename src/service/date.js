function convertDateToString(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function convertDateTimeToString(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default { convertDateToString, convertDateTimeToString };
