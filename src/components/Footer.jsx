import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="p-5 mt-5 mx-auto bg-base-200">
      <footer>
      <p className="text-center mt-2 font-semibold">Copyright © {new Date().getFullYear()} - All right reserved</p>
      </footer>
    </div>
  );
};

export default Footer;
