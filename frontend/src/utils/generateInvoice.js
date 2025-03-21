// utils/generateInvoice.js
import { jsPDF } from "jspdf";
import brand from "/brand_icon.png"
// Placeholder TradingView logo URL (replace with your actual logo)
const logoUrl = brand;

export const generateInvoice = (order) => {
  const doc = new jsPDF();

  // Set up colors and fonts
  const primaryColor = "#007BFF"; // Blue
  const secondaryColor = "#4A90E2"; // Light blue
  const textColor = "#333333"; // Dark gray
  const lightTextColor = "#777777"; // Gray
  const whiteColor = "#FFFFFF"; // White

  // Add a header with a solid color background
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 50, "F"); // Header background

  // Add TradingView logo (centered and larger)
  doc.addImage(logoUrl, "PNG", 80, 10, 50, 20); // Centered logo

  // Add company details (below the logo)
  doc.setFontSize(10);
  doc.setTextColor(whiteColor);
  doc.setFont("helvetica", "bold");
  doc.text("TradingView", 80, 35);
  doc.setFont("helvetica", "normal");
  doc.text("123 Trading Street, New York, NY 10001", 60, 40);
  doc.text("Phone: +1 (123) 456-7890 | Email: support@tradingview.com", 50, 45);

  // Add invoice title
  doc.setFontSize(18);
  doc.setTextColor(primaryColor);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 15, 60);

  // Add a horizontal line separator
  doc.setDrawColor(lightTextColor);
  doc.setLineWidth(0.5);
  doc.line(15, 65, 195, 65);

  // Add invoice details
  doc.setFontSize(12);
  doc.setTextColor(textColor);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice Number: ${order._id}`, 15, 75);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 82);

  // Add a table for order details
  const startY = 90;
  doc.setFontSize(12);
  doc.setTextColor(textColor);
  doc.setFont("helvetica", "bold");
  doc.text("Description", 15, startY);
  doc.text("Amount", 150, startY);

  // Add order details
  doc.setFont("helvetica", "normal");
  doc.text(`Symbol: ${order.symbol}`, 15, startY + 10);
  doc.text(`Type: ${order.type}`, 15, startY + 18);
  doc.text(`Quantity: ${order.amount}`, 15, startY + 26);
  doc.text(`Entry Price: $${order.entry.toFixed(2)}`, 15, startY + 34);
  doc.text(`Exit Price: $${order.exit?.toFixed(2) || "-"}`, 15, startY + 42);
  doc.text(`PnL: $${order.PnL?.toFixed(2) || "-"}`, 15, startY + 50);

  // Calculate brokerage charge (0.1% of trade value)
  const tradeValue = order.amount * order.entry;
  const brokerageCharge = tradeValue * 0.001; // 0.1%
  doc.text(`Brokerage Charge: $${brokerageCharge.toFixed(2)}`, 15, startY + 58);

  // Calculate total amount (trade value + brokerage charge)
  const totalAmount = tradeValue + brokerageCharge;
  doc.setFont("helvetica", "bold");
  doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 15, startY + 66);

  // Add a footer with a solid color background
  doc.setFillColor(primaryColor);
  doc.rect(0, 250, 210, 40, "F"); // Footer background

  // Add a thank you message
  doc.setFontSize(10);
  doc.setTextColor(whiteColor);
  doc.setFont("helvetica", "bold");
  doc.text("Thank you for trading with TradingView!", 15, 260);
  doc.setFont("helvetica", "normal");
  doc.text("Visit us at http://localhost:5173", 15, 265);

  // Save the PDF
  doc.save(`invoice_${order._id}.pdf`);
};