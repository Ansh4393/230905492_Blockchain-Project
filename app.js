const contractAddress = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{ "indexed": true, "internalType": "uint256", "name": "productId", "type": "uint256" },
			{ "indexed": false, "internalType": "string", "name": "productName", "type": "string" },
			{ "indexed": true, "internalType": "address", "name": "manufacturer", "type": "address" }
		],
		"name": "ProductRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{ "indexed": true, "internalType": "uint256", "name": "productId", "type": "uint256" },
			{ "indexed": false, "internalType": "enum ProductSupplyChain.Status", "name": "newStatus", "type": "uint8" },
			{ "indexed": true, "internalType": "address", "name": "updater", "type": "address" }
		],
		"name": "StatusUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{ "internalType": "uint256", "name": "_productId", "type": "uint256" }
		],
		"name": "getProduct",
		"outputs": [
			{ "internalType": "uint256", "name": "id", "type": "uint256" },
			{ "internalType": "string", "name": "name", "type": "string" },
			{ "internalType": "string", "name": "manufacturer", "type": "string" },
			{ "internalType": "enum ProductSupplyChain.Status", "name": "status", "type": "uint8" },
			{ "internalType": "address", "name": "currentOwnerAddress", "type": "address" },
			{ "internalType": "uint256", "name": "time", "type": "uint256" }
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{ "internalType": "address", "name": "", "type": "address" }
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{ "internalType": "uint256", "name": "_productId", "type": "uint256" },
			{ "internalType": "string", "name": "_productName", "type": "string" },
			{ "internalType": "string", "name": "_manufacturerName", "type": "string" }
		],
		"name": "registerProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{ "internalType": "uint256", "name": "_productId", "type": "uint256" },
			{ "internalType": "enum ProductSupplyChain.Status", "name": "_newStatus", "type": "uint8" }
		],
		"name": "updateProductStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let provider;
let signer;
let contract;

const statusNames = ["Manufactured", "Shipped", "Out For Delivery", "Delivered"];

async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            const address = await signer.getAddress();
            document.getElementById("walletStatus").innerText = `Connected: ${address.substring(0,6)}...${address.substring(38)}`;
            document.getElementById("walletStatus").style.color = "#27ae60";
            contract = new ethers.Contract(contractAddress, contractABI, signer);
        } catch (error) {
            alert("User denied wallet connection.");
        }
    } else {
        alert("Please install MetaMask to use this DApp.");
    }
}

async function registerProduct() {
    try {
        const id = document.getElementById("regId").value;
        const name = document.getElementById("regName").value;
        const manufacturer = document.getElementById("regManufacturer").value;

        const tx = await contract.registerProduct(id, name, manufacturer);
        alert("Transaction submitted! Waiting for confirmation...");
        await tx.wait();
        alert("Product registered successfully!");
    } catch (err) {
        alert("Transaction Failed: " + (err.reason || err.message));
    }
}

async function updateStatus() {
    try {
        const id = document.getElementById("updateId").value;
        const statusVal = document.getElementById("updateStatusVal").value;

        const tx = await contract.updateProductStatus(id, statusVal);
        alert("Transaction submitted! Waiting for confirmation...");
        await tx.wait();
        alert("Product status updated successfully!");
    } catch (err) {
        alert("Transaction Failed: " + (err.reason || err.message));
    }
}

async function verifyProduct() {
    try {
        const id = document.getElementById("verifyId").value;
        const data = await contract.getProduct(id);
        
        const resultDiv = document.getElementById("productResult");
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `
            <strong>Product ID:</strong> ${data.id.toString()}<br>
            <strong>Product Name:</strong> ${data.name}<br>
            <strong>Manufacturer:</strong> ${data.manufacturer}<br>
            <strong>Current Status:</strong> ${statusNames[data.status]}<br>
            <strong>Current Owner:</strong> ${data.currentOwnerAddress}<br>
            <strong>Last Updated:</strong> ${new Date(data.time.toNumber() * 1000).toLocaleString()}
        `;
    } catch (err) {
        alert("Retrieval Failed: " + (err.reason || err.message));
    }
}
