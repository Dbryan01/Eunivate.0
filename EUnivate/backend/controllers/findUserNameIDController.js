import User from "../models/Client/userModels.js";


export const findUserByUsername = async (req, res) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  
//find user name of the assignee to the activity page 
export const getAssignees = async (req, res) => {
  try {
      // Check if userIds are passed in query
      const { userIds } = req.query;

      let users;
      if (userIds) {
          // If userIds are provided, find users by the array of IDs
          const idsArray = userIds.split(','); // Split userIds string into an array
          users = await User.find({ _id: { $in: idsArray } });
      } else {
          // If no userIds are provided, return all users (or you can choose to return an error)
          users = await User.find({});
      }

      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

