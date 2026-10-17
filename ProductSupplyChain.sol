// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProductSupplyChain {
    enum Status { Manufactured, Shipped, OutForDelivery, Delivered }

    struct Product {
        uint256 productId;
        string productName;
        string manufacturerName;
        Status currentStatus;
        address currentOwner;
        uint256 timestamp;
    }

    address public owner;
    mapping(uint256 => Product) public products;
    mapping(uint256 => bool) public productExists;

    event ProductRegistered(uint256 indexed productId, string productName, address indexed manufacturer);
    event StatusUpdated(uint256 indexed productId, Status newStatus, address indexed updater);

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorised: Only contract owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerProduct(
        uint256 _productId,
        string memory _productName,
        string memory _manufacturerName
    ) public onlyOwner {
        require(_productId > 0, "Invalid Input: Product ID must be greater than zero");
        require(!productExists[_productId], "Invalid Input: Product ID already registered");
        require(bytes(_productName).length > 0, "Invalid Input: Product name cannot be empty");
        require(bytes(_manufacturerName).length > 0, "Invalid Input: Manufacturer name cannot be empty");

        products[_productId] = Product({
            productId: _productId,
            productName: _productName,
            manufacturerName: _manufacturerName,
            currentStatus: Status.Manufactured,
            currentOwner: msg.sender,
            timestamp: block.timestamp
        });

        productExists[_productId] = true;
        emit ProductRegistered(_productId, _productName, msg.sender);
    }

    function updateProductStatus(uint256 _productId, Status _newStatus) public onlyOwner {
        require(productExists[_productId], "Invalid Input: Product does not exist");
        require(uint8(_newStatus) <= 3, "Invalid Input: Status out of range");

        Product storage prod = products[_productId];
        require(uint8(_newStatus) > uint8(prod.currentStatus), "Invalid Input: Status can only move forward");

        prod.currentStatus = _newStatus;
        prod.timestamp = block.timestamp;

        emit StatusUpdated(_productId, _newStatus, msg.sender);
    }

    function getProduct(uint256 _productId) public view returns (
        uint256 id,
        string memory name,
        string memory manufacturer,
        Status status,
        address currentOwnerAddress,
        uint256 time
    ) {
        require(productExists[_productId], "Invalid Input: Product does not exist");
        Product memory prod = products[_productId];
        return (
            prod.productId,
            prod.productName,
            prod.manufacturerName,
            prod.currentStatus,
            prod.currentOwner,
            prod.timestamp
        );
    }
}
