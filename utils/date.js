function formatDate(inputDate) {
  // Split the date string by "-"
  var parts = inputDate.split("-");

  if (parts.length === 3) {
    // Extract day, month, and year
    var day = parts[2];
    var month = parts[1];
    var year = parts[0];

    // Add leading zeros if necessary
    day = day.length === 1 ? "0" + day : day;
    month = month.length === 1 ? "0" + month : month;

    // Reconstruct the formatted date string
    var formattedDate = year + "-" + month + "-" + day;

    return formattedDate;
  }

  // Return the input as is if it doesn't match the expected format
  return inputDate;
}

export { formatDate }