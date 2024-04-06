const { User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single user by its _id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single user by its username
  async getUserByUsername(req, res) {
    try {
      const user = await user
        .findOne({ username: req.params.username })
        .select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No user with that username" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user by its _id
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body }, // req.body is the data to update a user
        { new: true } // return the updated user's data
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a user by its _id
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!deletedUser) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a friend from a user's friend list
  async deleteFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
