import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//RUM Integration //
import { datadogRum } from '@datadog/browser-rum';
//

datadogRum.init({
    applicationId: '866db0f2-7371-4d4a-8b77-340c5e498544',
    clientToken: 'pub5096d6768cfbb8aa98b73877207a7bec',
    site: 'datadoghq.com',
    service:'generative-debrief',
    env:'azure-production',
    // Specify a version number to identify the deployed version of your application in Datadog 
    version: '1.0.4', 
    sessionSampleRate:100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackFrustrations: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel:'mask-user-input'
});
    
datadogRum.startSessionReplayRecording();

// End RUM Integration

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
