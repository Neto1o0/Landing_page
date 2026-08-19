import React, { useMemo, useState, useEffect, useRef } from 'react';

const FlipCard = ({ index, label, frontImage, backImage, title, description, link, linkText, setSnapTarget }) => {
  const gridSize = 10; // 10x10 grid for 100 pixels
  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef(null);
  
  const blocks = useMemo(() => {
    const arr = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // Random delay between 0 and 0.3s
        const delay = Math.random() * 0.3;
        // Random slight translation for the explode effect
        const tx = (Math.random() - 0.5) * 60; // -30px to 30px
        const ty = (Math.random() - 0.5) * 60;
        
        arr.push({
          id: `${row}-${col}`,
          x: (col / (gridSize - 1)) * 100,
          y: (row / (gridSize - 1)) * 100,
          delay,
          tx,
          ty
        });
      }
    }
    return arr;
  }, []);

  const handleMouseEnter = (e) => {
    const labelEl = e.currentTarget.querySelector('h3');
    if (labelEl) {
      const rect = labelEl.getBoundingClientRect();
      setSnapTarget({
        width: rect.width + 40,
        height: rect.height + 30, // Padding
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  };

  return (
    <div 
      className={`card-container card-pos-${index} ${isRevealed ? 'revealed' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setSnapTarget(null)}
      ref={cardRef}
    >
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fragment-card" 
        style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'none' }}
      >
        <div className="fragment-back">
          <div className="card-content">
            <h3>{label}</h3>
          </div>
        </div>

        <div className="fragment-front" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}>
          {blocks.map((block) => (
            <div 
              key={block.id}
              className="fragment-block"
              style={{
                backgroundImage: `url(${frontImage})`,
                backgroundPosition: `${block.x}% ${block.y}%`,
                backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                transitionDelay: `${block.delay}s`,
                '--tx': `${block.tx}px`,
                '--ty': `${block.ty}px`
              }}
            />
          ))}
        </div>
      </a>
    </div>
  );
};

export default FlipCard;
