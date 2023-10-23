import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';
import React, { useState } from "react";
import "./App.css";
import ResponseComponent from "./ResponseComponent";


datadogLogs.logger.info('Something happened on App.js', {name: 'app_log', id: 123 });

datadogRum.init({
    applicationId: '866db0f2-7371-4d4a-8b77-340c5e498544',
    clientToken: 'pub5096d6768cfbb8aa98b73877207a7bec',
    site: 'datadoghq.com',
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

function App() {
  const [formData, setFormData] = useState({
    title: "",
    presenter: "",
    abstract: "",
    agenda: "",
    takeaways: "",
    tools: "Datadog", //Default value
    links: "datadoghq.com", //Default value
    model: "gpt-4", //Default value
    word_count: "500" //Default value
  });

  const [submissionStatus, setSubmissionStatus] = useState("unsubmitted");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      presentation: formData,
    };

  // Log the postData object to the console
  console.log("POST Data:", JSON.stringify(postData));

    try {
      setSubmissionStatus("loading"); // Set loading state

      const response = await fetch("https://prod-17.eastus.logic.azure.com:443/workflows/f34a56bb29b749db9f3760917efa0e39/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZKRPOrU-imIbjU3DPlXh4ojHInJOOn3JQiHH7Airdqo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const responseData = await response.json();
        //const responseBody = responseData.Body;
        setResponseMessage(responseData.response);
        setSubmissionStatus("success");
        console.log("Submission successful");

        // Clear form fields after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          setFormData({
            title: "",
            presenter: "",
            abstract: "",
            agenda: "",
            takeaways: "",
            tools: "Datadog", //Default value
            links: "datadoghq.com", //Default value
            model: "gpt-4", //Default value
            word_count: "500" //Default value
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
    }
  };

  return (
    <div className="App">
      {submissionStatus === "unsubmitted" || submissionStatus === "error" ? (
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <label>Title:</label>
          <input type="text" name="title" placeholder="Type the title of your presentation" onChange={handleChange} />

          <label>Presenter:</label>
          <input type="text" name="presenter" placeholder="Type the presenter(s) name(s)" onChange={handleChange} />

          <label>Abstract:</label>
          <input type="text" name="abstract" placeholder="Type the abstract or a brief summary in your words" onChange={handleChange} />

          <label>Agenda:</label>
          <input type="text" name="agenda" placeholder="Type your presentation agenda separated by commas" onChange={handleChange} />

          <label>Takeaways:</label>
          <input type="text" name="takeaways" placeholder="Type your takeaways" onChange={handleChange} />

          <label>Tools:</label>
          <input type="text" name="tools" placeholder="Type your tools mentioned" onChange={handleChange} />

          <label>Links:</label>
          <input type="text" name="links" placeholder="Type your links mentioned" onChange={handleChange} />
          <label htmlFor="model">Model:</label>
            <select id="model" name="model" defaultValue="gpt-4" onChange={handleChange}>
              <option value="gpt-3.5-turbo">ChatGPT3.5-turbo</option>
              <option value="gpt-4">ChatGPT4</option>
            </select>
            <label htmlFor="word_count">Word Count:</label>
            <select id="word_count" name="word_count" defaultValue="500" onChange={handleChange}>
              <option value="250">250</option>
              <option value="500">500</option>
              <option value="750">750</option>
            </select>
          <button type="submit">Submit</button>


        </form>
      ) : submissionStatus === "success" ? (
        <ResponseComponent responseMessage={responseMessage} />
      ) : (
        <div className="waiting-message"><br></br>Generating Debriefing Document ... Please wait.</div>
      )}
    </div>
  );
}

export default App;