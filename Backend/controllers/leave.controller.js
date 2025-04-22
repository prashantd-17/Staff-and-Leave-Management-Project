import Leave from '../models/leave.model.js'

const requestLeave = async (req, res)=>{
    try {
        const leave = await Leave.create(req.body);
        res.status(201).json(leave)        
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

const getLeaveDetails = async (req, res) =>{
    const leave = await Leave.find();
    res.json(leave)
};

// UPDATE
const updateLeaveStatus = async (req, res) => {
  try {
    const user = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: 'Leave details not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export default {getLeaveDetails, requestLeave, updateLeaveStatus};