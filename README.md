# SMART CONTRACT COMBINED WITH IPFS


This is a Disk contract for etherum network. It can upload a file to the ipfs and store the hash to Etherum contract.
When we need the file, it will get the hash by name from the smart contract and use it to download the file from ipfs.

Frontend: Use MetaMask in browser to interact with contract network, and also use the ipfs http client to upload and download file.
Contract(\contracts\MyDisk.sol): A basic contract supports write and read the ipfs hash address(CID). 

I used two methods to download the file: 
1. provide a html 'a' link element.(Safer)
2. download to buffer and cast to blob.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install packages.

```bash
npm install

cd ./web
npm install
```
Please have ipfs daemon running.

## Usage

config the truffle-config.js and run
```bash
truffle compile
truffle deploy
```
config the ./web/src/etherumSetting.json

Run the react web



## License
[MIT](https://choosealicense.com/licenses/mit/)
