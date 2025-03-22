const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./passop.model");

dotenv.config();
const app = express();
const port = 9000;

app.use(express.json());
app.use(cors());
// MongoDB Connection with Error Handling
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Get all blogs
app.get("/all", async (req, res) => {
  try {
    const allData = await schema.find();
    if (!allData.length) {
      return res.json({ msg: "No data present" });
    }
    res.status(200).json({ success: true, msg: "All blogs fetched", data: allData });
  } catch (e) {
    res.status(500).json({ success: false, msg: e.message });
  }
});

// Create a new blog
app.post("/add", async (req, res) => {
  try {
    const { site, username, password } = req.body;
    const newData = await schema.create({ site, username, password });
    res.status(200).json({ success: true, msg: "Data submitted", newData });
  } catch (e) {
    res.status(500).json({ success: false, msg: e.message });
  }
});

// Delete a blog by ID
app.delete("/del/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await schema.findOne({ _id: id });

    if (!blog) {
      return res.status(400).json({ msg: "No blog found" });
    }

    await schema.deleteOne({ _id: id });
    res.status(200).json({ success: true, msg: "Blog deleted" });
  } catch (e) {
    res.status(500).json({ success: false, msg: e.message });
  }
});

// Update a blog by ID
app.put("/up/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { site, username, password } = req.body;

    const blog = await schema.findOne({ _id: id });
    if (!blog) {
      return res.status(400).json({ msg: "No blog found" });
    }

    await schema.updateOne({ _id: id }, { $set: { site, username, password } });
    res.status(200).json({ success: true, msg: "Blog updated" });
  } catch (e) {
    res.status(500).json({ success: false, msg: e.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
