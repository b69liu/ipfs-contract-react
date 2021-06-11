const { create } = require('ipfs-http-client');
const client = create('http://localhost:5001');
export default client;

// For the cors issue:
// https://stackoverflow.com/questions/55569973/js-ipfs-http-client-via-browser-fails-due-to-cors-issue


// const ipfsApi = require('ipfs-api');
// const ipfs = new ipfsApi('localhost','5001',{protocol: 'http'});
// export default ipfs;
