import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";


const WhatsAppButton: React.FC = () => {
    const phoneNumber = "+919570994444"; // Replace with your WhatsApp number
    const message = "Join Our WhatsApp Community & Learn Flutter + AI"; // write messages

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
    )}`;

    return (
        <>
        {/* <div className="fixed bottom-3 right-5 z-5">

       <p>Join Our WhatsApp Community 🚀</p>
        </div> */}
        <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-9 right-5 z-5 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 "
        >
            
            <FaWhatsapp size={35} />
        </Link>
        </>
    );
};

export default WhatsAppButton;
