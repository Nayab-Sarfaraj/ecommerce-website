import React from "react";
import { ReactNavbar } from "overlay-navbar";


const Header = () => {
  // const options = {
  //   burgerColorHover: "#070602",
  
  //   logoWidth: "20vmax",
  //   navColor1: "white",
  //   logoHoverSize: "10px",
  //   logoHoverColor: "#eb4034",
  //   link1Text: "Home",
  //   link2Text: "Products",
  //   link3Text: "Contact",
  //   link4Text: "About",
  //   link1Url: "/",
  //   link2Url: "/products",
  //   link3Url: "/contact",
  //   link4Url: "/about",
  //   link1Size: "1.3vmax",
  //   link1Color: "rgba(35, 35, 35,0.8)",
  //   nav1justifyContent: "flex-end",
  //   nav2justifyContent: "flex-end",
  //   nav3justifyContent: "flex-start",
  //   nav4justifyContent: "flex-start",
  //   link1ColorHover: "#eb4034",
  //   link1Margin: "1vmax",
  //   profileIconUrl: "/login",
  //   profileIconColor: "rgba(35, 35, 35,0.8)",
  //   searchIconColor: "rgba(35, 35, 35,0.8)",
  //   cartIconColor: "rgba(35, 35, 35,0.8)",
  //   profileIconColorHover: "#eb4034",
  //   searchIconColorHover: "#eb4034",
  //   cartIconColorHover: "#eb4034",
  //   cartIconMargin: "1vmax",
  // };

  return (
    <div className=" block">
  <ReactNavbar
    burgerColor="black"
      logo="https://ideogram.ai/api/images/direct/ZfZvEdI8TUuO9JIShn162A.jpg"
      logoWidth="200px"
      
      logoHoverColor="#82B0FB "
      link1Text="Home"
      link2Text="Product"
      link3Text="Contact"
      link4Text="About"
      link5Text="Search"

      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Color="#82B0FB"
      link1ColorHover="azure"
      nav1justifyContent= "flex-end"
      nav2justifyContent= "flex-end"
      nav3justifyContent= "flex-start"
      nav4justifyContent= "flex-start"
      link1Margin="10px"   
      link1Size	="1.5vmax"  
      // cartIcon="true"
      // CartIconElement={IoSearch}
      // profileIcon="true"
      // profileIconElement={CgProfile}
      // searchIcon={true}
      // searchIconElement={AiOutlineShoppingCart}
      // profileIconUrl= "/login"
      // profileIconColor= "rgba(35, 35, 35,0.8)"
      // searchIconColor="rgba(35, 35, 35,0.8)"
      // cartIconColor= "rgba(35, 35, 35,0.8)"
      // profileIconColorHover= "#eb4034"
      // searchIconColorHover= "#eb4034"
      // cartIconColorHover="#eb4034"
      // cartIconMargin= "1vmax"
    />
    </div>
  
  );
};

export default Header;
