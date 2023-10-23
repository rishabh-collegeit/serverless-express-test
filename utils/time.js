/**
 * Has it been 24 hours since the timestamp?
 * @param {number} timestamp
 */
const hasBeen24Hours = (timestamp) => {
    timestamp = Date.parse(timestamp);
    console.log("checking 24hr diff", timestamp);
    if (!timestamp) return true;
    const now = Date.now();
    const diff = now - timestamp;
    return diff > 24 * 60 * 60 * 1000;
};

module.exports = hasBeen24Hours;
