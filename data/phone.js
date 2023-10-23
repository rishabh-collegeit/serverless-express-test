const phone = [
    {
      number: "15550434619",
      id: "116160598212405",
    },
  ];
  
  const getPhoneId = (number) => {
    const found = phone.find((ph) => ph.number === number);
    if (!found) return null;
  
    return found.id;
  };
  
  const getPhoneNumber = (id) => {
    const found = phone.find((ph) => ph.id === id);
    if (!found) return null;
    return found.number;
  };
  
  const isBusinessPhone = (number) => {
    const found = phone.find((ph) => ph.number === number);
    if (!found) return false;
    return true;
  };
  
  module.exports = phone;
  module.exports.getPhoneId = getPhoneId;
  module.exports.getPhoneNumber = getPhoneNumber;
  module.exports.isBusinessPhone = isBusinessPhone;
  