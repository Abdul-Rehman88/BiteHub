import React from "react";
import { useState } from "react";
import heroSectionHome from "../../assets/images/hero-section-home.webp";
import {Button, Card} from "../../components/component_index.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigation = useNavigate();
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      {/* hero section  */}
      <div
        className="flex bg-cover bg-center h-[60vh] md:h-[70vh] lg:h-[80vh] w-full relative gradient-overlay"
        style={{ backgroundImage: `url(${heroSectionHome})` }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full z-10 gap-4">
          <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold text-center text-(--light-color)">
            Welcome to BiteHub
          </h1>
          <p className="lg:text-xl md:text-xl text-lg text-center w-[350px] md:w-[400px] text-(--light-color)">
            Taste the excellence. Feel the ambiance. Enjoy the moment.
          </p>
          <Button
            className="text-[15px] capitalize text-(--light-color) hover:text-[#E09A05] bg-transparent hover:bg-transparent border border-(--light-color) hover:border-[#E09A05] px-8 py-2 rounded transition-all duration-300"
            onClick={() => navigation("/reservation")}
          >
            Reservation
          </Button>
        </div>
      </div>

      {/* menu section */}
      <div className="flex flex-col gap-20 justify-center items-center py-[30px] md:py-[50px] lg:py-20 px-5 lg:px-[50px] md:px-[30px] bg-(--bg-color)">

        {/* tabs */}
        <ul className="flex items-center bg-(--bg-color) rounded-full p-1 relative">
          <div
            className={`${
              (activeTab === 1 && "translate-x-0") ||
              (activeTab === 2 && "translate-x-[90px]") ||
              (activeTab === 3 && "translate-x-[186px]")
            } bg-(--button-bg-color) absolute text-(--white-color) h-[85%] w-[30%] text-center transition duration-700 rounded-full border-transparent cursor-pointer`}
          ></div>

          <li
            className={`${
              activeTab === 1 ? "text-(--white-color)" : "text-(--text-color)"
            } px-6 py-2 z-20 transition duration-300 rounded-full cursor-pointer`}
            onClick={() => setActiveTab(1)}
          >
            Main
          </li>

          <li
            className={`${
              activeTab === 2 ? "text-(--white-color)" : "text-(--text-color)"
            } px-6 py-2 z-20 transition duration-300 rounded-full cursor-pointer`}
            onClick={() => setActiveTab(2)}
          >
            Dessert
          </li>

          <li
            className={`${
              activeTab === 3 ? "text-(--white-color)" : "text-(--text-color)"
            } px-6 py-2 z-20 transition duration-300 rounded-full cursor-pointer`}
            onClick={() => setActiveTab(3)}
          >
            Drinks
          </li>
        </ul>

        {/* ⭐ TAB CONTENT HERE ⭐ */}
        <div className="w-full text-center mt-6">
            
          {activeTab === 1 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
             <Card /> 
             <Card /> 
             <Card /> 
             <Card /> 
             <Card /> 
             <Card /> 
             
                  {/* <Card
                    image="https://img.freepik.com/free-photo/close-up-adorable-kitten-couch.jpg"
                    title="Domestic Cat"
                    description="Lorem Ipsum is simply dummy text of the printing industry."
                    buttonText="Order Now"
                 */}

            </div>
          )}

          {activeTab === 2 && (
            <div className="text-(--text-color)">
              <h2 className="text-2xl font-bold text-(--heading-color)">Desserts</h2>
              <p className="mt-2">Sweet and delightful desserts for every craving.</p>
            </div>
          )}

          {activeTab === 3 && (
            <div className="text-(--text-color)">
              <h2 className="text-2xl font-bold text-(--heading-color)">Drinks</h2>
              <p className="mt-2">Refreshing beverages to complete your meal.</p>
            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Home;
