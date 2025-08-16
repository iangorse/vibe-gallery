import imageList from "./imageList.json";
import { useState, useEffect } from "react";

const imageBasePath = "/images/";

function App() {
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [visibleCount, setVisibleCount] = useState(16); // initial number of items

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
      ) {
        setVisibleCount((prev) => {
          if (prev < imageList.length) {
            return Math.min(prev + 12, imageList.length);
          }
          return prev;
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImgClick = (filename) => {
    setFullscreenImg(filename);
  };

  const handleClose = () => {
    setFullscreenImg(null);
  };

  // Removed auto-play logic for videos

  return (
    <div className="App container-fluid">
      <h1 className="my-4 text-center vibe-heading">Vibe Gallery</h1>
      <div className="row g-0">
        {imageList.slice(0, visibleCount).map((filename, idx) => {
          const isVideo = filename.toLowerCase().endsWith('.mp4');
          return (
            <div className="col-6 col-md-4 col-lg-3 p-0" key={idx}>
              <div className="card h-100 border-0 rounded-0">
                {isVideo ? (
                  <video
                    src={imageBasePath + filename}
                    className="card-img-top rounded-0 gallery-img"
                    style={{ objectFit: "cover", height: "100%", cursor: "pointer", transition: "transform 0.2s" }}
                    controls
                    onClick={() => handleImgClick(filename)}
                  />
                ) : (
                  <img
                    src={imageBasePath + filename}
                    className="card-img-top rounded-0 gallery-img"
                    alt={filename}
                    style={{ objectFit: "cover", height: "100%", cursor: "pointer", transition: "transform 0.2s" }}
                    onClick={() => handleImgClick(filename)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {visibleCount < imageList.length && (
        <div className="gallery-spinner">
          <div className="spinner" />
        </div>
      )}

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
          {fullscreenImg.toLowerCase().endsWith('.mp4') ? (
            <video
              src={imageBasePath + fullscreenImg}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                boxShadow: "0 0 40px #000",
                borderRadius: "8px",
              }}
              controls
            />
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}

export default App;
