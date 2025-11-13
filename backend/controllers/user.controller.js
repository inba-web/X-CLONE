import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ userName: username });

    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }
    res.status(200).json(user);
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

    if(id == req.user._id){
      return res.status(400).json({error:"You can't unfollow/follow yourself"})
    }

    if(!userToModify || !currentUser){
      return res.status(400).json({error:"user not found"});
    } 

    const isFollowing = currentUser.following.includes(id);
    if(isFollowing){
      //unfollow
      await User.findByIdAndUpdate({_id:id}, {$addToSet:{followers:req.user._id}});
      await User.findByIdAndUpdate({_id:req.user._id}, {$addToSet:{following:id}})
      res.status(200).json({message:"Unfollow successfully"})
    }else{
      //follow
      await User.findByIdAndUpdate({_id:id},{$push:{followers:req.user._id}}) 
      await User.findByIdAndUpdate({_id:req.user._id},{$push:{following:id}})
      // send notification
      const newNotification = new Notification({
        type:"follow",
        from:req.user._id,
        to:userToModify._id,
      })
      await newNotification.save();
      res.status(200).json({message:"Follow Successfully"})

    } 
  } catch (error) {
    console.log(`Error in Get followUnFolloUser Controller : ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSuggestedUsers = async (req,res) => {
  try {
    const userId = req.user._id;
    const userFollowedByMe = await User.findById({_id:userId}).select("-password");
    const users = await User.aggregate([
      {
        $match:{
          _id: {$ne:userId} 
        }
      },{
        $sample:{
          size : 10
        }
      }
    ])
  }catch(error){
    console.log(`Error in Get SuggestedUsers Controller : ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}