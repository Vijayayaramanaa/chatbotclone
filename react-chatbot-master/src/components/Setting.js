import React, { useEffect, useState } from 'react';

const Setting = ({ modalOpen, setModalOpen }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const saveKey = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const obj = {
      name : name,
      dob : dob
    }
    localStorage.setItem("profile",JSON.stringify(obj))
  };

  useEffect(() => {
    if (modalOpen) {
      setName(name);
      setDob(dob);
    
    }
  }, [name, dob, modalOpen]);


 

  return (
    <form onSubmit={saveKey} className="flex flex-col items-center justify-center gap-2">
      <input
        value={name}
        placeholder="Enter your Name"
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="w-full max-w-xs input input-bordered bg-white text-slate-700"
      />

      <input
        value={dob}
        placeholder="Enter you Date of Birth"
        onChange={(e) => setDob(e.target.value)}
        type="text"
        className="w-full max-w-xs input input-bordered bg-white text-slate-700"
      />
      <button
        className="w-full max-w-xs btn bg-blue-500 text-white border-none hover:bg-blue-500"
        onClick={() => setModalOpen(false)}
      >
       Next
      </button>

      <p>{errorMsg}</p>
    </form>
  );
};

export default Setting;
