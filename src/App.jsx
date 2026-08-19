import React, { useState, useEffect } from 'react';
import FlipCard from './components/FlipCard';
import InfoWidget from './components/InfoWidget';

function App() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [snapTarget, setSnapTarget] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('neto.beats1212@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMagneticEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSnapTarget({
      width: rect.width + 30,
      height: rect.height + 20,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cardsData = [
    {
      label: 'Tienda_',
      frontImage: '/%20-5.jpg',
      title: 'Tienda',
      link: 'https://beatzone-tan.vercel.app',
    },
    {
      label: 'Instagram_',
      frontImage: '/%20-6.jpg',
      backImage: '/profile.jpg',
      title: 'Instagram',
      link: 'https://www.instagram.com/netoygn?igsh=d2h5NmNmNTBodnhu&utm_source=qr',
    },
    {
      label: 'Soundcloud_',
      frontImage: '/Estrella.jpg',
      title: 'SoundCloud',
      link: 'https://soundcloud.com/user-819120703',
    },
    {
      label: 'Youtube_',
      frontImage: '/coco.jpg', // Reusing one since 3 new images were uploaded
      title: 'YouTube',
      link: 'https://www.youtube.com/@neto8457',
    }
  ];

  return (
    <>
      <div
        className={`custom-cursor ${snapTarget ? 'snapped' : ''}`}
        style={{
          left: snapTarget ? snapTarget.x : cursorPos.x,
          top: snapTarget ? snapTarget.y : cursorPos.y,
          width: snapTarget ? snapTarget.width : undefined,
          height: snapTarget ? snapTarget.height : undefined
        }}
      ></div>

      <div className="app-container">
        <div className="bg-text">PRODUCER</div>

        <div className="top-center-title">Landing_page_</div>

        <img src="/profile.jpg" className="top-left-logo" alt="Logo" />
        <div className="bottom-left-text">NETO</div>

        <a
          href="#"
          className="top-right-about"
          onClick={(e) => { e.preventDefault(); setShowAbout(!showAbout); }}
          onMouseEnter={handleMagneticEnter}
          onMouseLeave={() => setSnapTarget(null)}
        >
          {showAbout ? 'CLOSE' : 'ABOUT'}
        </a>

        <div style={{ opacity: showAbout ? 0 : 1, transition: 'opacity 0.4s ease', pointerEvents: showAbout ? 'none' : 'auto' }}>
          <div className="scroll-indicator">↓</div>
          <InfoWidget cursorPos={cursorPos} />
        </div>

        <div className={`cards-wrapper ${showAbout ? 'hidden' : ''}`}>
          {cardsData.map((card, index) => (
            <FlipCard
              key={index}
              index={index}
              {...card}
              setSnapTarget={setSnapTarget}
            />
          ))}
        </div>

        <div className={`about-screen ${showAbout ? 'visible' : ''}`}>
          <h1 className="about-title">Music producer based in Chile</h1>
          <p
            className="about-email"
            onClick={handleCopy}
            onMouseEnter={handleMagneticEnter}
            onMouseLeave={() => setSnapTarget(null)}
          >
            {copied ? 'COPIED TO CLIPBOARD!' : 'neto.beats1212@gmail.com'}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
