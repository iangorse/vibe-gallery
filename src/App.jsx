import imageList from "./imageList.json";
import { useState, useEffect, useRef } from "react";



const imageBasePath = "/images/";

function VideoItem({ filename, idx, handleImgClick }) {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handlePause = () => setIsPaused(true);
    const handlePlay = () => setIsPaused(false);
    video.addEventListener('pause', handlePause);
    video.addEventListener('play', handlePlay);
    return () => {
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('play', handlePlay);
    };
  }, []);
  return (
    <div className="col-6 col-md-4 col-lg-3 p-0" style={{position: 'relative'}}>
      <div className="card h-100 border-0 rounded-0">
        <video
          ref={videoRef}
          id={`gallery-video-${idx}`}
          src={imageBasePath + filename}
          className="card-img-top rounded-0 gallery-img"
          style={{ objectFit: "cover", height: "100%", cursor: "pointer", transition: "transform 0.2s" }}
          controls={false}
          onClick={e => {
            if (e.target.paused) {
              e.target.play();
            } else {
              e.target.pause();
            }
          }}
          onDoubleClick={() => handleImgClick(filename, idx)}
        />
        {isPaused && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 2,
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="white" style={{marginLeft: 6}}>
              <circle cx="16" cy="16" r="16" fill="none" />
              <polygon points="12,10 24,16 12,22" fill="white" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [shuffledList, setShuffledList] = useState([]);
  const pageSize = 24;
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setShuffledList(shuffleArray(imageList));
  }, []);

  const handleImgClick = (filename, idx) => {
    const isVideo = filename.toLowerCase().endsWith('.mp4');
    if (isVideo) {
      const galleryVideos = document.querySelectorAll('video[id^="gallery-video-"]');
      galleryVideos.forEach(video => {
        if (!video.paused) video.pause();
      });
    }
    setFullscreenImg(filename);
  };

  const handleClose = () => {
    setFullscreenImg(null);
  };

  // Filter logic
  const filteredList = shuffledList.filter(filename => {
    if (filter === 'all') return true;
    if (filter === 'images') return !filename.toLowerCase().endsWith('.mp4');
    if (filter === 'videos') return filename.toLowerCase().endsWith('.mp4');
    return true;
  });

  const totalPages = Math.ceil(filteredList.length / pageSize);
  const pagedList = filteredList.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="App container-fluid">
      <h1 className="my-4 text-center vibe-heading">Vibe Gallery</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <select
          className="form-select w-auto"
          value={filter}
          onChange={e => { setFilter(e.target.value); setPage(1); }}
        >
          <option value="all">All</option>
          <option value="images">Images</option>
          <option value="videos">Videos</option>
        </select>
      </div>
      <div className="row g-0">
        {pagedList.map((filename, idx) => {
          const isVideo = filename.toLowerCase().endsWith('.mp4');
          return isVideo ? (
            <VideoItem key={idx + (page-1)*pageSize} filename={filename} idx={idx + (page-1)*pageSize} handleImgClick={handleImgClick} />
          ) : (
            <div className="col-6 col-md-4 col-lg-3 p-0" key={idx + (page-1)*pageSize}>
              <div className="card h-100 border-0 rounded-0">
                <img
                  src={imageBasePath + filename}
                  className="card-img-top rounded-0 gallery-img"
                  alt={filename}
                  style={{ objectFit: "cover", height: "100%", cursor: "pointer", transition: "transform 0.2s" }}
                  loading="lazy"
                  onClick={() => handleImgClick(filename, idx + (page-1)*pageSize)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "2rem 0" }}>
        <button
          className="btn btn-outline-primary mx-2"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ fontWeight: 600, fontSize: "1.2rem" }}>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary mx-2"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
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
              autoPlay
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
