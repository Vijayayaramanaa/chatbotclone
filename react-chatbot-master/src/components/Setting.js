import React, { useEffect, useState } from 'react';
import Modal from './Modal';


const Setting = ({ modalOpen, setModalOpen }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [zodiacSign,setZodiacSign] = useState("")
  const id = Date.now() + Math.floor(Math.random() * 1000000);

  const saveKey =  (e) => {
    e.preventDefault();
    setErrorMsg('');
    const obj = {
      name : name,
      dob : dob,
      zodiacSign : zodiacSign,
      userid: id,
    }
   localStorage.setItem("profile",JSON.stringify(obj))
  };
   
 {/* useEffect(() => {
    if (modalOpen) {
      setName(name);
      setDob(dob);
      setZodiacSign(zodiacSign)
      
    }
  }, [name, dob,zodiacSign, modalOpen]);*/}
  useEffect(()=>{

  },[name,dob,zodiacSign])



  return (
 
 
    <form onSubmit={saveKey} className="flex flex-col items-center justify-center gap-2">
      <input
        required = {true}
        value={name}
        placeholder="Enter your Name"
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="w-full max-w-xs input input-bordered bg-white text-slate-700"
        />

      <input
        required = {true}
        value={dob}
        placeholder="DD-MM-YYY"
        onChange={(e) => setDob(e.target.value)}
        type="text"
        className="w-full max-w-xs input input-bordered bg-white text-slate-700"
        />
      <input
        required = {true}
        value={zodiacSign}
        placeholder="Enter you Zodiac Sign"
        onChange={(e) => setZodiacSign(e.target.value)}
        type="text"
        className="w-full max-w-xs input input-bordered bg-white text-slate-700"
        />
      <button
        className="w-full max-w-xs btn bg-blue-500 text-white border-none hover:bg-blue-500"
        onClick={() => setModalOpen(false)}
        type='submit'
        >
       Next
      </button>

      <p>{errorMsg}</p>
    </form>

  );
};

export default Setting;
