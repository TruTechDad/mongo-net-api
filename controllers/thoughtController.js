const Thought = require("../models/thought");

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate("reactions");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    const { id } = req.params;
    try {
      const thought = await Thought.findById(id).populate("reactions");
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createThought: async (req, res) => {
    const { thoughtText, username } = req.body;
    try {
      const thought = await Thought.create({ thoughtText, username });
      res.status(201).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  updateThought: async (req, res) => {
    const { id } = req.params;
    const { thoughtText } = req.body;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        id,
        { thoughtText },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteThought: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedThought = await Thought.findByIdAndDelete(id);
      if (!deletedThought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json({ message: "Thought deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addReaction: async (req, res) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: { reactionBody, username } } },
        { new: true }
      );
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  removeReaction: async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
