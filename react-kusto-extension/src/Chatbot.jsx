/* eslint-disable no-undef */
import React, { useState ,useEffect } from "react";
import axios from "axios";
import { parseData } from './parseData.js'
import apiKey from './apikey.json';

import "./Chatbot.css";

function formatMessageAsHTML(messageText) {
  // Replace newlines with <br> tags to format line breaks
  const formattedText = messageText.replace(/\n/g, "<br>");
  return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
}

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const botDescription = "Welcome to Kusto Open-AI Chatbot! \n Steps to use the chatbot \n \n 1. Attach debugger from the extension pop-up. \n 2.Run the desired kusto query in azure data explorer. \n 3. Ask questions about the kusto queried result table and get data analysis.\n \n Example questions : \n \"Explain the column names\"\n \"Provide prediction for given data \", \n \"Summarize the above table in 50 words\"";

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;
    const newMessage = {
      text: userInput,
      isUser: true,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]); // Append user message
    setUserInput("");
    setIsLoading(true);
    const botMessage = {
      text: '...',
      isUser: false,
      isLoading: true,
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]); // Append bot message

    const userData = "result";
    const result = await chrome.storage.local.get(["userData"]);
    console.log("Value currently is found", result);
    console.log("Parsed data in chatbox.jsx", parseData(result.userData));

    const inputBody = {
      messages: [
        {
          role: "user",
          content: parseData(result.userData),
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      temperature: 0.7,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 1500,
      stop: null,
    };

    axios
      .post(
        apiKey.endpoint,
        inputBody,
        {
          headers: {
            "Content-Type": "application/json", // Set the content type header
            "api-key": apiKey.key,
          },
        }
      )
      .then((response) => {
        console.log(response);
        const botResponse = {
          text: `${response.data.choices[0].message.content}`,
          isUser: false,
          isLoading: false,
        };
        
        setMessages((prevMessages) => prevMessages.slice(0, -1));
        setMessages((prevMessages) => [...prevMessages, botResponse]); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("API call error:", error);
        setIsLoading(false);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsChatOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    // When the component mounts, add the initial bot message with the description
    const initialBotMessage = {
      text: botDescription,
      isUser: false,
    };
    setMessages([initialBotMessage]);
  }, []);

  return (
    <div className={`chatbot ${isChatOpen ? "open" : "closed"}`}>
      {!isChatOpen && (
        <button className="toggle-button" onClick={toggleChatbot}>
          <img
            src={chrome.runtime.getURL("img/kusto-openai.png")}
            alt="Close"
            style={{ width: "30px", height: "30px", margin: "auto" }}
          />
        </button>
      )}

      {isChatOpen && (
        <>
          <div className="chatbot-header">
            <button className="toggle-button-open" onClick={toggleChatbot}>
              X
            </button>
            <h4 className="extension-header">Kusto Open-AI Extension</h4>
          </div>

          {/* <div className="chatbot-description">
            <p>{botDescription}</p>
          </div> */}

          {/* Display example questions as buttons
          <div className="example-questions">
            {exampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  // Handle example question click (you can call a function here)
                  setUserInput(question);
                  handleSendMessage();
                }}
              >
                {question}
              </button>
            ))}
          </div> */}

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <span
                key={index}
                className={`message ${message.isUser ? "user" : "bot"} 
                `}
                style={{ display: "flex", alignItems: "center", }}
              >
                <img
                  src={chrome.runtime.getURL(
                    `${
                      message.isUser
                        ? "img/user-avatar.png"
                        : "img/kusto-openai.png"
                    }`
                  )}
                  alt={`message ${message.isUser ? "user" : "bot"}`}
                  style={{width: "30px", height: "30px", marginRight: "8px", borderRadius: "50%",}}
                ></img>

                <div  className={`${ message.text === "..." ? "bot-loading" : ""}`}>
                    {formatMessageAsHTML(message.text)}
                </div>
            
              </span>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="inputMessage"
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Chatbot;
