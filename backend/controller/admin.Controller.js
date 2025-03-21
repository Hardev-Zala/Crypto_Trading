import { Option,Transaction,User,UserBankDetails, WatchList } from "../model/user.model.js";

class AdminController{

  static fetchAllUser = async (req,res) => {

    try {

      const users = await User.find({}, { password: 0, otp: 0, phoneOTP: 0 }); // Exclude sensitive fields

      res.status(200).json({success:true,data:users})

      
    } catch (error) {
      console.log("Error in admin fetch All users :- ",error);
      res.status(500).json({success:false,message:"Internale Server Error."})      
    }

  }

  // Update a user
  static updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const { email, phone, kycStatus } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { email, phone, kycStatus },
        { new: true } // Return the updated user
      );

      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  // Delete a user
  static deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };


  static fetchAllOptions = async (req,res) => {
    try {
      const allTrades = await Option.find()
      console.log(allTrades);
      
      res.status(200).json({success:true,message:allTrades})

    } catch (error) {
      console.log("Error in admin fetch All options :- ",error);
      res.status(500).json({success:false,message:"Internale Server Error."})    
    }

  }

  static fetchAllUserBankDeatils = async (req,res) => {
    try {
      
      const fetchAllBankDetails = await UserBankDetails.find()

      res.status(200).json({success:true,message:fetchAllBankDetails})
      

    } catch (error) {

      console.log("Error in admin fetch All options :- ",error);
      res.status(500).json({success:false,message:"Internale Server Error."})  
      
    }
  }

  static fetchAnalyticsData = async (req, res) => {
    try {
      // Fetch all necessary data for analytics
      const users = await User.find();
      const transactions = await Transaction.find();
      const watchlist = await WatchList.find();
      const bankDetails = await UserBankDetails.find();
      const trades = await Option.find({status:"closed"});

      console.log("Trades in Analytics :- ",trades.length);

      let totalRevenue = 0

      for (const element of trades) {
        totalRevenue += (element.entry * element.amount) * 0.001; // 0.1% brokerage
      }
      

      // Process data for analytics
      const userGrowthData = users.reduce((acc, user) => {
        const date = new Date(user.createdAt).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const kycStatusData = users.reduce((acc, user) => {
        acc[user.kycStatus] = (acc[user.kycStatus] || 0) + 1;
        return acc;
      }, {});

      const tradePerformanceData = trades.reduce((acc, trade) => {
        const date = new Date(trade.createdAt).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const transactionTypeData = transactions.reduce((acc, transaction) => {
        acc[transaction.type] = (acc[transaction.type] || 0) + 1;
        return acc;
      }, {});

      const mostWatchedSymbols = watchlist.reduce((acc, item) => {
        acc[item.symbol] = (acc[item.symbol] || 0) + 1;
        return acc;
      }, {});


      const analyticsData = {
        userGrowth: Object.keys(userGrowthData).map((date) => ({
          date,
          users: userGrowthData[date],
        })),
        kycStatus: Object.keys(kycStatusData).map((status) => ({
          status,
          count: kycStatusData[status],
        })),
        tradePerformance: Object.keys(tradePerformanceData).map((date) => ({
          date,
          trades: tradePerformanceData[date],
        })),
        transactionTypes: Object.keys(transactionTypeData).map((type) => ({
          type,
          count: transactionTypeData[type],
        })),
        mostWatchedSymbols: Object.keys(mostWatchedSymbols)
          .map((symbol) => ({
            symbol,
            count: mostWatchedSymbols[symbol],
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5),
      };

      // console.log("In analyticsData :- ",analyticsData);
        

      res.status(200).json({ success: true,data: analyticsData,totalUsers: users.length,totalTrades: trades.length,totalRevenue: totalRevenue });
    } catch (error) {
      console.log("Error fetching analytics data:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  

}

export default AdminController

