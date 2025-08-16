
import imageList from "./imageList.json";
import { useState, useEffect, useRef } from "react";

const imageBasePath = "images/";
const thumbBasePath = "tn/";

function VideoItem({ filename, idx, handleImgClick }) {
  // Custom context menu state
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  // Close menu on outside click
  useEffect(() => {
    if (!menu.visible) return;
    const handleClick = (e) => {
      // If click is outside the menu, close it
      if (e.target.closest('.custom-context-menu') === null) {
        setMenu(prev => ({ ...prev, visible: false }));
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [menu.visible]);
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
  // Generate a random name for the downloaded file
  const randomNames = ["Zap", "PixelPop", "VibeDrop", "Nova", "Echo", "Pulse", "Flux", "Spark", "Blitz", "Muse", "Jolt", "Lume", "Glint", "Flick", "Quark", "Twist", "Dash", "Glow", "Riff", "Sway", "Drift", "Wisp", "Faze", "Rave", "Chime", "Flicker", "Flash", "Beat", "Groove", "Wave", "Burst"];
  const fileExt = filename.split('.').pop();
  const randomFileName = randomNames[Math.floor(Math.random() * randomNames.length)] + '-' + Math.floor(Math.random()*10000) + '.' + fileExt;

  // ...existing code...
  const holdTimeout = useRef(null);
  const handleHoldStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const menuHeight = 80; // estimated height of menu in px
    const menuWidth = 180; // estimated width of menu in px
    const viewportWidth = window.innerWidth;
    const x = Math.min(clientX, viewportWidth - menuWidth - 10);
    holdTimeout.current = setTimeout(() => {
      setMenu({ visible: true, x: x, y: Math.max(clientY - menuHeight, 10) });
    }, 700);
  };
  const handleHoldEnd = () => {
    clearTimeout(holdTimeout.current);
  };
  const handleCloseMenu = () => setMenu({ ...menu, visible: false });
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = thumbBasePath + filename;
    link.download = randomFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleCloseMenu();
  };
  return (
    <div className="col-6 col-md-4 col-lg-3 p-0" style={{position: 'relative'}}>
      <div className="card h-100 border-0 rounded-0">
        <video
          ref={videoRef}
          id={`gallery-video-${idx}`}
          src={thumbBasePath + filename}
          className="card-img-top rounded-0 gallery-img"
          style={{ objectFit: "cover", height: "100%", cursor: "pointer", transition: "transform 0.2s" }}
          controls={false}
          onClick={e => {
            // Pause all other videos
            const galleryVideos = document.querySelectorAll('video[id^="gallery-video-"]');
            galleryVideos.forEach(video => {
              if (video !== e.target && !video.paused) video.pause();
            });
            if (e.target.paused) {
              e.target.play();
            } else {
              e.target.pause();
            }
          }}
          onDoubleClick={() => handleImgClick(filename, idx)}
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onMouseLeave={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
          onContextMenu={e => e.preventDefault()}
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
        {menu.visible && (
          <div className="custom-context-menu" style={{
            position: 'fixed',
            left: menu.x,
            top: menu.y,
            background: 'rgba(30,30,30,0.98)',
            color: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            zIndex: 9999,
            padding: '10px 18px',
            minWidth: 120,
            fontSize: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <button onClick={handleDownload} style={{
              background: '#4f8cff',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 18px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: 4,
            }}>Download</button>
            <button onClick={handleCloseMenu} style={{
              background: 'transparent',
              color: '#fff',
              border: 'none',
              fontSize: '0.95rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}>Cancel</button>
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

function GalleryImage({ filename }) {
  // Custom context menu state
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  // Close menu on outside click
  useEffect(() => {
    if (!menu.visible) return;
    const handleClick = (e) => {
      if (e.target.closest('.custom-context-menu') === null) {
        setMenu(prev => ({ ...prev, visible: false }));
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [menu.visible]);
  const randomNames = ["Zap", "PixelPop", "VibeDrop", "Nova", "Echo", "Pulse", "Flux", "Spark", "Blitz", "Muse", "Jolt", "Lume", "Glint", "Flick", "Quark", "Twist", "Dash", "Glow", "Riff", "Sway", "Drift", "Wisp", "Faze", "Rave", "Chime", "Flicker", "Flash", "Beat", "Groove", "Wave", "Burst"];
  const fileExt = filename.split('.').pop();
  const randomFileName = randomNames[Math.floor(Math.random() * randomNames.length)] + '-' + Math.floor(Math.random()*10000) + '.' + fileExt;
  const holdTimeout = useRef(null);
  const handleHoldStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const menuHeight = 80; // estimated height of menu in px
    const menuWidth = 180; // estimated width of menu in px
    const viewportWidth = window.innerWidth;
    const x = Math.min(clientX, viewportWidth - menuWidth - 10);
    holdTimeout.current = setTimeout(() => {
      setMenu({ visible: true, x: x, y: Math.max(clientY - menuHeight, 10) });
    }, 700);
  };
  const handleHoldEnd = () => {
    clearTimeout(holdTimeout.current);
  };
  const handleCloseMenu = () => setMenu({ ...menu, visible: false });
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = thumbBasePath + filename;
    link.download = randomFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleCloseMenu();
  };
  return (
    <div className="gallery-item" style={{ flex: '1 1 320px', maxWidth: '420px', minWidth: '220px', background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch', margin: 0, padding: 0, position: 'relative' }}>
      <img
        src={thumbBasePath + filename}
        alt={filename}
        style={{ objectFit: "cover", width: "100%", height: "100%", display: "block", margin: 0, padding: 0, borderRadius: 0, boxShadow: 'none', background: "#eee" }}
        loading="lazy"
        onMouseDown={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onMouseLeave={handleHoldEnd}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
        onContextMenu={e => e.preventDefault()}
      />
      {menu.visible && (
        <div className="custom-context-menu" style={{
          position: 'fixed',
          left: menu.x,
          top: menu.y,
          background: 'rgba(30,30,30,0.98)',
          color: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
          zIndex: 9999,
          padding: '10px 18px',
          minWidth: 120,
          fontSize: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <button onClick={handleDownload} style={{
            background: '#4f8cff',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: 4,
          }}>Download</button>
          <button onClick={handleCloseMenu} style={{
            background: 'transparent',
            color: '#fff',
            border: 'none',
            fontSize: '0.95rem',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [shuffledList, setShuffledList] = useState([]);
  const maxImages = 50;

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

  // Show up to 100 random images and videos
  const pagedList = shuffledList.slice(0, maxImages);

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
        padding: '0.6rem 0 0.5rem 0',
        background: 'linear-gradient(120deg, #4f8cff 0%, #6a5af9 50%, #a259ec 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        textAlign: 'center',
        color: '#fff',
        margin: 0,
        borderRadius: 0,
        zIndex: 10,
      }}>
        <h1 className="vibe-heading" style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.4rem', letterSpacing: '1.5px', color: '#fff', textShadow: '0 1px 6px #ee0979, 0 1px 0 #43cea2' }}>Vibe Gallery</h1>
        <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem', color: '#ffeb3b', textShadow: '0 1px 6px #6a5af9' }}>
          now with <span style={{color:'#ee0979', fontWeight:900}}>video support!</span>
        </div>
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
            <GalleryImage key={idx} filename={filename} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
