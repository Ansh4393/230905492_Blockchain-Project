SupplyTrust: Decentralized Product Authenticity & Supply Chain Tracker

 1. Problem Statement

SupplyTrust is a decentralized application built on Ethereum that enables transparent product tracking and helps consumers verify product authenticity throughout the supply chain.

 2. Steps to Execute the Application

1. Open Remix IDE: https://remix.ethereum.org
2. Create `ProductSupplyChain.sol` and paste the smart contract code.
3. Compile using Solidity version `0.8.20`.
4. Select Injected Provider - MetaMask and deploy the contract.
5. Copy the deployed contract address into `app.js`.
6. Open `index.html` in a web browser.

 3. MetaMask Integration and Application Usage

1. Open `index.html` and click Connect MetaMask.
2. Approve the connection request.
3. Register a product by entering its ID, name, and manufacturer.
4. Update the product status using the Update Status option.
5. Enter a registered product ID and click Fetch Details to view its information.

Product registration and status updates are restricted to the contract owner.

 4. Deployment Details

Deployment Network: Ganache / Remix VM / Sepolia Testnet

Contract Address: `0xYOUR_DEPLOYED_CONTRACT_ADDRESS_HERE`

Replace the placeholder with the actual deployed contract address.

 5. Test Cases

| Test Case | Scenario | Expected Result |
|---|---|---|
| TC-01 | Register a new product | Product registered successfully |
| TC-02 | Register a duplicate product ID | Registration rejected |
| TC-03 | Register a product with ID zero | Registration rejected |
| TC-04 | Update status using a non-owner wallet | Access denied |
| TC-05 | Retrieve registered product details | Correct product information displayed |
