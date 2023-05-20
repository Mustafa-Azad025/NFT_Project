const NFT = require("../models/nft");
const ipfsClient = require("ipfs-http-client");

// Create IPFS client
const ipfs = ipfsClient({
	host: process.env.IPFS_NODE_HOST || "ipfs.infura.io",
	port: process.env.IPFS_NODE_PORT || 5001,
	protocol: process.env.IPFS_NODE_PROTOCOL || "https",
});

// Get a list of all NFTs
export const getAllNFT = async (req, res) => {
	try {
		const nfts = await NFT.find().populate("owner", "username");
		res.json(nfts);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server Error" });
	}
};

// Get a single NFT by ID
export const getNFTById = async (req, res) => {
	const { id } = req.params;

	try {
		const nft = await NFT.findById(id).populate("owner", "username");
		if (!nft) {
			return res.status(404).json({ error: "NFT not found" });
		}
		res.json(nft);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server Error" });
	}
};

// Create a new NFT
export const createNFT = async (req, res) => {
	const { name, description, image } = req.body;

	try {
		// Add the image to IPFS and get the CID
		const imageCID = await addFileToIPFS(image);

		const nft = new NFT({
			name,
			description,
			image: imageCID,
			owner: req.user._id,
		});
		await nft.save();
		res.status(201).json(nft);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server Error" });
	}
};

// Helper function to add file to IPFS
const addFileToIPFS = async (file) => {
	const fileData = Buffer.from(file.data, "base64");
	const ipfsResponse = await ipfs.add(fileData);
	const fileCID = ipfsResponse.cid.toString();
	return fileCID;
};

// Update an existing NFT
export const updateNFT = async (req, res) => {
	const { id } = req.params;
	const { name, description, image } = req.body;

	try {
		let nft = await NFT.findById(id);
		if (!nft) {
			return res.status(404).json({ error: "NFT not found" });
		}
		nft.name = name;
		nft.description = description;
		nft.image = image;
		nft.updatedAt = Date.now();
		await nft.save();
		res.json(nft);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server Error" });
	}
};

// Delete an existing NFT
export const deleteNFT = async (req, res) => {
	const { id } = req.params;

	try {
		const nft = await NFT.findById(id);
		if (!nft) {
			return res.status(404).json({ error: "NFT not found" });
		}
		await nft.remove();
		res.json({ message: "NFT deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server Error" });
	}
};
