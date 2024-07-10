import React from "react";
import googlePlay from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";
const Footer = () => {
  return (
    <div>
      <div className=" w-full bg-gray-700 flex items-center md:flex-row flex-col justify-between px-10  h-auto md:gap-0 gap-10 py-10 md:h-60">
        <div className="flex items-center justify-between flex-col text-white gap-2">
          <h3 className="font-bold">Download Our App</h3>
          <div className=" text-center">
            <h2 className="text-lg">Download App For Android And</h2>
            <h2 className="text-lg">IOS mobile phone</h2>
          </div>
          <div>
            <img src={googlePlay} alt="" srcset="" className=" h-12" />
          </div>
          <div>
            <img src={appStore} alt="" className="h-12" />
          </div>
        </div>
        <div className="text-white text-center flex flex-col items-center justify-center gap-2">
          <h1 className="text-6xl text-[#82B0FB]">LUCID</h1>
          <p>High Quality is Our first Priority</p>
          <p>Copyright &copy; Shreads Private Limited</p>
        </div>
        <div className="text-white text-center">
          <h1 className="underline">Follow Us</h1>
          <div>
            <p>Instagram</p>
            <p>Github</p>
            <p>Linkdin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
