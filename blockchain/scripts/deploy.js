const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const saveFiles = require("./Helper_Function");

async function main() {

    const DaoContract = await ethers.getContractFactory("Dao");
    console.log("Deploying Dao...");
    const dao = await DaoContract.deploy();

    await dao.deployed();
    console.log("streamYou deployed to:", dao.address);
    saveFiles(dao,"Dao");
}

main();