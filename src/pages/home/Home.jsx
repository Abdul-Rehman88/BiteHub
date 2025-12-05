import React from "react";
import heroSectionHome from "../../assets/images/hero-section-home.webp";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <div
        className="flex bg-cover bg-center h-[60vh] md:h-[70vh] lg:h-[80vh] w-full relative gradient-overlay"
        style={{ backgroundImage: `url(${heroSectionHome})` }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full z-10 gap-4">
          <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold text-center text-[#F5F5F5]">
            Welcome to BiteHub
          </h1>
          <p className="lg:text-xl md:text-xl text-lg text-center w-[350px] md:w-[400px] text-[#F5F5F5]">
            Taste the excellence. Feel the ambiance. Enjoy the moment.
          </p>
            <Button  className="text-base capitalize text-[#f5f5f5] z-20 hover:text-[#E09A05] border border-[#f5f5f5] hover:border-[#E09A05] px-8 py-2 rounded-[6px] transition-all duration-300 flex " onClick={<Link to="/reservation" />}>
                <Link to="/reservation">Reservation</Link>
            </Button>
        </div>
      </div>
      <div className="min-h-screen flex p-5 lg:p-[50px] md:p-[30px]"></div>
      </>
  );
}

export default Home;
