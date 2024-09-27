import React, { useState, useContext, useEffect,useCallback } from 'react';
import { MdChevronLeft, MdChevronRight, MdAdd, MdOutlineSettings } from 'react-icons/md';
import { CgProfile } from "react-icons/cg";
import { ChatContext } from '../context/chatContext';
import logo from '../assets/logo.png';
import Modal from './Modal';
import Setting from './Setting';
import { IoChatbubble } from "react-icons/io5";

/**
 * A sidebar component that displays a list of nav items and a toggle
 * for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 */
const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [, , clearMessages] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  function handleResize() {
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }
 const [profileData,setProfileData] = useState(null)
 const fetchProfileData = useCallback(() => {
  const getData = JSON.parse(localStorage.getItem("profile"));
  setProfileData(getData); // Call handleResize if needed
}, []); // No dependencies, it won't change


  const handleClear =()=>{
    localStorage.removeItem("profile")
  }
  const clearChat = () => clearMessages();
  
useEffect(() => {
  fetchProfileData();
  handleResize()
 // Fetch data on component mount
}, []);


  return (
    <section className={` ${open ? 'w-screen lg:w-80' : 'w-16'} sidebar`}>
      <div className="sidebar__app-bar">
        <div className="flex items-center">
          <div className={`sidebar__app-logo ${!open && 'scale-0 hidden'}`}>
            <span className="w-8 h-8">
            {/*  <img width="30" src={""} alt="Logo" />*/}
            <IoChatbubble className='text-black w-10 h-10 m-3'/>
            </span>
          </div>
          <h1 className={`sidebar__app-title ${!open && 'scale-0 hidden'}`}>CHAT</h1>
        </div>
        <div className={'sidebar__btn-close'} onClick={() => setOpen(!open)}>
          {open ? (
            <MdChevronLeft className="text-slate-700 sidebar__btn-icon" />
          ) : (
            <MdChevronRight className="text-slate-700 sidebar__btn-icon" />
          )}
        </div>
      </div>
    {/*  <div className="nav">
        <span className="border nav__item border-neutral-600" onClick={clearChat}>
          <div className="nav__icons">
            <MdAdd />
          </div>
          <h1 className={`${!open && 'hidden'}`}>New chat</h1>
        </span>
      </div>*/}

      <div className="nav__bottom">
        <div onClick={() => setModalOpen(true)} className="nav">
          <span htmlFor="setting-modal" className="nav__item">
            <div className="nav__icons">
              < CgProfile style={{width:"30px",height:"30px"}}/>
            </div>
            <h1 className={`${!open && 'hidden'}font-bold`}>Profile</h1>
          </span>
        </div>
      </div>
      <Modal title={profileData? "Profile" : "Setting"} modalOpen={modalOpen} setModalOpen={setModalOpen}>
        {profileData ? <div>
          <button type='button' onClick={()=>handleClear()} className='w-auto h-auto bg-blue-600 p-2 m-2 rounded-lg text-white'>Clear</button>
        <div className='flex flex-row gap-2 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
          <div>
             <h1 className='text-xl font-bold text-gray-800'>Name </h1>
             <h1 className='text-xl font-bold text-gray-800'>DOB </h1>
             <h1 className='text-xl font-bold text-gray-800'>zodiac Sign </h1>
          </div>
          <div className='flex flex-col font-bold text-xl '>
          <span className='font-normal text-green-500 ml-3'>: {profileData.name}</span>
          <span className='font-normal text-green-500 ml-3'>: {profileData.dob}</span>
          <span className='font-normal text-green-500 ml-3'>: {profileData.zodiacSign}</span>
          </div>
</div></div>
:
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      </Modal>
    </section>
  );
};

export default SideBar;
