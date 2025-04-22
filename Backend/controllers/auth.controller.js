import User from '../models/user.model.js'


// CREATE
const registerUser = async (req, res) => {
  try {
    // const user = await User.create(req.body);
    const {fullName, userName, email, contactNumber, department, role, password, profileImage} = req.body;
    if(!fullName || !userName || !email || !contactNumber || !department || !role || !password){
      return res.status(400).json("all fields are required");
    }

    const user = new User({
      fullName,
      userName,
      email,
      contactNumber,
      department,
      role,
      password,
      profileImage
    });
    await user.save();
    res.status(201).json({ message: 'Registration successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
    try {
        const {userName, password} = req.body;

            // Check if all fields are present
        if(!userName || !password){
            return res.status(400).json({error : 'UserName and Password are required'});
        }

        // check user exists 
        const user = await User.findOne({userName});
        if(!user){
            return res.status(404).json({error : "User not found."})
        }

            // Match password (plaintext comparison for now)
        if(user.password !== password){
            console.log(user.password , password)
            return res.status(401).json({error : 'Invalid Credentials'})  
        }

        // success
        res.status(200).json({message : 'Login Successful', user})

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

export default {registerUser, loginUser}