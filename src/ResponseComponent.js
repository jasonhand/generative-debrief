import React from "react";

function ResponseComponent({ responseMessage, responseTitle }) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="responseSummaryTitle">{responseTitle}</div>
      <div className="response">{responseMessage}</div>
      <div className="instructions">Copy and paste this debrief into a markdown (.md) file</div>
      <button onClick={handleRefresh}>Start Over</button>
      <div className="instructions">Learn how to build and monitor an app like this - <a href="https://github.com/jasonhand/generative-debrief">View this demo on GitHub</a></div>
      <div className="instructions"><a href="https://datadoghq.com">🐶 Datadog Developer Advocacy 💜</a></div>
    </div>
  );
}

export default ResponseComponent;
