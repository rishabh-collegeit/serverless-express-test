const contactSchema = require("../models/contact.schema");
const mentorSchema = require("../models/mentor.schema");
const MentorTestSchema = require("../models/Mentor");

/**
 * Get getMentorsInfo
 */
const getMentorsInfo = async (req, res) => {
  try {
    console.log("db connected");
    let mentorsInfo = await mentorSchema
      .aggregate([
        { $sample: { size: 100 } },
        {
          $project: {
            name: 1, // Include the existing fields you want in the response
            university: 1,
            university_mentor: 1,
            linkedin: 1,
            bio: 1,
            country: 1,
            specialization: 1,
            img_url_web: 1,
            img_url_mobile: 1,
            availability: 1,
            token: 1,
            test_mentor: 1,
          },
        },
      ])
      .exec();
    return res.json(mentorsInfo);
  } catch (error) {
    console.error("Not able to fetch MentorsInfo");
    console.log(error);
    return res.status(500).send("Internal Error");
  }
};
/**
 * Create Contact
 */
const createContact = async (req, res) => {
  try {
    const newContact = new contactSchema(req.body);
    await newContact.save();
    console.log(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Contact" });
  }
};

const createMentor = async (req, res) => {
  try {
    const newMentor = new MentorTestSchema(req.body);
    await newMentor.save();
    console.log(newMentor);
    res.status(201).json(newMentor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Test Mentor" });
  }
};

module.exports = {
  getMentorsInfo,
  createContact,
  createMentor
};
