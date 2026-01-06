import { useEffect, useRef, useState } from "react";

import "./styles/App.css";
import "./styles/reset.css";

import { makeRequest } from "./api/api";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { ChatMessage } from "./components/ChatMessage/ChatMessage";

function App() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [chatlog, setChatlog] = useState([
    { user: "gpt", message: "How can I help you?" },
  ]);

  const endOfChatRef = useRef(null);

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatlog, isLoading]);

  function handleNewChat() {
    setChatlog([{ user: "gpt", message: "How can I help you?" }]);
    setInput("");
  }

  async function sendMessage(text) {
    const prompt = text.trim();
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setChatlog((prev) => [...prev, { user: "me", message: prompt }]);
    setInput("");

    try {
      const res = await makeRequest({ prompt });
      const reply = String(res?.data ?? "").trim() || "(no response)";
      setChatlog((prev) => [...prev, { user: "gpt", message: reply }]);
    } catch (err) {
      setChatlog((prev) => [
        ...prev,
        { user: "gpt", message: "Error generating response. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e) {
    // Enter sends, Shift+Enter creates a new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="App">
      <SideMenu onNewChat={handleNewChat} />

      <section className="chatbox">
        <div className="chat-log">
          {chatlog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {isLoading && (
            <ChatMessage message={{ user: "gpt", message: "Typing..." }} />
          )}

          <div ref={endOfChatRef} />
        </div>

        <div className="chat-input-holder">
          <form onSubmit={handleSubmit} className="chat-input-form">
            <textarea
              rows={1}
              className="chat-input-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message (Enter to send, Shift+Enter for new line)"
              disabled={isLoading}
            />

            <button
              type="submit"
              className="send-button"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              title="Send"
            >
              ↑
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
