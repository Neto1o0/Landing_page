import React from 'react';

const InfoWidget = ({ cursorPos }) => {
  // Rellena con ceros para mantener el ancho fijo (ej. 0045)
  const formatCoord = (num) => String(Math.max(0, num)).padStart(4, '0');

  return (
    <div className="bottom-right-widget">
      <div className="widget-line">
        <span className="widget-label">SYS_STATUS:</span> 
        <span className="widget-value active-pulse">ONLINE</span>
      </div>
      <div className="widget-line">
        <span className="widget-label">MOUSE_X:</span> 
        <span className="widget-value">{formatCoord(cursorPos.x)}</span>
      </div>
      <div className="widget-line">
        <span className="widget-label">MOUSE_Y:</span> 
        <span className="widget-value">{formatCoord(cursorPos.y)}</span>
      </div>
      <div className="widget-grid">
        <span>+ - +</span>
        <span>| * |</span>
        <span>+ - +</span>
      </div>
    </div>
  );
};

export default InfoWidget;
