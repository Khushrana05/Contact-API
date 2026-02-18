import express from "express";
import mongoose from "mongoose";
import { contactRoutes } from "./routes/contactRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import{config} from "dotenv";
config({path:".env"});
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb+srv://victorvondoom0511:khush123@cluster.3xazede.mongodb.net/?appName=Cluster", {
    dbName: "Contact_API",
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
