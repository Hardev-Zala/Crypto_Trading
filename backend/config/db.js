import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

const connect = async () => {

  try {
    
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
    console.log("Connected :- "+conn.connection.host);
    

  } catch (error) {
    console.log(error);
    process.exit(1); // 1 means there is an erroro means success
  }
}

export default connect