import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#707066] text-center py-4 ">
      <div className="container mx-auto">
        <p className="text-gray-300">
          &copy; 2024 Book Store. All rights reserved.
        </p>
        <p className="text-gray-300">
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
