import dotenv from "dotenv";
dotenv.config();

interface Config {
  env: string;
  port: number;
  jwtSecret: string;
  jwtAcountActivation: string;
  mongoUri: string;
  sendGridApiKey: string | undefined;
}

export const config: Config = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET || "your_secret_key",
  jwtAcountActivation:
    process.env.JWT_ACCOUNT_ACTIVATION || "acount_activation",
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    `mongodb://${process.env.IP || "localhost"}:${
      process.env.MONGO_PORT || "27017"
    }/the-curacao-menu-app-db`,
};
