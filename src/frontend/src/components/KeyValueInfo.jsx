import React from "react";
import "./KeyValueInfo.css";

const KeyValueInfo = ({ keyInfo, valueInfo }) => {
  return (
    <div className="KeyValueInfo">
      <div className="key">{keyInfo}</div>
      <div className="value">{valueInfo}</div>
    </div>
  );
};

export default KeyValueInfo;
