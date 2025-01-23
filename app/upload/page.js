"use client";
import React, { useState } from "react";

export default function UploadPage() {
  const [treatmentLevel, setTreatmentLevel] = useState("low");
  const [lipFillerIntensity, setLipFillerIntensity] = useState("low");
  const [botoxIntensity, setBotoxIntensity] = useState("low");
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("treatment_level", treatmentLevel);
    formData.append("lip_filler_intensity", lipFillerIntensity);
    formData.append("botox_intensity", botoxIntensity);
    formData.append("image", selectedImage);

    try {
      const res = await fetch("http://127.0.0.1:8000/process_image/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Upload Image for Treatment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Treatment Level:</label>
          <select
            value={treatmentLevel}
            onChange={(e) => setTreatmentLevel(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Lip Filler Intensity:</label>
          <select
            value={lipFillerIntensity}
            onChange={(e) => setLipFillerIntensity(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Botox Intensity:</label>
          <select
            value={botoxIntensity}
            onChange={(e) => setBotoxIntensity(e.target.value)}
            className="border p-2 rounded text-dark"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Upload Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>

      {response && (
        <div className="mt-4">
          <h2 className="font-semibold text-light">Response:</h2>
          <pre className="bg-gray-200 p-4 rounded text-light">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
