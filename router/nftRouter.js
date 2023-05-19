const express = require("express");
const router = express.Router();
const nftController = require("../controller/nftController");

// GET /nfts
router.get("/nfts", nftController.getAllNFTs);

// GET /nfts/:id
router.get("/nfts/:id", nftController.getNFTById);

// POST /nfts
router.post("/nfts", nftController.createNFT);

// PUT /nfts/:id
router.put("/nfts/:id", nftController.updateNFT);

// DELETE /nfts/:id
router.delete("/nfts/:id", nftController.deleteNFT);

module.exports = router;
