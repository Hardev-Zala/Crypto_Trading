import dotenv from "dotenv"

dotenv.config()

export const ENV_VARS = {
  PORT : process.env.PORT,
  MONGO_URI : process.env.MONGO_URI,
  ACCOUNT_SID : process.env.ACCOUNT_SID,
  AUTH_TOKEN : process.env.AUTH_TOKEN,
  TWILIO_PHONE : process.env.TWILIO_PHONE,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  FINNHUB_API: process.env.API_KEY_OF_FINHUB,
  ALPHAVANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY,
  FINANCIAL_MODELING_PREP_API_KEY: process.env.FINANCIAL_MODELING_PREP_API_KEY,
  EMAIL : process.env.EMAIL_FOR_OTP,
  PASSWORD : process.env.PASSWORD_FOR_OTP,
  INTRINIO_API_KEY : process.env.INTRINIO_API_KEY,
  BINANCE_API_KEY : process.env.BINANCE_API_TESTNET_KEY,
  BINANCE_API_SECRET : process.env.BINANCE_API_TESTNET_SECRET_KEY
}
