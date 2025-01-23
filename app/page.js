"use client";
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const WebSocketTest = () => {
  const [socket, setSocket] = useState(null);
  const [receivedFrame, setReceivedFrame] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const webcamRef = useRef(null);

  useEffect(() => {
    const newSocket = new WebSocket("wss://facedetect.shop/ws");
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setReceivedMessage(message);
      setReceivedFrame(message.frame);
      console.log("Received message:", message);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const captureAndSendImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const frameData = {
      frame: imageSrc.split(",")[1], // Remove metadata
      treatment_level: "basic",
      treatments: ["forehead_botox"]
    };
    socket.send(JSON.stringify(frameData));
  };

  return (
    <div>
      <h1>WebSocket Test</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <button onClick={captureAndSendImage}>Capture & Send Image</button>
      {receivedFrame && <img src={receivedFrame} alt="Received Frame" />}
    </div>
  );
};

export default WebSocketTest;
