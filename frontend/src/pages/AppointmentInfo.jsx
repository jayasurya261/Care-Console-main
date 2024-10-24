import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AppointmentInfo = () => {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [prescription, setPrescription] = useState('');
  const [fees, setFees] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(true); // Toggle between edit and display mode

  const { _id } = useParams();
  const navigate = useNavigate(); // Hook for navigation

  const confirm = (e) => {
    e.preventDefault();

    const data = {
      prescription,
      fees,
    };

    axios
      .put(`http://localhost:3001/users/modify-appointments/${_id}`, data)
      .then(() => {
        setAlertMessage('Prescription and Fees Added Successfully!');
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
        setIsEditMode(false); // Switch to display mode after confirmation
      })
      .catch((error) => {
        setAlertMessage('An error happened. Please check console.');
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
        console.log(error);
      });
  };

  const handleEdit = () => {
    setIsEditMode(true); // Switch back to edit mode when "Edit" is clicked
  };

  const handleBack = () => {
    navigate('/admin/all-appointment'); // Navigate to the appointments list
  };

  useEffect(() => {
    if (_id) {
      axios
        .get(`http://localhost:3000/appointments/appointment-info?appointmentId=${_id}`)
        .then((response) => {
          const data = response.data.data;
          setEmail(data.email);
          setDate(data.date);
          setTime(data.time);
          setDescription(data.description);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [_id]);

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:3000/users/appointment-name?email=${email}`)
        .then((response) => {
          setName(response.data.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [email]);

  return (
    <div className="relative flex justify-center pt-10 pb-12 bg-gray-100 min-h-screen">
      <div className="flex justify-between bg-white shadow-lg p-10 rounded-3xl w-[800px] h-full">
        {/* Left Column: Appointment Details */}
        <div className="w-1/2 pr-6 border-r border-black">
          {/* Back Button Inside Appointment Box */}
          <div className="mt-6 text-left w-[800px]">
  <button
    onClick={handleBack}
    className="p-3 bg-transparent text-black font-semibold hover:text-blue-500"
  >
    &lt; Back
  </button>
</div>

          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Appointment Information
          </h2>

          {/* Appointment details */}
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-600">Name: </label>
            <p className="text-xl text-gray-800">{name}</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-600">Email:</label>
            <p className="text-xl text-gray-800">{email}</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-600">Date:</label>
            <p className="text-xl text-gray-800">{date}</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-600">Time:</label>
            <p className="text-xl text-gray-800">{time}</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-600">Description:</label>
            <p className="text-xl text-gray-800">{description}</p>
          </div>
        </div>

        {/* Right Column: Prescription and Fees Form or Display */}
        <div className="w-1/2 pl-6 flex flex-col justify-between">
          {isEditMode ? (
            <form onSubmit={confirm} className="space-y-6 h-full">
              <div className="flex-grow">
                <label className="block text-lg font-semibold text-gray-600">Prescription:</label>
                <textarea
                  className="w-full mt-2 p-3 border border-gray-400 rounded-lg   h-[50vh]"
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  placeholder="Enter prescription details here"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-600">Fees:</label>
                <input
                  type="number"
                  className="w-full mt-2 p-3 border border-gray-400 rounded-lg  "
                  placeholder="Rs.XXXXX"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full p-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 "
                >
                  Confirm
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 h-full">
              <div className="flex-grow">
                <label className="block text-lg font-semibold text-gray-600">Prescription:</label>
                <p className="text-xl text-gray-800 bg-gray-200 p-3 rounded-lg">{prescription}</p>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-600">Fees:</label>
                <p className="text-xl text-gray-800 bg-gray-200 p-3 rounded-lg">Rs. {fees}</p>
              </div>

              <div className="text-center">
                <button
                  onClick={handleEdit}
                  className="w-full p-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:ring focus:ring-teal-300"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Alert */}
      {alertVisible && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white py-3 px-6 rounded-lg shadow-lg text-center transition-opacity duration-500">
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default AppointmentInfo;
