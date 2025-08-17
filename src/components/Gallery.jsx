import React, { useState, useEffect } from "react";

const Gallery = ({ pagedList, thumbBasePath, handleImgClick, VideoItem }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pagedList || pagedList.length === 0) {
      setLoading(true);
      return;
    }
    let loaded = 0;
    const total = pagedList.length;
    const handleLoad = () => {
      loaded++;
      if (loaded >= total) setLoading(false);
    };
    pagedList.forEach(filename => {
      if (!filename.toLowerCase().endsWith('.mp4')) {
        const img = new window.Image();
        img.src = thumbBasePath + filename;
        img.onload = handleLoad;
        img.onerror = handleLoad;
      } else {
        loaded++;
        if (loaded >= total) setLoading(false);
      }
    });
    if (total === 0) setLoading(false);
    return () => {};
  }, [pagedList, thumbBasePath]);

  if (loading) {
    return (
      <div className="gallery-spinner" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <div className="spinner" style={{ width: 48, height: 48, border: '6px solid #eee', borderTop: '6px solid #ee0979', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div className="gallery-grid" style={{
      display: 'grid',
      gap: '3px',
      width: '100%',
      margin: 0,
      padding: 0,
    }}>
      {pagedList.map((filename, idx) => {
        const isVideo = filename.toLowerCase().endsWith('.mp4');
        return isVideo ? (
          <VideoItem key={idx} filename={filename} idx={idx} handleImgClick={handleImgClick} />
        ) : (
          <div className="gallery-item" key={idx} style={{ background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch', margin: 0, padding: 0 }}>
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
  );
};

export default Gallery;
