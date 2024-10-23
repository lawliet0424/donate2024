import React, { useState } from "react";
import "./BubbleTooltip.css";

const BubbleTooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div
      className="BubbleTooltip"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && <div className="BubbleTooltip__bubble">{content}</div>}
    </div>
  );
};

export default BubbleTooltip;
