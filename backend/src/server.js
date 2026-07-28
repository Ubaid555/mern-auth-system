import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is runing on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
