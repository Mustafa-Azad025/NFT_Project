const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const privateKey = fs.readFileSync("private.key", "utf8");
const publicKey = fs.readFileSync("public.key", "utf8");
const JWT_ALGORITHM = "RS256";
const JWT_EXPIRATION = "1h";

// Generate JWT token
const generateToken = (payload) => {
	return jwt.sign(payload, privateKey, {
		expiresIn: JWT_EXPIRATION,
	});
};

// Verify JWT token
const verifyToken = (token) => {
	try {
		return jwt.verify(token, publicKey, { algorithms: [JWT_ALGORITHM] });
	} catch (error) {
		throw new Error("Invalid token");
	}
};

// Hash password using bcrypt
const hashPassword = async (password) => {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
};

// Compare password with hashed password using bcrypt
const comparePassword = async (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword);
};

// Encrypt sensitive data using crypto
const encryptData = (data) => {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(
		"aes-256-cbc",
		crypto.randomBytes(32),
		iv
	);
	let encrypted = cipher.update(data, "utf8", "hex");
	encrypted += cipher.final("hex");
	return `${iv.toString("hex")}:${encrypted}`;
};

// Decrypt encrypted data using crypto
const decryptData = (encryptedData) => {
	const [iv, encrypted] = encryptedData.split(":");
	const decipher = crypto.createDecipheriv(
		"aes-256-cbc",
		crypto.randomBytes(32),
		Buffer.from(iv, "hex")
	);
	let decrypted = decipher.update(encrypted, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
};

module.exports = {
	generateToken,
	verifyToken,
	hashPassword,
	comparePassword,
	encryptData,
	decryptData,
};
