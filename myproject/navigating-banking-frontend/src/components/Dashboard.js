import React, { useState } from "react";
import BookingForm from "../components/BookingForm";

const Dashboard = ({ account }) => {
  const [appointments, setAppointments] = useState([]);

  const handleBooking = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Welcome, {account}</h2>
      <BookingForm onBookAppointment={handleBooking} />
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Your Appointments</h3>
        <ul className="mt-2">
          {appointments.map((appt, index) => (
            <li key={index} className="p-2 border-b">
              {appt.date} at {appt.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
