// 'use strict';
// import finnhub from "finnhub"
import { ENV_VARS } from "../config/envVars.js";
import axios from "axios";
import { UserLockScreenPasscode, WatchList,Option, Transaction } from "../model/user.model.js";
// import yahooFinance from "yahoo-finance2";

class FetchingPrices {
  // previousPrice = null; // To track the previous price for comparison
  
    static previousPrices = new Map(); // Use Map for better performance with multiple stocks
    static apiKey = ENV_VARS.ALPHAVANTAGE_API_KEY; // Replace with your Alpha Vantage API key
    static baseUrl = "https://www.alphavantage.co/query";

  static fetchNews = async (req,res) => {

    try{

      const response = await axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${this.apiKey}`)

      res.status(200).json({success:true,message:response.data})

    }catch(error){
      console.log('Error in Fetching News :- 1',error.message);
      res.status(400).json({success:false,message:error.message})
    }
  }

  static addWatchList = async (req,res) => {

    const {symbol} = req.body;

    try{
      // console.log(req.user._id);
      
      const getUser = await UserLockScreenPasscode.findById(req.user._id);

      // console.log("User:-",getUser);

      const checkWatchList = await WatchList.findOne({user:getUser._id,symbol})

      if(checkWatchList){
        return res.status(400).json({success:false,message:'Already added to watchlist'})
      }

      const watchList = await new WatchList({
        user:getUser._id,
        symbol
      })

      await watchList.save();

      console.log('Added to watchlist');

      return res.status(200).json({success:true,message:'Added to watchlist'})

    }catch(error){
      console.log('Error in adding to watchlist :- 1',error.message);
      res.status(500).json({success:false,message:error.message})
    }

  }

  static fetchWatchList = async (req,res) => {
    try {
      // console.log(req.user._id);

      // const getUser = await UserLockScreenPasscode.findById(req.user._id);
      
      const watchList = await WatchList.find({user:req.user._id});

      return res.status(200).json({success:true,message:watchList})

    } catch (error) {
      console.log('Error in fetching watchlist :- 1',error.message);
      res.status(400).json({success:false,message:error.message})
      

    }
  }

  static removeWatchList = async (req,res) => {
    try {
      const {symbol} = req.body;

      await WatchList.findOneAndDelete({user:req.user._id,symbol})

      return res.status(200).json({success:true,message:'Removed from watchlist'})

    } catch (error) {
      console.log('Error in removing from watchlist :- 1',error.message);
      res.status(400).json({success:false,message:error.message})
      
    }
  }

  static tradeHistory = async (req,res) => {
    try {
      
      // console.log("Id of user :- ",req.user.user);
      
      const getTradesOfUser = await Option.find({user:req.user.user})
      
      return res.status(200).json({success:true,message:getTradesOfUser})

    } catch (error) {
     
      console.log("Error in Trade History :- ",error.message);
      res.status(500).json({success:false,message:error.message})
      
    }

  }

  static transactionHistory = async (req,res) => {

    try {

      const getTransactionOfUser = await Transaction.find({userId:req.user.user})

      res.status(200).json({success:true,message:getTransactionOfUser})

      
    } catch (error) {
      console.log("Error in transaction history:- ",error.message);
      res.status(500).json({success:false,message:error.message})
      
    }

  }

}


export default FetchingPrices