import "./TagBox.css";
import React from "react";

const TagBox = ({ tagName, isSelected, onTagClick }) => {
  return (
    <div
      className={`TagBox ${isSelected ? "selected" : ""}`}
      onClick={onTagClick}
    >
      {tagName}
    </div>
  );
};

export default TagBox;
