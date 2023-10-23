import React from "react";
//RUM Integration //
import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.info('Button clicked', {name: 'buttonName', id: 123 });

datadogRum.init({
    applicationId: '866db0f2-7371-4d4a-8b77-340c5e498544',
    clientToken: 'pub5096d6768cfbb8aa98b73877207a7bec',
    site: 'datadoghq.com',
    service:'generative-debrief',
    env:'azure-production',
    // Specify a version number to identify the deployed version of your application in Datadog 
    version: '1.0.5', 
    sessionSampleRate:100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel:'mask-user-input'
});
    
datadogRum.startSessionReplayRecording();

// End RUM Integration

// Adding Logging
datadogLogs.init({
    clientToken: 'pub5096d6768cfbb8aa98b73877207a7bec',
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sessionSampleRate: 100
});

// End Logging

function ResponseComponent({ responseMessage }) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="responseTitle">Generative Results</div>
      <div className="response">{responseMessage}</div>
      <div className="instructions">Copy and paste this debrief into a markdown (.md) file</div>
      <button onClick={handleRefresh}>Start Over</button>
      <div className="instructions">Learn how to build and monitor an app like this - <a href="https://github.com/jasonhand/generative-debrief">View this demo on GitHub</a></div>
      <div className="instructions"><a href="https://datadoghq.com">🐶 Datadog Developer Advocacy 💜</a></div>
    </div>
  );
}

export default ResponseComponent;
