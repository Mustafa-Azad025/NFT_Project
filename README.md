# NFT_Project

This documentation describes how to set up and use the NFT API. Users can use the API to create, read, update, and remove NFTs. It is built with the web3 framework and served on a decentralised server. The API is secure and adheres to industry-standard security practises.

## Index

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Security Practices](#security-practices)

## Requirements

To set up and use the NFT API, you must have the following requirements:

- Node.js (v12 or above) and npm installed
- Solidity or web3.js knowledge
- Access to a decentralized server (e.g., IPFS node or decentralized cloud platform)
- SSL/TLS certificate for HTTPS encryption
- Private and public keys for JWT token signing and verification

## Installation

Follow these steps :

1. Clone the repository:

   ```shell
   git clone https://github.com/Mustafa-Azad025/NFT_Project.git
   cd NFT_Project
   ```

2. Install all dependencies:

   ```shell
   npm install
   or npm i
   or yarn
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Define the following environment variables in the `.env` file:

     ```
     PORT=3000
     IPFS_NODE_HOST=your-ipfs-node-host
     IPFS_NODE_PORT=your-ipfs-node-port
     IPFS_NODE_PROTOCOL=your-ipfs-node-protocol
     JWT_SECRET=your-jwt-secret
     ```

   - Replace `your-ipfs-node-host`, `your-ipfs-node-port`, `your-ipfs-node-protocol` with the actual values of your IPFS node.
   - Generate a secure random string for `your-jwt-secret`.

4. Generate private and public keys for JWT token signing and verification:

   - Use a tool like OpenSSL to generate the keys:
     ```shell
     openssl genrsa -out private.key 2048
     openssl rsa -in private.key -pubout -out public.key
     ```
   - Make sure to keep the private key secure and not share it publicly.

5. Update SSL/TLS certificate paths:
   - Replace the placeholder paths in `index.js` with the paths to your SSL/TLS certificate files.

## Usage

### API Endpoints

The NFT API provides the following endpoints:

- **GET /nfts**: Get a list of all NFTs.

- **GET /nfts/[id]**: Get a single NFT by ID.

- **POST /nfts**: Create a new NFT.

- **PUT /nfts/[id]**: Update an existing NFT.

- **DELETE /nfts/[id]**: Delete an existing NFT.

### Security Practices

The API follows the following security practices:

- All requests should be authenticated using a JWT token.

  - Include the JWT token in the `Authorization` header with the value `Bearer <token>`.
  - Obtain a JWT token by making a POST request to `/auth/login` with valid credentials.

- All sensitive data is encrypted at rest and in transit.

  - Encryption at rest is handled by the database or storage solution.
  - Encryption in transit is achieved by configuring HTTPS using an SSL/TLS certificate.

- All endpoints are rate-limited to prevent abuse.
  - The rate limit is configured at `<rate-limit-value>` requests per minute.

## Conclusion

The NFT API is a backend solution for managing NFTs that includes functionality for creating, reading, updating, and deleting NFTs.

and removing NFTs. It is built with the web3 framework and served on a decentralised server. You can set up and use the API safely and effectively by following the instructions provided.

Please see the project's source code for more comprehensive code samples and implementation details.

If you have any questions or need further assistance, please contact [mustafaazad533@gmail.com](mailto:mustafaazad533@gmail.com).
