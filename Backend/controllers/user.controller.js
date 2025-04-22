import User from '../models/user.model.js'

// READ ALL
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// READ ONE
const getUser = async (req, res) => {
  try {
    console.log(req.params)
    //if query param use req.query.id
    const user = await User.findById(req.params.id); // req.query.id
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export default {getAllUsers, getUser, updateUser, deleteUser}