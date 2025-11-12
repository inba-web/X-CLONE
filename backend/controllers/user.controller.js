import User from "../models/user.model.js";

export const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ userName: username });

    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }
    res.status(200).json(user);
    res.send(user);
  } catch (error) {
    console.log(`Error in Get Profile Controller : ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const followUnFollowUser = async (req, res) => {
  try {
    const {id} = req.params;
    const userToModify = await User.findById({_id:id})
    const currentUser = await User.findById({_id:req.user._id})
  } catch (error) {
    console.log(`Error in Get followUnFolloUser Controller : ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
