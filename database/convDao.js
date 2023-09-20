// const { default: constants } = require("../utils/constants");

class ConvDao {
  constructor(db) {
    this.convCollection = db.collection("companies");
  }

  async findAllConversations() {
    try {
      const conversations = await this.convCollection.find().toArray();

      return conversations;
    } catch (error) {
      console.error("Error retrieving conversations:", error);
      throw error;
    }
  }
}

module.exports = ConvDao;
