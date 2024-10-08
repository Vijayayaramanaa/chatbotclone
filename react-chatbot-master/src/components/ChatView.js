import React, { useState, useRef, useEffect, useContext } from 'react';
import ChatMessage from './ChatMessage';
import { ChatContext } from '../context/chatContext';
import { MdSend, MdLightbulbOutline } from 'react-icons/md';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Modal from './Modal';
import Setting from './Setting';
import PromptPerfect from './PromptPerfect';
import axios from "axios"

/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, addMessage] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPromptOpen, setModalPromptOpen] = useState(false);
  const [apicall,setApiCall] = useState({})

  /**
   * Scrolls the chat area to the bottom.
   * 
  */

  useEffect(()=>{
    const getData = JSON.parse(localStorage.getItem("profile"))
    if(getData&&formValue){
     const {name,dob,gender,location,time,address} = getData
     const dateofBirth = dob.slice(0,10)
     const newDob = dateofBirth.split('-')
     const day = newDob[2]
     const month = newDob[1]
     const year = newDob[0]
     const newTime = time.split(':')
     const h = newTime[0]
     const m = newTime[1]
     const s = newTime[2]
     
     const obj = {
      name : name,
      inputText : formValue ,
      sessionId : "user1",
      gender : gender,
      hour : h,
      minutes: m,
      seconds : s,
      longitude : location.longitude,
      lattitude : location.latitude,
      day : day,
      month : month,
      year : year,
      place : address,
     // zodiacSign : "Cancer"
    }
    setApiCall(obj)
    }
  },[formValue])
  {/*{
          "inputText": "What will be the impact of my business in future?",
          "sessionId": "user2",
          "zodiacSign": "Cancer",
          "dob": "25-06-1999"
      } */}
       
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
    const getcall = async()=>{
    
      const api = "https://swt6p22kkie7j6vculzufs3brm0vynks.lambda-url.us-east-1.on.aws/";
      try{
        const response = await axios.post(api,apicall)
      setModalPromptOpen(true);
      const msg = response.data.message
      updateMessage(msg ? msg : response.error,true)
      setLoading(true)
    }catch(e){
      console.log("Error",e.message)
      updateMessage(`Oops ! ${e.message}`,true)
      setLoading(false);
      setModalPromptOpen(true);
    
    }
    finally{
      setLoading(false)
    }
  }
    
    
  

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
  const updateMessage = (newValue, ai = false) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
    };

    addMessage(newMsg);
  };

  /**
   * Sends our prompt to our API and get response to our request from openai.
   *
   * @param {Event} e - The submit event of the form.
   */
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue) return;

    const cleanPrompt = formValue.trim();

    const newMsg = cleanPrompt;
    setFormValue('');
    setLoading(true)
    getcall()
    updateMessage(newMsg, false);

  // const response = 'Ask any thing.';
   // updateMessage(response, true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // 👇 Get input value
      sendMessage(e);
      inputRef.current.style.height = 'auto';
      updatePrompt()
    }
  };

  const handleChange = (event) => {
    setFormValue(event.target.value);
  };

  const updatePrompt = async () => {
   
  //  const secretKey = process.env.REACT_APP_API_KEY;

    try {
      setLoading(true);
     {/* const response = await fetch(api, {
        headers: {
          //'x-api-key': `token ${secretKey}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            prompt: formValue.trim(),
          //  targetModel: 'chatgpt',
          },
        }),
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const responseData = await response.json();
      console.log(responseData)
      setPrompt(responseData.result.promptOptimized);*/}
     
   //   setLoading(false);
      setModalPromptOpen(true);
    } catch (e) {
      console.error(e);
  //    setLoading(false);
    }
  };

  const handleUseClicked = () => {
    setFormValue(prompt);
    setModalPromptOpen(false);
  };

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleButtonClick = () => {
    setModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
  }, [formValue]);

  return (
    <div className="chatview">
    {/*  <main className=" w-screen">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={{ ...message }} />
        ))}

        <span ref={messagesEndRef}></span>
      </main>*/}
        <main className="flex-1 overflow-auto p-4 bg-gray-100 w-auto relative">
        <div style={{ position: "fixed", top: "10px", right: "10px" }}>
        <button className='bg-black text-white p-3 rounded-lg font-bold' type='button' onClick={handleButtonClick}>
           Clear Chat
        </button>
         </div>
              {loading ? <div className="flex flex-col gap-3 items-center justify-center h-screen">
               <div className="loading-spinner border-4 border-t-4 border-gray-200 rounded-full w-16 h-16 animate-spin border-t-blue-500" />
               <h1 className='text-blue-500 font-bold text-xl'>Loading...</h1>
              </div>:
              <div>
                {messages.map((message, index) => (
                  
                     <div key={index}>
                     <ChatMessage key={index} message={{ ...message }} />
                     </div>
                 ))}
              </div>}
        <span ref={messagesEndRef} />
      </main>
      <form className="form "  onSubmit={sendMessage}>
        <div className="flex items-stretch justify-between w-screen">
          <textarea
            ref={inputRef}
            className="chatview__textarea-message"
            rows={1}
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            disabled={loading}
          />
          <div className="flex items-center">
            <button type="submit" className="chatview__btn-send" disabled={!formValue}>
              <MdSend size={30} />
            </button>
         {/*   <button
              id="tooltip"
              type="button"
              className="chatview__btn-send"
              disabled={!formValue}
              onClick={updatePrompt}
            >
              {loading ? <div className="loading-spinner" /> : <MdLightbulbOutline size={30} />}
            </button>*/}
          </div>
        </div>
        <ReactTooltip
          anchorId="tooltip"
          place="top"
          variant="dark"
          content="Help me with this prompt!"
        />
      </form>
      <Modal title="Setting" modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Modal>
     {/* <Modal title="Prompt Perfect" modalOpen={modalPromptOpen} setModalOpen={setModalPromptOpen}>
        <PromptPerfect
          prompt={prompt}
          onChange={setPrompt}
          onCancelClicked={() => setModalPromptOpen(false)}
          onUseClicked={handleUseClicked}
        />
      </Modal>*/}
    </div>
  );
};

export default ChatView;
