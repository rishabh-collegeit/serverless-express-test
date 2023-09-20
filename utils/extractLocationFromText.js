async function extractLocationFromText(inputText) {
  const pattern = /^WEATHER\s+(.+)/i;
  const match = inputText.match(pattern);

  if (match && match[1]) {
    const location = match[1].trim(); // Remove leading/trailing spaces
    return location;
  } else {
    return null; // Return null if the format doesn't match
  }
}

module.exports = extractLocationFromText;
