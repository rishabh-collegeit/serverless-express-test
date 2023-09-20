const { MongoClient } = require("mongodb");
const ConvDao = require("./convDao");
// const { default: constants } = require("../utils/constants");

class Dao {
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.client = new MongoClient(this.connectionString);
    this.isConnected = false;
  }

  async connect(callback = null) {
    try {
      await this.client.connect();

      this.isConnected = true;
      this.initializeDaos();

      if (callback) callback();

      return true;
    } catch (e) {
      console.log("Connection error: ", e);
      this.isConnected = false;
      return false;
    }
  }

  initializeDaos() {
    const db = this.client.db("sample_training");
    this.convDao = new ConvDao(db);
  }

  async close() {
    try {
      if (!this.isConnected) {
        console.log("Not connected");
        return true;
      }
      await this.client.close();
      this.isConnected = false;
      return true;
    } catch (e) {
      console.log("Error while closing connection", e);
      this.isConnected = false;
      return false;
    }
  }
}

module.exports = Dao;
