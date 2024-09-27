import React from 'react';
import { ChatContextProvider } from './context/chatContext';
import SideBar from './components/SideBar';
import ChatView from './components/ChatView';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';
import Setting from './components/Setting';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data,setData] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
      setRefreshKey(prevKey => prevKey + 1); // Incrementing the key
  };

  useEffect(() => {
    const apiKey = window.localStorage.getItem('api-key');
    if (!apiKey) {
      setModalOpen(true);
    }
  }, []);
  useEffect(()=>{
    const getData = JSON.parse(localStorage.getItem("profile"))
    if(getData){
      setData(true)
      handleRefresh()
    }
  },[data])
  return (
    <ChatContextProvider><div>
      { data ? null:
      <Modal title="Setting" modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Modal>
      }
    </div>
      <div className="flex transition duration-500 ease-in-out">
        <SideBar />
        <ChatView />
      </div>
    </ChatContextProvider>
  );
};

export default App;
