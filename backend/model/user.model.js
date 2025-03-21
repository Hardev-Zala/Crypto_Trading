import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: { type: String, unique: true,default:"" },
  otp : {type:String,default:""},
  password: { type: String,default:"" },
  phone: {type:Number,unique:true},
  phoneOTP: {type:String,default:""},
  marriedStatus : {type:String,default:""},
  profileImg : {type:String,default:""},
  kycStatus: { type: String, default: 'pending' },
  annualIncome: { type: String, default: '' },
  TradingOrInvesting: { type: String, default: '' },
  NomineeName: { type: String, default: '' },
  NomineeDOB: { type: String, default: '' },
  RelationshipWithNominee: { type: String, default: '' },
  NomineeAddress: { type: String, default: '' },
  balance: {type:Number},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const UserAadharSchema = mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  dob : { type:Date, required:true},
  cardNumber : {type:Number, required:true,unique:true},
  gender : { type:String, required:true},
  address : { type:String } 
})

const UserPanSchema = mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  dob : { type:Date, required:true},
  cardNumber : {type:String, required:true,unique:true},
  
})

const UserBankDetailsSchema = mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  bankAccountNumber:{type:String,required:true,unique:true},
  IFSC_Code:{type:String,required:true,unique:true},
})

const TransactionSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true,ref: "User" }, // ID of the user performing the transaction
  recipientId: { type: String }, // ID of the recipient (only for transfers)
  amount: { type: Number, required: true }, // Amount of the transaction
  currency: { type: String, required: true }, // Currency (e.g., USD, BTC, ETH)
  type: { type: String, required: true, enum: ['deposit_money', 'withdraw_money', 'transfer_money', 'deposit_currency', 'withdraw_currency', 'transfer_currency'] }, // Transaction type
  date: { type: Date, default: Date.now }, // Timestamp of the transaction
});

const UserWatchList = mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  symbol: {type:String,required:true},
  createdAt: {type:Date,default:Date.now}
})

const UserLockScreenSchema = mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
  passcode: {type:String,required:true},
  bank: {type:mongoose.Schema.Types.ObjectId,ref:"UserBank"},
  aadhar: {type:mongoose.Schema.Types.ObjectId,ref:"UserAadhar"},
  pan: {type:mongoose.Schema.Types.ObjectId,ref:"UserPan"},
})


const optionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symbol: { type: String, required: true }, // e.g., "BINANCE:BTCUSDT"
  type: { type: String, enum: ["CE", "PE"] }, // CE (Call Option) or PE (Put Option)
  amount: { type: Number }, // Quantity of the option
  entry: { type: Number }, // Expiry date of the option
  exit: {type:Number},
  PnL: {type:Number},
  status: { type: String, enum: ["open", "closed"], default: "open" }, // Status of the option
  createdAt: { type: Date, default: Date.now }, // Timestamp when the option was created
});

UserSchema.pre('remove', async function(next){
  await UserAadhar.deleteMany({user:this._id});
  await UserBankDetails.deleteMany({user:this._id});
  await UserLockScreenPasscode.deleteMany({user:this._id});
  
})

export const Transaction = mongoose.model("Transaction",TransactionSchema)
export const Option = mongoose.model("Option", optionSchema);
export const WatchList = mongoose.model("WatchList",UserWatchList)
export const User = mongoose.model('User',UserSchema)
export const UserPancard = mongoose.model('UserPan',UserPanSchema)
export const UserAadhar = mongoose.model('UserAadhar',UserAadharSchema)
export const UserBankDetails = mongoose.model('UserBank',UserBankDetailsSchema)
export const UserLockScreenPasscode = mongoose.model('UserPasscode',UserLockScreenSchema)

// const OrderSchema = mongoose.Schema({
  //   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  //   type: { type: String, enum: ["buy", "sell"], required: true },
//   symbol: { type: String, required: true },
//   amount: { type: Number, required: true },
//   price: { type: Number, required: true },
//   status: { type: String, enum: ["open", "completed", "canceled"], default: "open" },
//   createdAt: { type: Date, default: Date.now },
// });
// export const Order = mongoose.model("Order", OrderSchema); 
// Crypto Trading App