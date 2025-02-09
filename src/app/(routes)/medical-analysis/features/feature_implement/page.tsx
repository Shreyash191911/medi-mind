"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SymptomsChecker() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState<string[]>([""]);
  const [diseaseDescription, setDiseaseDescription] = useState<string>(""); // State for disease description 
  const [showProceed, setShowProceed] = useState(true); 
  const [showQuestion, setShowQuestion] = useState(false);
  const [showUploadOption, setShowUploadOption] = useState(false);
  const [uploadCount, setUploadCount] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSymptomChange = (index: number, value: string) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index] = value;
    setSymptoms(updatedSymptoms);
  };

    // Add a function to check if symptoms are valid
  const hasValidSymptoms = () => {
    // Check if there's at least one non-empty symptom
    return symptoms.some(symptom => symptom.trim() !== '');
  }; 

  const handleAddSymptom = () => {
    setSymptoms([...symptoms, ""]);
  };

  const handleDiseaseDescriptionChange = (value: string) => {
    setDiseaseDescription(value);
  };

  const handleProceedClick = () => {
    if (symptoms.every((symptom) => symptom.trim() === "") && diseaseDescription.trim() === "") {
      setError("Please enter at least one symptom or a disease description before proceeding.");
      return;
    }
    setError(null); // Clear any existing error
    setShowProceed(false);
    setShowQuestion(true);
  };

  const handleDirectUploadClick = () => {
    setShowProceed(false);
    setShowUploadOption(true);
  };

  const handleYesClick = () => {
    setShowQuestion(false);
    setShowUploadOption(true);
  };

  const handleAddUpload = () => {
    setUploadCount(uploadCount + 1);
  };

  const handleFileChange = (index: number, file: File | null) => {
    const updatedFiles = [...files];
    if (file) {
      updatedFiles[index] = file;
    } else {
      updatedFiles.splice(index, 1);
    }
    setFiles(updatedFiles);
  };

  // Add a function to check if files are uploaded
  const hasUploadedFiles = () => {
    return files.length > 0;
  }; 

  // Shared function for making the prediction request
  const sendPredictionRequest = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("symptoms", symptoms.join(", "));

    files.forEach((file, index) => {
      formData.append(`report-${index + 1}`, file);
    });

    try {
      const { data } = await axios.post("/api/get-disease-prediction", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push(
        `/medical-analysis/features/feature_implement/results?response=${encodeURIComponent(
          data.response
        )}`
      );
    } catch (err) {
      console.error(err);
      setError("Failed to get a response from the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Check button click
  const handleCheck = async () => {
    // Check if both symptoms and files are empty
  if (!hasValidSymptoms() && !hasUploadedFiles()) {
    setError("Either enter the symptoms or upload reports.");
    return;
  }
  setError(null); // Clear any existing error
  await sendPredictionRequest(); 
  };

  // Handle No button click
  const handleNoClick = async () => {
    setShowQuestion(false);
    await sendPredictionRequest();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* Symptom Input Fields */}
      {showProceed && (
        <div className="flex flex-col space-y-4 w-full max-w-md">
          {symptoms.map((symptom, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Enter symptom ${index + 1}`}
              value={symptom}
              onChange={(e) => handleSymptomChange(index, e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
          <button
            className="w-full bg-gray-800 hover:bg-gray-700 py-2 rounded-md text-white text-lg font-medium transition-all duration-200"
            onClick={handleAddSymptom}
          >
            Add Another Symptom
          </button>

          {/* Disease Description Input Field */}
          <textarea
            placeholder="Describe the nature of the disease in detail"
            value={diseaseDescription}
            onChange={(e) => handleDiseaseDescriptionChange(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3} // Adjust height of the textarea
          ></textarea>

          <button
          className={`w-full py-2 rounded-md text-white text-lg font-medium transition-all duration-200 ${
            hasValidSymptoms() 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-600/50 cursor-not-allowed'
          }`}
          onClick={handleProceedClick}
          disabled={!hasValidSymptoms()}
          >
          Proceed
          </button>

          {/* Direct Upload Link */}
          <p
            className="text-sm text-blue-500 hover:underline cursor-pointer text-center"
            onClick={handleDirectUploadClick}
          >
            Directly upload medical reports
          </p>
        </div>
      )}

      {/* Question: Do you have any medical reports? */}
      {showQuestion && (
        <div className="text-center mt-6">
          <p className="text-lg font-medium mb-6">Do you have any medical test reports?</p>
          <div className="flex justify-center gap-4">
            <button
              className="w-40 bg-blue-600 hover:bg-blue-700 py-3 rounded-md text-white text-lg font-medium transition-all duration-200"
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button
              className="w-40 bg-gray-800 hover:bg-gray-700 py-3 rounded-md text-white text-lg font-medium transition-all duration-200"
              onClick={handleNoClick}
            >
              No
            </button>
          </div>
        </div>
      )}

      {showUploadOption && (
        <div className="mt-6 flex flex-col items-center space-y-4 w-full max-w-md">
          {Array.from({ length: uploadCount }).map((_, index) => (
            <div key={index} className="w-full">
              <label
                htmlFor={`report-upload-${index}`}
                className="block text-sm font-medium mb-2"
              >
                Upload your report {index + 1}:
              </label>
              <input
                id={`report-upload-${index}`}
                type="file"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  handleFileChange(index, e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
          ))}
          <button
            className="w-full bg-gray-800 hover:bg-gray-700 py-2 rounded-md text-white text-lg font-medium transition-all duration-200"
            onClick={handleAddUpload}
          >
            Add Another Report
          </button>
          
          {/* Check with Reports button - disabled if no files uploaded */}
          <button
            className={`w-full py-2 rounded-md text-white text-lg font-medium transition-all duration-200 ${
              hasUploadedFiles()
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-600/50 cursor-not-allowed'
            }`}
            onClick={handleCheck}
            disabled={!hasUploadedFiles()}
          >
            Check with Reports
          </button>

    {/* Check without Reports button - only enabled if no files uploaded */}
    <button
      className={`w-full py-2 rounded-md text-white text-lg font-medium transition-all duration-200 ${
        !hasUploadedFiles()
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-gray-700/50 cursor-not-allowed'
      }`}
      onClick={handleCheck}  // We can reuse the handleNoClick function since it already does what we want
      disabled={hasUploadedFiles()} 
    >
      Check without Reports
    </button>
  </div>
)}

      {/* Loading State */}
      {loading && <p className="mt-6 text-blue-500">Processing... Please wait.</p>}

      {/* Error Handling */}
      {error && <p className="mt-6 text-red-500">{error}</p>}
    </div>
  );
}