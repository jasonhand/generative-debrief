import React, { useState } from "react";
import "./App.css";
import ResponseComponent from "./ResponseComponent";

function App() {
  const [formData, setFormData] = useState({
    title: "",
    presenter: "",
    abstract: "",
    agenda: "",
    takeaways: "",
    tools: "",
    links: "",
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
            tools: "",
            links: "",
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
          <label>Title:
          <input type="text" name="title" onChange={handleChange} />
          </label>

          <label>Presenter:
          <input type="text" name="presenter" onChange={handleChange} />
          </label>

          <label>Abstract:
          <input type="text" name="abstract" onChange={handleChange} />
          </label>

          <label>Agenda:
          <input type="text" name="agenda" onChange={handleChange} />
          </label>

          <label>Takeaways:
          <input type="text" name="takeaways" onChange={handleChange} />
          </label>

          <label>Tools:
          <input type="text" name="tools" onChange={handleChange} />
          </label>

          <label>Links:
          <input type="text" name="links" onChange={handleChange} />
          </label>

          <button type="submit">Submit</button>
        </form>
      ) : submissionStatus === "success" ? (
        <ResponseComponent responseMessage={responseMessage} />
      ) : (
        <div className="waiting-message">Generating Debriefing Document ... Please wait.</div>
      )}
    </div>
  );
}

export default App;
