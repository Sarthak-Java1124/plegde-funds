import mongoose , {Document , Schema} from "mongoose"
export interface Usertype extends Document{
    email : string,
    firstname : string,
    lastname : string,
    password : string,
    isVerified : boolean,
    randomId : number

}
const UserSchema: Schema<Usertype> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname : {
    type : String,
    required : true,
    
},
password : {
    type : String,
    required : true,
    
},
isVerified : {
    type : Boolean,
    required : true,
    default : false
},
randomId : {
  type : Number,
  required : true,
  
}
});

const UserModel =
  (mongoose.models.User as mongoose.Model<Usertype>) ||
  mongoose.model<Usertype>("User", UserSchema);

export default UserModel;