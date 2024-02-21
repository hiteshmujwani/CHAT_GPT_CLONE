import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/mongo.js";
import authRoute from "./routes/authRoute.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

//databse connectivity
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build/")));
app.use((req, res, next) => {
  // Set the Access-Control-Allow-Origin header to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Set the Access-Control-Allow-Methods header to allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Set the Access-Control-Allow-Headers header to allow specific headers
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Set the Access-Control-Expose-Headers header to expose specific headers to the client
  res.setHeader("Access-Control-Expose-Headers", "Content-Type, Authorization");

  // Set the Access-Control-Allow-Credentials header to true if you want to allow credentials (cookies, HTTP authentication) to be sent with the request
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

//routes
app.use("/api/v1/auth", authRoute);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
