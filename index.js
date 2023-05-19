require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const nftRoutes = require("./router/nftRouter");

// Create Express app
const app = express();

// Load environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/nft-db";

// Connect to MongoDB
mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	});

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

// Configure rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests
});
app.use(limiter);

// Mount NFT routes
app.use("/api", nftRoutes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
