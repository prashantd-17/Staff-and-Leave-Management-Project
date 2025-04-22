export interface LeaveDetails {
    id: string,
    userId: string,
    fullName : string,
    leaveFrom : {
        year : number,
        month : number,
        day : number
    },
    leaveTo : {
        year : number,
        month : number,
        day : number
    },
    reason : string,
    status : string
}