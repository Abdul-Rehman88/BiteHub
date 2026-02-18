import heroSectionMenu from '../../assets/images/menu-hero.webp'
import {Tab } from "../../components/component_index.js";

function Menu() {
  return (
    <> 
      {/* hero section */}
      <div
        className="flex bg-cover bg-center h-[45vh] md:h-[55vh] lg:h-[60vh] w-full relative gradient-overlay"
        style={{ backgroundImage: `url(${heroSectionMenu})` }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full z-10 gap-4">
          <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold text-center text-(--light-color)">
            Explore Our Menu
          </h1>
          <p className="lg:text-xl md:text-xl text-lg text-center w-[300px] text-(--light-color)">
            Crafted with passion. Served with perfection.
          </p>
        </div>
      </div>

      {/* menu section */}
      <div className="flex flex-col gap-5 md:gap-8 lg:gap-10  justify-center items-center py-[30px] md:py-[50px] lg:py-20 px-5 lg:px-[50px] md:px-[30px] bg-(--bg-color)">
        {/* tabs */}
        <Tab/>
      </div>
    </>
  )
}

export default Menu