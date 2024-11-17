import React, { useState, useEffect, useRef, useCallback } from "react";
import Markdown from "./BUILTIN_COMPONENTs/markdown/markdown.js";
import Input from "./BUILTIN_COMPONENTs/input/input.js";
import send_icon from "./send.png";

const R = 30;
const G = 30;
const B = 30;

const default_forground_color_offset = 12;
const default_font_color_offset = 128;
const default_border_radius = 7;

const MessageSection = ({ role, message, is_last_index }) => {
  const [style, setStyle] = useState({
    backgroundColor: `rgba(${R}, ${G}, ${B}, 0)`,
  });

  useEffect(() => {
    if (role === "assistant") {
      setStyle({
        backgroundColor: `rgba(${R}, ${G}, ${B},0)`,
      });
    } else if (role === "terminal") {
      setStyle({
        backgroundColor: `#b45200`,
      });
    } else {
      setStyle({
        plainText: true,
      });
    }
  }, [role]);

  return (
    <div
      style={{
        transition: "margin-left 0.32s cubic-bezier(0.32, 0, 0.32, 1)",
        transition: "width 0.32s cubic-bezier(0.32, 0, 0.32, 1)",
        position: "relative",
        maxWidth: role === "user" ? 328 : "100%",

        left: role === "user" ? "calc(100% - 328px)" : 0,
        marginBottom: is_last_index ? 64 : 16,
        borderRadius: default_border_radius,
        boxShadow:
          role === "user" ? `0px 4px 16px rgba(0, 0, 0, 0.16)` : "none",
      }}
    >
      <Markdown style={style}>{message}</Markdown>
    </div>
  );
};
const ScrollingSection = ({ messages }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      .scrolling-space::-webkit-scrollbar {
        width: 12px; /* Custom width for the vertical scrollbar */
      }

      .scrolling-space::-webkit-scrollbar-track {
        background-color: rgba(${R}, ${G}, ${B}, 1); /* Scrollbar track color */
      }

      .scrolling-space::-webkit-scrollbar-thumb {
        background-color: rgba(${R + default_forground_color_offset}, ${G + default_forground_color_offset
      }, ${B + default_forground_color_offset}, 1);
        border-radius: 6px;
        border: 3px solid rgba(${R}, ${G}, ${B}, 1);
      }
      .scrolling-space::-webkit-scrollbar-thumb:hover {
        background-color: rgba(${R + default_forground_color_offset + 32}, ${G + default_forground_color_offset + 32
      }, ${B + default_forground_color_offset + 32}, 1);
      }
      .scrolling-space::-webkit-scrollbar:horizontal {
        display: none;
      }
    `;
    document.head.appendChild(styleElement);

    // Cleanup style when the component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="scrolling-space"
      style={{
        position: "absolute",

        top: 0,
        left: 0,
        bottom: 4,

        width: "100%",

        padding: 32,
        overflowX: "hidden",
        overflowY: "overlay",
        boxSizing: "border-box",
        scrollBehavior: "smooth",
      }}
    >
      {messages
        ? messages.map((msg, index) => (
          <MessageSection
            key={index}
            role={msg.role}
            message={msg.message}
            is_last_index={index === messages.length - 1 ? true : false}
          />
        ))
        : null}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 64,
        }}
      ></div>
    </div>
  );
};
const InputSection = ({ inputValue, setInputValue, on_input_submit }) => {
  const [style, setStyle] = useState({
    colorOffset: 0,
  });
  const [onHover, setOnHover] = useState(false);
  const [onClicked, setOnClicked] = useState(false);

  useEffect(() => {
    if (onClicked) {
      setStyle({
        colorOffset: 64,
      });
    } else if (onHover) {
      setStyle({
        colorOffset: 16,
      });
    } else {
      setStyle({
        colorOffset: 0,
      });
    }
  }, [onHover, onClicked]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 16,
          height: 64,

          backgroundColor: `rgba(${R}, ${G}, ${B}, 1)`,
        }}
      ></div>
      <Input
        value={inputValue}
        setValue={setInputValue}
        onSubmit={on_input_submit}
        style={{
          transition: "height 0.08s cubic-bezier(0.32, 0, 0.32, 1)",
          position: "fixed",

          bottom: 24,
          left: 16,
          right: 16,

          height: 24,

          borderRadius: default_border_radius,
          backgroundColor: `rgba(${R + default_forground_color_offset}, ${G + default_forground_color_offset
            }, ${B + default_forground_color_offset}, 1)`,
          boxShadow: `0px 4px 32px rgba(0, 0, 0, 0.64)`,
        }}
      />
      <img
        src={send_icon}
        alt="send"
        style={{
          transition: "all 0.08s cubic-bezier(0.32, 0, 0.32, 1)",

          position: "fixed",
          transform: "translate(-50%, -50%)",

          bottom: 16,
          right: 8,
          width: 16,
          height: 16,
          cursor: "pointer",

          opacity: onClicked ? 1 : 0.64,

          padding: 8,
          borderRadius: default_border_radius - 4,
          backgroundColor: `rgba(${R + default_forground_color_offset + style.colorOffset
            }, ${G + default_forground_color_offset + style.colorOffset}, ${B + default_forground_color_offset + style.colorOffset
            }, 1)`,
        }}
        onMouseEnter={() => {
          setOnHover(true);
        }}
        onMouseLeave={() => {
          setOnHover(false);
          setOnClicked(false);
        }}
        onMouseDown={() => {
          setOnClicked(true);
        }}
        onMouseUp={() => {
          setOnClicked(false);
        }}
        onClick={on_input_submit}
      />
    </>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/chat`);
    socketRef.current = ws;

    socketRef.current.onmessage = (event) => {
      const { type, response } = JSON.parse(event.data);
      if (type === "chat-response") {
        const formattedResponse = `\`\`\`bash\n${response}\n\`\`\``;
        setMessages((prev) => [...prev, { role: "terminal", message: formattedResponse }]);
      }
    };

    return () => ws.close();
  }, []);

  const on_input_submit = useCallback(() => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [...prev, { role: "user", message: inputValue }]);
    socketRef.current.send(JSON.stringify({ type: "chat-input", prompt: inputValue }));
    setInputValue("");
  }, [inputValue]);

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",

        width: "100%",
        height: "100%",

        backgroundColor: `rgb(${R}, ${G}, ${B})`,
      }}
    >
      <ScrollingSection messages={messages} />
      <InputSection
        inputValue={inputValue}
        setInputValue={setInputValue}
        on_input_submit={on_input_submit}
      />
    </div>
  );
};

export default Chat;
