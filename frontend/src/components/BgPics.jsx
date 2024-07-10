import React from "react";

const data = [
  {
    src: "https://d3ptyyxy2at9ui.cloudfront.net/assets/images/ae01c415678c90d0c606bc6917758502.jpg",
  },
  {
    src: "https://d3ptyyxy2at9ui.cloudfront.net/assets/images/573fa908fbccdf1600f90f16a0c2e311.jpg",
  },
  {
    src: "https://d3ptyyxy2at9ui.cloudfront.net/assets/images/87ded242639ba32ef4d0e6c21c9f30aa.jpg",
  },
  {
    src: "https://d3ptyyxy2at9ui.cloudfront.net/assets/images/ba90575091d9eafd60f851f7297cb202.jpg",
  },
];

const Card = ({ src, text1, text2 }) => (
  <div className="relative">
    <img src={src} alt={text2} className="w-full h-full object-cover" />
    <div className="absolute bottom-0 left-0 p-4 text-white">
      <p className="text-2xl font-bold">{text1}</p>
      <p>{text2}</p>
    </div>
  </div>
);

const BgPics = () => {
  return (
    <div className="hidden md:grid grid-cols-2 grid-rows-2 max-w-md max-h-[700px] ml-20">
      {data.map((item) => (
        <img key={item.src} src={item.src} />
      ))}
    </div>
  );
};

export default BgPics;
