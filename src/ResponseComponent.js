import React from "react";
//RUM Integration //
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '866db0f2-7371-4d4a-8b77-340c5e498544',
    clientToken: 'pub5096d6768cfbb8aa98b73877207a7bec',
    site: 'datadoghq.com',
    service:'generative-debrief',
    env:'azure-production',
    // Specify a version number to identify the deployed version of your application in Datadog 
    version: '1.0.0', 
    sessionSampleRate:100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel:'mask-user-input'
});
    
datadogRum.startSessionReplayRecording();

// End RUM Integration

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
