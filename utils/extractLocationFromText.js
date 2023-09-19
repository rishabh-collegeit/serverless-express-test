async function extractLocationFromText(inputText) {
    // Define a regex pattern to match 'WEATHER {location}' format
    const  pattern = await  /^WEATHER\s+(.+)/i;
  
    // Use regex to match and extract the location
    const match = await inputText.match(pattern);
  
    // Check if a match was found and return the location
    if (match && match[1]) {
      const location = match[1];
      return await location.trim(); // Remove leading/trailing spaces
    } else {
      return null; // Return null if the format doesn't match
    }
  }
  
module.exports = extractLocationFromText;