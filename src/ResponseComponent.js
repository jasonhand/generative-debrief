import React from "react";

function ResponseComponent({ responseMessage }) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="responseTitle">Generative Results</div>
      <div className="response">{responseMessage}</div>
      <p>Copy and paste this debrief into a markdown (.md) file.</p>
      <button onClick={handleRefresh}>Start Over</button>
    </div>
  );
}

export default ResponseComponent;
