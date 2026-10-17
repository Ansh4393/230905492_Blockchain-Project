SupplyTrust: Decentralized Product Authenticity & Supply Chain DApp
1. Problem Statement
SupplyTrust is a decentralized application built on Ethereum that enables transparent product tracking and helps consumers verify product authenticity throughout the supply chain.
2. Tech Stack
- Smart Contract: Solidity (^0.8.20)
- Blockchain: Ganache / Sepolia Testnet
- Frontend: HTML, CSS, JavaScript
- Wallet Integration: MetaMask
- Development Environment: Remix IDE
3. Execution Steps
1. Open Remix IDE and paste the ProductSupplyChain.sol code.
2. Compile the contract using Solidity compiler version 0.8.20.
3. Deploy the contract using MetaMask connected to the selected network.
4. Copy the deployed contract address into app.js.
5. Open index.html in a browser to interact with the DApp.
4. Test Cases
Test Case	Description	Expected Result	Status
TC-1	Register a new product	Product registered successfully	PASS
TC-2	Register a duplicate product ID	Transaction rejected	PASS
TC-3	Unauthorized status update	Access denied	PASS
TC-4	Retrieve product details	Correct product information displayed	PASS
