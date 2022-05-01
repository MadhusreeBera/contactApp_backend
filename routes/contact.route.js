const express = require("express");
const Contact = require("../models/contact.model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const contact = new Contact({
      name: req.body.name,
      phone: req.body.phone,
      tag: req.body.tag,
      avatar: req.body.avatar,
    });
    await contact.save();
    res.status(200).json({
      message: "Contact saved successfully",
      contact,
    });
  } catch (e) {
    res.status(200).json({
      error: String(e),
    });
  }
});

// const contactRouter = (app) => {
//     app.use
// }
router.get("/", async (req, res) => {
  try {
    const filter = {
      status: "active",
    };
    if (req.query.tag) {
      filter.tag = req.query.tag;
    }
    const contact = await Contact.find(filter);
    res.status(200).json({
      message: "contacts fetched successfully",
      contact,
    });
  } catch (e) {
    res.status(200).json({
      error: String(e),
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, status: "active" },
      { $set: { status: "inactive" } },
      { new: true }
    );
    if (!contact) {
      throw new Error("Contact not found");
    }

    res.status(200).json({
      message: "contact deleted successfully",
    });
  } catch (e) {
    res.status(200).json({
      error: String(e),
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const update = {};
    if (req.body.name) update.name = req.body.name;
    if (req.body.avatar) update.avatar = req.body.avatar;
    if (req.body.phone) update.phone = req.body.phone;
    if (req.body.tag) update.tag = req.body.tag;
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, status: "active" },
      { $set: update },
      { new: true }
    );
    if (!contact) {
      throw new Error("Contact not found");
    }

    res.status(200).json({
      message: "contact updated successfully",
      contact,
    });
  } catch (e) {
    res.status(200).json({
      error: String(e),
    });
  }
});

module.exports = router;
