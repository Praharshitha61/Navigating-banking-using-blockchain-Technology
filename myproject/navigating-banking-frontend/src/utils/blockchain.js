import { ethers } from "ethers";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_date", "type": "string" },
      { "internalType": "string", "name": "_time", "type": "string" }
    ],
    "name": "bookAppointment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_appointmentId", "type": "uint256" }],
    "name": "getAppointment",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const getEthereumContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask not detected!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export { getEthereumContract };

export const bookAppointment = async (date, time) => {
    try {
      const contract = await getEthereumContract();
      if (!contract) return;
  
      const tx = await contract.bookAppointment(date, time);
      await tx.wait();
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Failed to book appointment.");
    }
};
  
export const getAppointment = async (appointmentId) => {
    try {
      const contract = await getEthereumContract();
      if (!contract) return;
  
      const appointment = await contract.getAppointment(appointmentId);
      return {
        user: appointment[0],
        date: appointment[1],
        time: appointment[2],
      };
    } catch (error) {
      console.error("Fetch Error:", error);
      return null;
    }
};

export const listenForBookings = async (callback) => {
    try {
      const contract = await getEthereumContract();
      if (!contract) return;
  
      contract.on("AppointmentBooked", (user, date, time) => {
        callback({ user, date, time });
      });
    } catch (error) {
      console.error("Event Listener Error:", error);
    }
};
