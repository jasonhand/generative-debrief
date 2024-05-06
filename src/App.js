import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';
import React, { useState, useEffect } from "react";
import "./App.css";
import ResponseComponent from "./ResponseComponent";

datadogLogs.init({
  clientToken: process.env.REACT_APP_DD_CLIENT_TOKEN,
  site: process.env.REACT_APP_DD_SITE,
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
})

datadogRum.init({
    applicationId: process.env.REACT_APP_DD_APPLICATION_ID,
    clientToken: process.env.REACT_APP_DD_CLIENT_TOKEN,
    site: process.env.REACT_APP_DD_SITE,
    service:'generative-debrief',
    env:'azure-production',
    // Specify a version number to identify the deployed version of your application in Datadog 
    version: '2.0.0', 
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

function App() {
  const [formData, setFormData] = useState({
    title: "",
    presenter: "",
    abstract: "",
    model: "gpt-3.5-turbo", //Default value
    word_count: "150" //Default value
  });
  
  const [submissionStatus, setSubmissionStatus] = useState("unsubmitted");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseTitle, setResponseTitle] = useState("");
  // Timer
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerActive) {
      interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTimerActive]);
  
  // End Timer

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTimerActive(true);  // Start the timer
    const postData = {
      presentation: formData,
    };

  // Log the postData object to the console
  //console.log("POST Data:", JSON.stringify(postData));

    try {
      setSubmissionStatus("loading"); // Set loading state

      const response = await fetch(process.env.REACT_APP_AZURE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setResponseMessage(responseData.response);
        setResponseTitle(responseData.title);  // New line to set the title
        setSubmissionStatus("success");
        console.log("Submission successful");
        setIsTimerActive(false);  // Stop the timer when the call is done, success or failure

        // Clear form fields after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          setFormData({
            title: "",
            presenter: "",
            abstract: "",
            agenda: "",
            takeaways: "",
            tools: "", 
            links: "",
            model: "", 
            word_count: "" 
          });
        }, 2000);
      } else {
        setSubmissionStatus("error");
        setResponseMessage("Error submitting data");
        console.log("Error submitting data");
      }
    } catch (error) {
      setSubmissionStatus("error");
      setResponseMessage("Error: " + error.message);
      console.log("Error:", error);
      setIsTimerActive(false);  // Stop the timer in case of error
    }
  };

  return (
    <div className="App">
      {/* Always display the timer here */}
      <div className="timer">{(elapsedTime / 100).toFixed(3)}s</div>
      {submissionStatus === "unsubmitted" || submissionStatus === "error" ? (
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <label>Title:</label>
          <input type="text" name="title" placeholder="Type the title of your presentation" onChange={handleChange} />

          <label>Presenter:</label>
          <input type="text" name="presenter" placeholder="Type the presenter(s) name(s)" onChange={handleChange} />

          <label>Transcript:</label>
          <input type="text" name="abstract" placeholder="Type the Notes or a brief summary in your words" onChange={handleChange} />

          <label htmlFor="model">Model:</label>
            <select id="model" name="model" defaultValue="gpt-4" onChange={handleChange}>
              <option value="gpt-3.5-turbo">ChatGPT3.5-turbo</option>
              <option value="gpt-4">ChatGPT4</option>
              <option value="gpt-4-turbo-preview">ChatGPT4 Turbo Preview</option>

            </select>
            <label htmlFor="word_count">Word Count:</label>
            <select id="word_count" name="word_count" defaultValue="150" onChange={handleChange}>
              <option value="100">150</option>
              <option value="200">250</option>
              <option value="300">350</option>
            </select>
          <button type="submit">Submit</button>


        </form>
      ) : submissionStatus === "success" ? (
        <ResponseComponent responseMessage={responseMessage} responseTitle={responseTitle} />
      ) : (
        <div className="waiting-message"><br></br>Generating Debriefing Document ... Please wait.</div>
      )}
      {/* Display the error message */}
      {submissionStatus === "error" && (
        <>
        <div className="overlay"></div>
        <div className="error-message">It's not your fault!<br></br><br></br>
          {responseMessage}
          <button onClick={() => window.location.reload()} style={{marginTop: '20px'}}>Try Again</button>
        </div>
        </>
      )}
    </div>
  );
  
}

export default App;