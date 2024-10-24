import React, { useState } from 'react';
import { images } from '../assets/images';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { useNavigate } from 'react-router-dom';
import '../style/CalendarCustom.css';

const BookAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00');
  const [description, setDescription] = useState('');
  const [showAlert, setShowAlert] = useState(false); 
  const [alertType, setAlertType] = useState('success'); // Success or error
  const navigate = useNavigate();

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const triggerAlert = (type) => {
    setAlertType(type);
    setShowAlert(true); // Show alert
    setTimeout(() => {
      setShowAlert(false); // Hide alert after 2 seconds
    }, 2000);
  };

  const handleSubmit = () => {
    if (date && time && description) {
      triggerAlert('success'); // Trigger the success alert
      navigate(`/confirm/${date}/${time}/${description}`);
    } else {
      triggerAlert('error'); // Trigger the error alert
    }
  };

  return (
    <div className='flex justify-center '>
      {/* Doctor Card */}
      <div className='md:w-1/3 flex flex-col items-center relative mb-2'>
        {/* Image Container */}
        <div className='absolute inset-0'>
          <img 
            src={images.doctor} 
            alt="Doctor" 
            className='w-full h-full object-cover border-4 border-gray-300 mb-2 ml-3 rounded-xl shadow-lg'
          />
        </div>
        <div className='relative z-10 p-4 bg-white shadow-lg flex flex-col items-center '>
          <p className='text-gray-800 text-xl font-semibold'>Dr. Hermione M.B.B.S M.S.</p>
          <p className='text-gray-600'>Specialist in Cardiology</p>
        </div>
      </div>

      <div className='appointment-form'>
        <h2 className="form-title">DOCTOR APPOINTMENT</h2>
        <div className="calendar-container">
          <Calendar 
            onChange={handleDateChange} 
            value={date} 
            minDate={new Date()} 
            className="calendar"
          />
        </div>
        <div className="time-picker-container">
          <TimePicker 
            onChange={handleTimeChange} 
            value={time} 
            className="time-picker"
          />
        </div>
        <div>
          <textarea 
            onChange={handleDescription} 
            value={description}  
            placeholder='Enter your description here' 
            className='description-textarea'
          ></textarea>
        </div>
        <button 
          onClick={handleSubmit} 
          className="submit-button"
        >
          Submit
        </button>

        {/* Alert Window */}
        {showAlert && (
          <div 
            className={`fixed top-4 right-4 ${
              alertType === 'success' ? 'bg-green-600' : 'bg-red-600'
            } text-white px-6 py-3 rounded-md shadow-lg z-50 flex items-center`}
          >
            {alertType === 'success' ? (
              <>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6 mr-2"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M13.875 18.825A9 9 0 105.175 10.125a9 9 0 008.7 8.7zm0 0l5.25 5.25" 
                  />
                </svg>
                <span>Your appointment has been booked successfully!</span>
              </>
            ) : (
              <>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6 mr-2"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 9v3.75m0 3.75h.008v-.008H12v.008zm9-7.5A9 9 0 1112 3a9 9 0 019 9z" 
                  />
                </svg>
                <span>Please provide date, time, and description!</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
