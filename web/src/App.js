import logo from './logo.svg';
import './App.css';
import ConnectButton from "./components/ConnectButton";
import FileUploader from "./components/FileUploader";
import FileDownloader from "./components/FileDownloader";

function App() {


  return (
    <div className="App">
      <ConnectButton/>
      <FileUploader/>
      <FileDownloader/>

    </div>
  );
}

export default App;
