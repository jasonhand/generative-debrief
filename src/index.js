import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

datadogLogs.init({
  clientToken: process.env.REACT_APP_DD_CLIENT_TOKEN,
  site: process.env.REACT_APP_DD_SITE,
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
})

datadogLogs.logger.info('Something happened on Index.js', {name: 'index_log', id: 124 });

datadogRum.init({
  applicationId: process.env.REACT_APP_DD_APPLICATION_ID,
  clientToken: process.env.REACT_APP_DD_CLIENT_TOKEN,
  site: process.env.REACT_APP_DD_SITE,
    service:'generative-debrief',
    env:'azure-production',
    // Specify a version number to identify the deployed version of your application in Datadog 
    version: '1.0.6', 
    forwardErrorsToLogs: true,
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
