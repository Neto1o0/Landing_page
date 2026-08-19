import React, { useState, useEffect } from 'react';

const PixelVinyl = () => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    // 8 frames for a choppy retro animation (360/8 = 45 degrees)
    const interval = setInterval(() => {
      setRotation(prev => (prev + 45) % 360);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const size = 26; // slightly higher res for the grooves to show well
  const pixels = [];
  const center = size / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x + 0.5 - center;
      const dy = y + 0.5 - center;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      let color = 'transparent';
      
      if (dist <= 1.5) {
        color = 'transparent'; // hole
      } else if (dist <= 4.5) {
        // Label
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        const rotatedAngle = (angle - rotation + 360) % 360;
        color = rotatedAngle < 180 ? '#d3d3d3' : '#000000'; 
      } else if (dist <= 12.5) {
        // Vinyl body
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        const rotatedAngle = (angle - rotation + 360) % 360;
        
        // Reflections / highlights
        if ((rotatedAngle > 30 && rotatedAngle < 60) || (rotatedAngle > 210 && rotatedAngle < 240)) {
          color = '#666666';
        } else if ((dist > 6 && dist < 7) || (dist > 9 && dist < 10.5)) {
          color = '#222222'; // grooves
        } else {
          color = '#0a0a0a'; // base black
        }
      }
      
      pixels.push(
        <div 
          key={`${x}-${y}`} 
          style={{ backgroundColor: color }} 
        />
      );
    }
  }

  return (
    <div className="pixel-vinyl-container">
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
          width: '100%',
          height: '100%'
        }}
      >
        {pixels}
      </div>
    </div>
  );
};

export default PixelVinyl;
