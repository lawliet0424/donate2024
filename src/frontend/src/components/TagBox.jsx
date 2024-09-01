import "./TagBox.css";
import React from "react";

const TagBox = ({ tagName, isTagSelected, onTagClick }) => {
  const buttonClass = `TagBox ${isTagSelected ? "TagBox--selected" : ""}`;

  return (
    <button onClick={onTagClick} className={buttonClass}>
      {tagName}
    </button>
  );
};

export default TagBox;
