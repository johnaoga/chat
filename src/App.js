

import './App.css';
import { sendMsgToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown'


const johnlogo = "https://johnaoga.github.io/images/logo.svg";
const gptlogo = "https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-on-transparent-background-png.png";
//const gptlogo = "https://openaiapi-site.azureedge.net/public-assets/d/d76c874662/mask-icon.svg";
//const gptlogo = "https://openaiapi-site.azureedge.net/public-assets/d/d76c874662/favicon.svg";

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [msgs, setMsg] = useState([
    {
      text: "Hi, I'm ChatGPT Clone, using the state-of-the-art language model developed by OpenAI",
      isBot: true,
    }

  ]);


  const handleKeydown = async (e) => {
    if (e.keyCode === 13) {
      await handleSend();
    }
  };

  useEffect(
    () => {
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
    },
    [msgs]
  );

  const handleSend = async () => {
    const text = input;
    setInput('');

    setMsg([
      ...msgs,
      {
        text,
        isBot: false
      }
    ]);

    const res = await sendMsgToOpenAI(input);
    //console.log(res);
    setMsg([
      ...msgs,
      {
        text,
        isBot: false
      },
      {
        text: res,
        isBot: true
      }
    ]);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperside">
          <div className="uppersideTop">
            <img src={gptlogo} alt="" className="logo" />
            <span className="brand">Chat</span>
          </div>
          <button className="midBtn">
            <img src="" alt="" className="addBtn" />
            New Chat
          </button>
          <div className="uppersideBottom">
            <button className="query"><img src="" alt="" className="" />What's programming?</button>
            <button className="query"><img src="" alt="" className="" />What's data mining?</button>
          </div>
        </div>
        <div className="lowerside">
          <div className="listitems"><img src="" alt="" className="listitemsImg" />Home</div>
          <div className="listitems"><img src="" alt="" className="listitemsImg" />Saved</div>
          <div className="listitems"><img src="" alt="" className="listitemsImg" />Up</div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {msgs.map((msg, i) =>
            <div key={i} className={msg.isBot ? "chat bot" : "chat"}>
              <img src={msg.isBot ? gptlogo : johnlogo} alt="" className="chatimg" />
              <p ></p>
              <ReactMarkdown className='txt' >
                {msg.text}
              </ReactMarkdown>

            </div>
          )}
          <div ref={msgEnd} />
        </div>
        <div className="chatfooter">
          <div className="inp">
            <input
              type="text"
              placeholder='send message'
              value={input}
              onChange={(e) => { setInput(e.target.value) }}
              onKeyDown={(e) => handleKeydown(e)}
            />
            <button className="send" onClick={handleSend}>
              <img src="" alt="Send" />
            </button>
          </div>
          <p>Copyright, all rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default App;
