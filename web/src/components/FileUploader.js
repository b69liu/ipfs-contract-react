import React, { useState } from "react";
import ipfsClient from "../ipfs";
import { saveCidToChain } from "../etherum";

const Buffer = require("buffer/").Buffer;
// Reference:
// https://gist.github.com/harlantwood/58990ebe47b54e05020a13a45a124dff

function FileUploader(props) {
    let [selectFile, setSelectedFile] = useState(null);
    let [savedCid, setCid] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
    };

    const selectFileHandler = async (event) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const uploadFile = async () => {
        if (!selectFile) {
            console.log("Please select a file.");
            return;
        }
        var reader = new FileReader();
        reader.onload = function () {
            const buffer = Buffer.from(this.result);
            //    DO NOT CONVERT TO STRING
            //   const arrayBuffer = this.result
            //   let array = new Uint8Array(arrayBuffer)
            //   const binaryString = String.fromCharCode.apply(null, array);
            const fileName = selectFile.name;
            uploadToIpfs(buffer, fileName);
        };
        reader.readAsArrayBuffer(selectFile);
    };

    const uploadToIpfs = async (data, storedFileName) => {
        console.log("adding data");
        const { cid } = await ipfsClient.add(data);
        setCid(cid.string);
        saveCidToChain(storedFileName, cid.string);
        console.log(cid.string);
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <form id="uploadFile" onSubmit={onSubmit}>
                    <div className="form-group files">
                        <label>Upload Your File </label>
                        <input
                            type="file"
                            className="form-control"
                            multiple=""
                            onChange={selectFileHandler}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={uploadFile}>
                        {" "}
                        Upload To Ipfs{" "}
                    </button>
                </form>
                {savedCid ? `CID: ${savedCid}` : ""}
            </div>
        </div>
    );
}

export default FileUploader;
