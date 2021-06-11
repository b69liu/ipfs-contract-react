import React, { useState } from "react";
import ipfsClient from "../ipfs";
import { getCidFromChain } from "../etherum";
const Buffer = require("buffer/").Buffer;

// Reference:
// https://stackoverflow.com/questions/25354313/saving-a-uint8array-to-a-binary-file
const downloadBlob = function (data, fileName) {
    var blob, url;
    blob = new Blob([data]);
    url = window.URL.createObjectURL(blob);
    downloadURL(url, fileName);
    setTimeout(function () {
        return window.URL.revokeObjectURL(url);
    }, 1000);
};

const downloadURL = function (data, fileName) {
    var a;
    a = document.createElement("a");
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = "display: none";
    a.click();
    a.remove();
};

//   Reference:
// https://stackoverflow.com/questions/33702838/how-to-append-bytes-multi-bytes-and-buffer-to-arraybuffer-in-javascript
function concatTypedArrays(a, b) {
    // a, b TypedArray of same type
    var c = new a.constructor(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}

const FileDownloader = (props) => {
    const [fileName, setFileName] = useState(null);
    const [fileCid, setFileCid] = useState(null);
    let data = new Uint8Array(0);

    const onInputChange = (e) => {
        const value = e.target.value;
        setFileName(value);
    };
    const downloadFile = async () => {
        if (!fileName) {
            console.log("Please input file name.");
            return;
        }
        const cid = await getCidFromChain(fileName);
        setFileCid(cid);

        console.log(cid.length);
        if (!cid) {
            console.log("Unable to find cid.");
            return;
        }
        // get file from IPFS
        const stream = ipfsClient.cat(cid);
        for await (const chunk of stream) {
            // // chunks of data are returned as a Buffer, convert it back to a string
            // data += chunk.toString()
            data = concatTypedArrays(data, chunk);
        }
        downloadBlob(data, fileName);
    };
    return (
        <div>
            <input
                type="text"
                name="fileName"
                onChange={onInputChange}
                placeholder="File Name"
            />
            <button onClick={downloadFile} className="btn btn-primary">
                Get File Cid
            </button>
            {fileCid ? (
                <a href={`https://ipfs.io/ipfs/${fileCid}`} target="_blank">
                    Save File Here
                </a>
            ) : null}
        </div>
    );
};

export default FileDownloader;
