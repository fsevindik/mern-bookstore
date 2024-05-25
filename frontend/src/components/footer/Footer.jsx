import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#F5F5DC] text-center py-4 mt-4">
      <div className="container mx-auto">
        <p className="text-gray-600">
          &copy; 2024 Book Store. All rights reserved.
        </p>
        <p className="text-gray-600">
          Created by{" "}
          <a
            href="https://muratcan23.github.io/myportfolio/"
            target="blank"
            className="text-sky-400 hover:text-black"
          >
            Murat Can
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
