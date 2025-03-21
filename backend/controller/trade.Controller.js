import { Option, User } from "../model/user.model.js"; 

class TradeController {

  static placeOrder = async (req, res) => {
    const { user, symbol, type, amount, entry } = req.body;
  
    try {
      if (!user || !symbol || !type || !amount || !entry) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Fetch the user's current balance
      const userDoc = await User.findById(user);
      if (!userDoc) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const orderedAmount = entry * amount;
      const brokerageFee = orderedAmount * 0.001; // 0.1% brokerage fee
      const totalDeduction = orderedAmount + brokerageFee; // Total amount to deduct
  
      // Check if the user has sufficient balance
      if (userDoc.balance < totalDeduction) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
  
      // Deduct the ordered amount and brokerage fee from the user's balance
      userDoc.balance -= totalDeduction;
      await userDoc.save();
  
      // Create and save the new order
      const newOrder = new Option({
        user,
        symbol,
        type,
        amount,
        entry,
        status: "open",
      });
  
      await newOrder.save();
  
      res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  static closeOrder = async (req, res) => {
    const { orderId, exitPrice } = req.body;
  
    try {
      const order = await Option.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      if (order.status === "closed") {
        return res.status(400).json({ message: "Order is already closed" });
      }
  
      // Validate exitPrice
      if (typeof exitPrice !== "number" || isNaN(exitPrice)) {
        return res.status(400).json({ message: "Invalid exit price" });
      }
  
      // Calculate PnL
      const pnl = order.type === "CE"
        ? (exitPrice - order.entry) * order.amount
        : (order.entry - exitPrice) * order.amount;
  
      // Validate pnl
      if (isNaN(pnl)) {
        return res.status(400).json({ message: "Invalid PnL calculation" });
      }
  
      const brokerageFee = (order.entry * order.amount)*0.001;

      // Deduct brokerage fee from PnL
      const netPnl = pnl - brokerageFee;
  
      // Validate netPnl
      if (isNaN(netPnl)) {
        return res.status(400).json({ message: "Invalid net PnL calculation" });
      }
  
      // Fetch the user's current balance
      const userDoc = await User.findById(order.user);
      if (!userDoc) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update the user's balance with the net PnL
      userDoc.balance += netPnl;
  
      // Validate the updated balance
      if (isNaN(userDoc.balance)) {
        return res.status(400).json({ message: "Invalid balance update" });
      }
  
      await userDoc.save();
  
      // Update order
      order.exit = exitPrice;
      order.PnL = netPnl; // Save the net PnL
      order.status = "closed";
  
      await order.save();
      res.status(200).json({ message: "Order closed successfully", order });
    } catch (error) {
      console.error("Error closing order:", error);
      res.status(500).json({ message: "Failed to close order" });
    }
  };

  static fetchOrder = async (req,res) => {
    const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const startOfTheDay = new Date()
    startOfTheDay.setHours(0,0,0,0)

    const endOfTheDay = new Date()
    endOfTheDay.setHours(23,59,59,999)
    
    const orders = await Option.find({ user: userId,createdAt: {$gte : startOfTheDay,$lte: endOfTheDay} }).sort({ createdAt: -1 });
    // const orders = await Option.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
  }

  

}

export default TradeController