import Web3 from "web3";
import contractABI from "../contracts/YourContractABI.json"; // Ensure this is the correct ABI
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

let web3;
let contract;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractABI, contractAddress);
} else {
    console.error("Ethereum wallet not found! Please install MetaMask.");
}

export const bookAppointment = async (userAddress, appointmentData) => {
    try {
        await contract.methods
            .bookAppointment(appointmentData)
            .send({ from: userAddress });
        return "Appointment booked successfully!";
    } catch (error) {
        console.error("Error booking appointment:", error);
        return "Booking failed!";
    }
};
