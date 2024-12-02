import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const isHomePage = location.pathname === "/";
  return (
    <div
      className={`fixed top-0 w-full  text-white p-4 transition-transform duration-700 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        isHomePage
          ? isScrolled
            ? "bg-[#2c2d42]" //scroll
            : "bg-[#2c2d42] "
          : isScrolled
          ? "bg-[#2c2d42]" //scroll
          : "bg-slate-700/50 "
      } `}
    >
      <div className=" mx-auto text-center  ">
        <button className="text-2xl font-semibold py-4"> SkyLark </button>{" "}
      </div>
    </div>
  );
};

export default Navbar;
