import { ethers } from "ethers";
import MyDiskAbi from "./abis/MyDiskAbi.json";
import { contractAddress } from "./etherumSetting.json";

let provider;
let signer;
let MyDiskUnsigned;
let SignedContract;
const connectMetaMask = () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    MyDiskUnsigned = new ethers.Contract(contractAddress, MyDiskAbi, provider);
    SignedContract = MyDiskUnsigned.connect(signer);
};

const getCidFromChain = async (filename) => {
    if (!provider) {
        console.log("Please connect to MetaMask");
        return false;
    }
    console.log("fetching cid from chain with name:", filename);
    let result = await SignedContract.getCid(filename);
    console.log("fetch result:", result);
    return result;
};

const saveCidToChain = async (filename, cid) => {
    if (!provider) {
        console.log("Please connect to MetaMask");
        return false;
    }
    await SignedContract.saveCid(filename, cid);
};

export { connectMetaMask, getCidFromChain, saveCidToChain };
