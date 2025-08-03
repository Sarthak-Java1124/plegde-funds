import mongoose , {Document , Schema} from "mongoose"


interface Pledges extends Document{
        habbitName : string,
        Duration : string,
        stakeAmount : number,
        startTime : Date,
        endTime : Date,
        userId : number,
        pledgeNumber : number,
        
}

const pledgeModel:Schema<Pledges> = new mongoose.Schema({
  habbitName: {
    type: String,
    required: true,
  },
  Duration: {
    type: String,
    required: true,
  },
  stakeAmount: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  pledgeNumber: {
    type: Number,
    required: true,
    unique : true,
  },
});


const PledgeModel =
  (mongoose.models.Pledge as mongoose.Model<Pledges>) ||
  mongoose.model<Pledges>("Pledge", pledgeModel);

export default PledgeModel;

