import React, { useState } from "react";

const BookingForm = ({ onBookAppointment }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();
    if (date && time) {
      onBookAppointment({ date, time });
    } else {
      alert("Please select date and time.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-3">Book an Appointment</h2>
      <form onSubmit={handleBooking}>
        <input
          type="date"
          className="border p-2 w-full mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="border p-2 w-full mb-3"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 w-full rounded-md"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
