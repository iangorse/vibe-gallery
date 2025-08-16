import imageList from "./imageList.json";
import { useState } from "react";

const imageBasePath = "/images/";

function App() {
  const [fullscreenImg, setFullscreenImg] = useState(null);

  const handleImgClick = (filename) => {
    setFullscreenImg(filename);
  };

  const handleClose = () => {
    setFullscreenImg(null);
  };

  return (
    <div className="App container-fluid">
      <h1 className="my-4 text-center">Vibe Gallery</h1>
      <div className="row g-0">
        {imageList.map((filename, idx) => (
          <div className="col-6 col-md-4 col-lg-3 p-0" key={idx}>
            <div className="card h-100 border-0 rounded-0">
              <img
                src={imageBasePath + filename}
                className="card-img-top rounded-0 gallery-img"
                alt={filename}
                style={{ objectFit: "cover", height: "100%", cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => handleImgClick(filename)}
              />
            </div>
          </div>
        ))}
      </div>

      {fullscreenImg && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={handleClose}
        >
          <img
            src={imageBasePath + fullscreenImg}
            alt={fullscreenImg}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              boxShadow: "0 0 40px #000",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
