import { useEffect } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const MeetingReminder = () => {
    useEffect(() => {
        socket.on("showReminder", (data) => {
            toast.info(`${data.message} (Meeting Time: ${data.time})`, {
                position: "top-right",
                autoClose: 5001,
            });
        });

        return () => socket.off("showReminder");
    }, []);

    return null;
};

export default MeetingReminder;
