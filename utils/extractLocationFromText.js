async function extractLocationFromText(inputText) {
  const pattern = await /^WEATHER\s+(.+)/i;

  const match = await inputText.match(pattern);
  if (match && match[1]) {
    const location = match[1];
    return await location.trim(); // Remove leading/trailing spaces
  } else {
    return null; // Return null if the format doesn't match
  }
}

module.exports = extractLocationFromText;
