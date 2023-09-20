const Dao = require("../database/Dao");
const router = require("express").Router();

const dao = new Dao(`mongodb+srv://rishabh:collegeit@cluster0.qztw7an.mongodb.net/`); 
router.get("/", async (req, res) => {
  try {
    await dao.connect();
    const result = await dao.convDao.findAllConversations();
    await dao.close();
    return res.json(result);
  } catch (error) {
    console.error("Not able to fetch conversations");
    console.log(error);
    return res.status(500).send("Internal Error");
  }
});

module.exports = router;
