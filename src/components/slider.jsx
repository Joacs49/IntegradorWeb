import React, { useState, useEffect } from 'react';

function Slider({ videos }) {
  const [videoActual, setVideoActual] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoActual((prevVideo) => (prevVideo + 1) % videos.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="slider-wrapper">
      {videos.map((videoUrl, index) => (
        <video
          key={index}
          src={videoUrl}
          className={`slide ${index === videoActual ? 'active' : ''}`}
          autoPlay
          loop
          muted
        />
      ))}
    </div>
  );
}

export default Slider;
