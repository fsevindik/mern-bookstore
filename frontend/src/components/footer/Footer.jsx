import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-center py-4">
      <div className="container mx-auto">
        <p className="text-gray-300">
          &copy; 2024 Book Store. All rights reserved.
        </p>
        <p className="text-gray-300">
          Created by{" "}
          <a
            href="https://muratcan23.github.io/myportfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-yellow-500 mr-4"
          >
            Murat Can
          </a>
          <a
            href="https://github.com/muratcan23"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-yellow-500"
          >
            <FaGithub
              className="inline-block align-text-bottom mt-2"
              size={24}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/murat-can-7660a8282/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-400 mr-2"
          >
            <FaLinkedin
              className="inline-block align-text-bottom ml-3"
              size={24}
            />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
