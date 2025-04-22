import mongoose from 'mongoose';

const LeaveSchema = mongoose.Schema({

    userId : {
        type : String,
        required : true,
    },
    fullName : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    leaveFrom : {
        type : {
            year : Number,
            month : Number,
            day : Number
        },
        required : true
    },
    leaveTo : {
        type : {
            year : Number,
            month : Number,
            day : Number
        },
        required : true
    },
    reason : {
        type : String,
        required : true
    }

});

export default mongoose.model('Leave',LeaveSchema)