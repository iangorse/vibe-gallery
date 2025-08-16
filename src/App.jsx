
import imageList from "./imageList.json";
import { useState, useEffect, useRef } from "react";

const imageBasePath = "images/";
const thumbBasePath = "tn/";

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
  const maxImages = 100;

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

  // Only show 100 random mp4 thumbnails
  const mp4Files = shuffledList.filter(f => f.toLowerCase().endsWith('.mp4'));
  const pagedList = mp4Files.slice(0, maxImages);

  // Remove all default margin/padding from body and html (global style)
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
  }, []);

  return (
    <div className="App container-fluid" style={{ background: '#000', minHeight: '100vh', paddingBottom: '2rem', margin: 0, padding: 0 }}>
      <div className="header-bar" style={{
        width: '100vw',
        left: 0,
        top: 0,
        position: 'relative',
        padding: '1.2rem 0 1rem 0',
        background: 'linear-gradient(120deg, #4f8cff 0%, #6a5af9 50%, #a259ec 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        textAlign: 'center',
        color: '#fff',
        margin: 0,
        borderRadius: 0,
        zIndex: 10,
      }}>
        <h1 className="vibe-heading" style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '1.2rem', letterSpacing: '2px', color: 'inherit', textShadow: '0 2px 16px #ee0979, 0 1px 0 #43cea2' }}>Vibe Gallery</h1>
        <div style={{ fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem', color: 'rgba(255,255,255,0.92)' }}>
          Application built with AI
        </div>
        <div style={{ fontSize: '1.05rem', fontWeight: 400, color: 'rgba(255,255,255,0.8)' }}>
          refresh to show more
        </div>
      </div>
      <div className="gallery-flex" style={{ display: 'flex', flexWrap: 'wrap', gap: 0, justifyContent: 'center', width: '100%' }}>
        {pagedList.map((filename, idx) => {
          const isVideo = filename.toLowerCase().endsWith('.mp4');
          return isVideo ? (
            <VideoItem key={idx} filename={filename} idx={idx} handleImgClick={handleImgClick} />
          ) : (
            <div className="gallery-item" key={idx} style={{ flex: '1 1 320px', maxWidth: '420px', minWidth: '220px', background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch', margin: 0, padding: 0 }}>
              <img
                src={thumbBasePath + filename}
                alt={filename}
                style={{ objectFit: "cover", width: "100%", height: "100%", display: "block", margin: 0, padding: 0, borderRadius: 0, boxShadow: 'none', background: "#eee" }}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
