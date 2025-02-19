import React, { useState } from "react";
import { bookAppointment } from "../utils/blockchain";
import { useEffect } from "react";
import { listenForBookings } from "../utils/blockchain";

useEffect(() => {
  listenForBookings((newAppointment) => {
    alert(`New Appointment: ${newAppointment.date} at ${newAppointment.time}`);
  });
}, []);

const AppointmentBooking = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async () => {
    if (!date || !time) {
      alert("Please enter date and time.");
      return;
    }
    await bookAppointment(date, time);
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={handleBooking}>Book</button>
    </div>
  );
};

export default AppointmentBooking;
