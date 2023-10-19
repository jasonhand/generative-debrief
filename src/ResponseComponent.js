import React from "react";

function ResponseComponent({ responseMessage }) {
  return (
    <div>
      <div className="responseTitle">Generative Results</div>
      <div className="response">{responseMessage}</div>
      <p>Copy and paste this debrief into a markdown (.md) file.</p>
    </div>
  );
}

export default ResponseComponent;
