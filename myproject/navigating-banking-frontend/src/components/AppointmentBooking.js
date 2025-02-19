import React, { useState } from "react";
import { bookAppointment } from "../utils/blockchainService"; // Ensure correct import

const AppointmentBooking = ({ userAccount }) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleBooking = async () => {
        if (!date || !time) {
            alert("Please select a date and time.");
            return;
        }

        const appointmentData = { date, time };
        const result = await bookAppointment(userAccount, appointmentData);
        alert(result);
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
            <button onClick={handleBooking}>Book Appointment</button>
        </div>
    );
};

export default AppointmentBooking;
