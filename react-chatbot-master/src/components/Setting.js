import React, { useState } from 'react';
import Modal from './Modal';
import DatePicker from 'react-datepicker';
//import 'react-date-picker/dist/DatePicker.css';
//import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import TimePicker from 'react-time-picker';
import axios from 'axios';

const Setting = ({ modalOpen, setModalOpen }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  // const [zodiacSign, setZodiacSign] = useState(''); 
  const [dob, setDob] = useState(new Date());
  const [time, setTime] = useState('10:00:00');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({ latitude: null, longitude: null });
   const [error, setError] = useState(''); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');

  const handleDobChange = (date) => {
    setDob(date);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
    setShowDropdown(false); // Close the dropdown after selection
  };

  const getCoordinates = async () => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: address,
          format: 'json',
        },
      });
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLocation({ latitude: lat, longitude: lon });
      } else {
        console.log("Address not found");
        alert("Address Not Found")
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveKey = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const obj = {
      name,
      dob,
      time,
      location,
      address,
      gender: selectedGender,
    };
    localStorage.setItem("profile", JSON.stringify(obj));
  
  };

  const handleButtonClick = () => {
    setModalOpen(false);
    window.location.reload();
  };

  return (
    <form onSubmit={saveKey} className="flex flex-col items-center justify-center gap-6 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">User Details</h2>

      <div className="w-full max-w-xs">
        <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
        <input
          required
          value={name}
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full max-w-xs">
        <label className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
        <DatePicker
          selected={dob}
          onChange={handleDobChange}
          dateFormat="y/MM/dd"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          showYearDropdown
          scrollableMonthYearDropdown
        />
      </div>

      <div className="w-full max-w-xs">
        <label className="block mb-2 text-sm font-medium text-gray-700">Time</label>
        <TimePicker
          onChange={handleTimeChange}
          value={time}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          format='hh:mm:ss a'
          clearIcon={null}
          clockIcon={null}
        />
      </div>

      <div className="w-full max-w-xs">
        <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter an address"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={getCoordinates}
          className="mt-2 bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700"
        >
          Get Coordinates
        </button>
        {location.latitude && location.longitude && (
          <div className="mt-2 text-sm text-gray-600">
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </div>
        ) }
      </div>

      <div className="relative w-full max-w-xs">
        <label className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
        <button
          type="button"
          onClick={handleToggleDropdown}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 text-left"
        >
          {selectedGender || 'Select Gender'}
        </button>
        {showDropdown && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg">
            {['Male', 'Female', 'Other'].map((gender) => (
              <li
                key={gender}
                onClick={() => handleSelectGender(gender)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {gender}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        onClick={handleButtonClick}
        className="btn bg-blue-500 text-white border-none w-full max-w-xs hover:bg-blue-600 p-2 rounded-lg"
      >
        Next
      </button>

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
    </form>
  );
};

export default Setting;
