import crypto from "crypto"
import twilio from "twilio"
import { ENV_VARS } from "../config/envVars.js"
import { Transaction, User, UserAadhar, UserBankDetails, UserLockScreenPasscode, UserPancard } from "../model/user.model.js"
import bcryptjs from "bcryptjs"
import generateCookieAndToken from "../utils/generate.AuthToken.js"
import nodemailer from "nodemailer"
import axios from "axios"
import Binance from "binance-api-node"

class Auth_Controller{

  static transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ENV_VARS.EMAIL,
      pass: ENV_VARS.PASSWORD
    }
  });

  static client = Binance.default({
    apiKey: ENV_VARS.BINANCE_API_KEY,
    apiSecret: ENV_VARS.BINANCE_API_SECRET,
    httpBase: "https://testnet.binance.vision", // Testnet API Base URL
  })

  static send_sms = async (req,res) => {

    try {
      
      const {ACCOUNT_SID,AUTH_TOKEN,TWILIO_PHONE} = ENV_VARS
      const client = twilio(ACCOUNT_SID,AUTH_TOKEN)
      
      const {phoneNumber} = req.body

      const fullPhoneNumber = `+91${phoneNumber}`
      
      if(!phoneNumber) return res.status(400).json({success:false,message:"Phone Number is required..."})
        
      const otp = crypto.randomInt(100000,999999)
      
      const user = await User.findOne({phone:phoneNumber})

      if(!user) return res.status(400).json({success:false,message:"Phone Number is not existed"})

      const hashed_otp = await bcryptjs.hash(otp.toString(),10)

      const newUser = await User.findOneAndUpdate({phone:phoneNumber},{
        phoneOTP:hashed_otp
      })

      await newUser.save()
      // sending otp using twilio and generated 6 digit otp through crypto.randomInt()
      
      const sendingMessage = await client.messages.create({
        body : `Your OTP is ${otp} for attempting in Demat Account`,
        from : TWILIO_PHONE,
        to : fullPhoneNumber
      })

      await newUser.save()

      
      res.status(200).json({success:true,message:"OTP sent successfully"})
      
    } 
    catch (error) {
      console.log(`error message in sending otp :- ${error}`);
      res.status(500).json({ success:false,message: 'Failed to send OTP' });   
    }

  }

  static verify_sms = async (req,res) => {

    try {
      
      const {phoneNumber,phoneOTP} = req.body

      console.log(phoneNumber,phoneOTP);

      if(!phoneNumber || !phoneOTP) return res.status(400).json({success:false,message:"All fields are required..."})

      const isPhoneExist = await User.findOne({phone:phoneNumber})

      if(!isPhoneExist) return res.status(400).json({success:false,message:"Phone Number is not existed"})

      const isMatch = await bcryptjs.compare(phoneOTP,isPhoneExist.phoneOTP)

      if(!isMatch) return res.status(400).json({success:false,message:"Invalid OTP"})

      await User.findOneAndUpdate({phone:phoneNumber},{phoneOTP:""})

      res.status(200).json({success:true,message:"OTP verified successfully"})

    } catch (error) {
      
      console.log(`error in verifying otp :- ${error}`);
      res.status(500).json({success:false,message:"Failed to verify OTP"})
      
    }

  }

  static signUp = async (req,res) => {

    try{

      const {fullName,email,password,country,phoneNumber,dob} = req.body

      if(!fullName || !email || !password || !country || !phoneNumber || !dob) return res.status(400).json({success:false,message:"All fields are required..."})

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(!emailRegex.test(email)) return res.status(400).json({success:false,message:"Invalid Email"})

      if(password.length < 8) return res.status(400).json({success:false,message:"Password must a length of 8 or above"})

      const existingUserByEmail = await User.findOne({email:email})

      if(phoneNumber.length != 10) return res.status(400).json({success:false,message:"Phone Number must be 10 digit"})

      if(existingUserByEmail) return res.status(400).json({success:false,message:"User is already existed"})

      const exisitingUserByPhone = await User.findOne({phone:phoneNumber})

      if(exisitingUserByPhone) return res.status(401).json({success:false,message:"User is already existed"})

      const salt = await bcryptjs.genSalt(10)

      const hashedPassword = await bcryptjs.hash(password,salt)

      const PROFILE_PICS = ['/avatar1.png','/avatar2.png','/avatar3.png']

      const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
  
      const newUser = new User({
        fullName : fullName,
        email : email,
        password : hashedPassword,
        phone : phoneNumber,
        profileImg: image,
        country: country,
        dob: new Date(dob),
      })

      await newUser.save(); // Ensure the user is saved to the database

      generateCookieAndToken(newUser._id,res)

      return res.status(201).json({success:true,user:{...newUser._doc,password:""}})

    }catch(error){
     
      console.log(`error signUp :- ${error}`);
      res.status(500).json({success:false,message:`Error Of ${error}`})
      
    }

  }

  static login = async (req,res) => {

    try {
      
      const {mobileNumber,pin} = req.body
      console.log(mobileNumber,pin);
      
      if(!mobileNumber || !pin) return res.status(400).json({success:false,message:"All fields are required..."})
      
      const getUser = await User.findOne({phone:mobileNumber})

      if(!getUser) return res.status(400).json({success:false,message:"User is not existed"})

      const user = await UserLockScreenPasscode.findOne({user:getUser}).populate({path:'user',match:{phone:mobileNumber}})

      if(!user) return res.status(400).json({success:false,message:"User is not existed"})
      
      const hash = await bcryptjs.compare(pin,user.passcode)

      if(!hash) return res.status(400).json({success:false,message:"Invalid Credentials"})

      generateCookieAndToken(user._id,res)
      
      return res.status(200).json({success:true,user:{...user._doc,password:""}})

    }
    catch(e){
      res.status(500).json({success:false,message:"Internal Server Error"})
    }     
  }
  
  static aadharValidation = async (req,res) => {

    const {aadharNumber,aadharName,aadharDob,aadharGender,aadharAddress} = req.body

    const isExist = await UserAadhar.findOne({name:aadharName,dob:aadharDob,cardNumber:aadharNumber,gender:aadharGender,address:aadharAddress})

    if(!isExist){
      return res.status(400).json({success:false,message:"Invaild Credentials.Try again"})
    }
    return res.status(200).json({success:true,message:"Success"})
  }



  static gmailVerification = async (req,res) => {
    
    const {email,phone} = req.body

    console.log(email,phone); 
    
    const isExist = await User.findOne({phone:phone})

    if(!isExist) return res.status(400).json({success:false,message:"Phone Number is not existed"})

    let generate_otp = Math.floor(100000 + Math.random() * 900000).toString()

    const hashed_otp = await bcryptjs.hash(generate_otp,10)

    const newUser = await User.findOneAndUpdate({phone:phone},{email:email,otp:hashed_otp})

    await newUser.save()

    const mailOptions = {
      from: ENV_VARS.EMAIL,
      to: email,
      subject: 'OTP for Email Verification ✔',
      text: `Your OTP for Email Verification is ${generate_otp} for Trading View`
    };

    await this.transporter.sendMail(mailOptions)
    res.status(200).json({success:true,message:"OTP sent successfully"})
  }

  static verifyGmail = async (req,res) => {

    try{

      const {email,otp} = req.body
      
      const isExist = await User.findOne({email:email})      

      if(!isExist){
        return res.status(400).json({success:false,message:"Email is not existed"})
      }
      
      console.log(isExist.otp);

      const isMatch = await bcryptjs.compare(otp,isExist.otp)
      
      if(!isMatch){
        return res.status(400).json({success:false,message:"Invalid OTP"})
      }
      
      const update = await User.findOneAndUpdate({email:email},{otp:""})

      await update.save()

      res.status(200).json({success:true,message:"Email Verified Successfully"})
      
    }catch(error){

      console.log(`error in verifying otp :- ${error}`);
      res.status(500).json({success:false,message:"Failed to verify OTP"})

    }

  }
  
  static loginPIN = async(req,res) => {

    const {email,pin} = req.body

    const isExist = await User.findOne({email:email,password:pin})

    if(!isExist){
      return res.status(400).json({success:false,message:"Invalid Credentials"})
    }

    return res.status(200).json({success:true,message:"Login Successfully"})

  }

  static personalInfo = async (req,res) => {

    try{
      const {email,maritalStatus,tradingSince,annualIncome} = req.body

      const getUser = await User.findOne({email:email})

      if(!getUser) return res.status(404).json({success:false,message:"User not found."})

      const userUpdate = await User.findOneAndUpdate({email:email},{marriedStatus:maritalStatus,annualIncome:annualIncome,TradingOrInvesting:tradingSince})

      await userUpdate.save()

      res.status(200).json({success:true,message:"Personal Info Setted Up."})

    }
    catch(error){

      return res.status(400).json({success:false,message:"Internal Server Error."})

    }

  }

  static identityVerification = async (req,res) => {

    try {
      
      const {email,panNumber,dob,aadharNumber,Gender,address} = req.body

      const getUser = await User.findOne({email:email})
      console.log(getUser);
      
      if (!getUser) return res.status(404).json({success:false,message:"User not found."})
        
      const newAadhar = await UserAadhar.findOne({
        user:getUser._id,
        dob:dob,
        cardNumber:aadharNumber,
        gender:Gender,
        address:address
      })

      // await newAadhar.save()

      const newPan = await UserPancard.findOne({
        user:getUser._id,
        dob:dob,
        cardNumber:panNumber,
      })

      if(!newAadhar && !newPan) return res.status(404).json({success:false,message:"Invalid Credentials"})
      
      // console.log(newPan._id);

      // await newPan.save()

      return res.status(200).json({success:true,message:"Your Identity is Verified."})


    } catch (error) {
      
      return res.status(500).json({success:false,message:"Internal Server Error."})


    }

  }

  static BankDetails = async (req,res) => {
    try {

      const {ifscCode,accountNumber,email} = req.body

      const getUser = await User.findOne({email:email})

      if(!getUser) return res.status(404).json({success:false,message:"User not found.Please re-build it."})

      const newBankDetails = await UserBankDetails.findOne({
        user:getUser._id,
        bankAccountNumber:accountNumber,
        IFSC_Code:ifscCode
      })

      // await newBankDetails.save()
      if(!newBankDetails) return res.status(404).json({success:false,message:"Invalid Credentials"})

      return res.status(200).json({success:true,message:"Bank Details Verified."})

    } catch (error) {
      console.log(error);
      return res.status(500).json({success:false,message:"Internal Server Error."})
    }
  }

  static nomineeDetails = async (req,res) => {

    try{

    const {nomineeName,nomineeDob,relationship,nomineeAddress,email} = req.body

    const getUser = await User.findOne({email:email})

    if(!getUser) return res.status(404).json({success:false,message:"User not found.Please re-build it."})
      
    const updateIt = await User.findOneAndUpdate({email:email},{
      NomineeName:nomineeName,
      NomineeDOB:nomineeDob,
      RelationshipWithNominee:relationship,
      NomineeAddress:nomineeAddress
    })

    await updateIt.save()

    return res.status(200).json({success:true,message:"Nominee Details Addded."})
  }
  catch(error){
    console.log(error);
    return res.status(500).json({success:false,message:"Internal Server Error."})
  }
  }

  static PINPattern = async (req,res) => {
    try {
      
      const {email,passcode} = req.body
      
      const getUser = await User.findOne({email:email})
      
      if(!getUser) return res.status(404).json({success:false,message:"User not found"})
        
        const getAadhar = await UserAadhar.findOne({user:getUser}).populate({path:'user',match:{email:email}})
        
        if(!getAadhar) return res.status(404).json({success:false,message:"Aadhar Details are missing"})
          
          const getPan = await UserPancard.findOne({user:getUser}).populate({path:'user',match:{email:email}})
          
          if(!getPan) return res.status(404).json({success:false,message:"Pan Details are missing"})

    const getBank = await UserBankDetails.findOne({user:getUser}).populate({path:'user',match:{email:email}})
    
    if(!getBank) return res.status(404).json({success:false,message:"Bank Details are missing"})
    
      // const existedUser = await UserLockScreenPasscode.findOne({user:getUser})

      // if(existedUser) return res.status(400).json({success:false,message:"User has already setted up the passcode."})

      const hashPasscode = await bcryptjs.hash(passcode,10)
      
      const newUserPasscode = await UserLockScreenPasscode.findOneAndUpdate({user:getUser},{
        user:getUser,
        passcode:hashPasscode,
        bank:getBank,
        aadhar:getAadhar,
        pan:getPan
      })
      
      await newUserPasscode.save()
      
      return res.status(200).json({success:true,message:"Passcode Setted Up."})
      
    } catch (error) {
     
      console.log(error);
      return res.status(500).json({success:false,message:"Internal Server Error."})
      
    }


  }

  static AuthenticatingUser = async (req,res) => {
  
    try {
      
      console.log("Your Cookie :- ",req.cookies);

      res.status(200).json({success:true,user:req.user})

    } catch (error) {
      console.log(error);
      res.status(500).json({success:false,message:"Internal Server Error."})
    }

  }

  static logout = async (req,res) => {

    try {
      
      res.clearCookie("jwt-trading")

      res.status(200).json({success:true,message:"Logged Out Successfully"})

    } catch (error) {
      
      console.log(error);
      res.status(500).json({success:false,message:"Internal Server Error."})
    }

  }

  static deposit = async (req,res) => {
    const {amount,currency,type} = req.body;

    try{

      const getUser = await UserLockScreenPasscode.findById(req.user._id)

      const trans = await new Transaction({
        userId: getUser.user,
        amount: amount,
        currency: currency,
        type: `deposit_${type}`
      })

      await trans.save()

      if(trans.type == "deposit_money"){
        const gotUser = await User.findById(getUser.user)
        gotUser.balance += amount
        console.log("Balance of User :- ",gotUser.balance);
        
        await gotUser.save()
      }

      return res.status(201).json({success:true,message:"Deposit successful"})

    }catch(error){

      console.log("Error in deposit :- ",error.message);
      res.status(500).json({success:false,message:error.message})      

    }

  }

  static withdraw = async (req, res) => {
    const { amount, currency,type } = req.body;
    console.log("In Withdraw",req.body);
    
    try {

      const getUser = await UserLockScreenPasscode.findById(req.user._id)
      if(type == "money"){

        const gotUser = await findById(getUser.user)

        if(gotUser.balance >= amount){

          gotUser.balance -= amount
          await gotUser.save()
          
        }else{
          
          return res.status(401).json({success:false,message:"insufficient amount to withdraw."})
        }
      }
      
      const transaction = await new Transaction({ userId: getUser.user,amount, currency, type: `withdraw_${type}` });

      await transaction.save();

      return res.status(201).json({ message: 'Withdrawal successful', transaction });

    } catch (err) {

      res.status(500).json({ error: err.message });

    }

  }

  static tranfer = async (req, res) => {
    const {  recipientId, amount, currency, type } = req.body;
    try {

      const getUser = await UserLockScreenPasscode.findById(req.user._id)
      const userId = getUser.user
      if (userId === recipientId) {
        return res.status(400).json({ error: 'You cannot transfer to yourself' });
      }
  
      const sender = await User.findById(userId);
      const recipient = await User.findById(recipientId);
      if (!sender || !recipient) return res.status(404).json({ error: 'User not found' });
      if (sender.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });
  
      // Deduct from sender
      sender.balance -= amount;
      await sender.save();
  
      // Add to recipient
      recipient.balance += amount;
      await recipient.save();
  
      // Record transaction
      const transaction = new Transaction({ userId, recipientId, amount, currency, type: `transfer_${type}` });
      await transaction.save();
      console.log("Transfer successfully")
      res.status(201).json({ success:true,message: 'Transfer successful', transaction });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  static fetchProfile = async (req,res) => {
    try {
      
      const user = await UserLockScreenPasscode.findById(req.user)
      
      
      if(!user) return res.status(404).json({success:false,message:"User not found"})
      // console.log("Profile :- ",user)

      const getUserDetails = await User.findById(user["user"])

      console.log("Profile :- ",getUserDetails);
      

      res.status(200).json({success:true,Profile:getUserDetails})


    } catch (error) {
      console.log(error);
      res.status(500).json({success:false,message:error.message})
    }

  }


}

export default Auth_Controller