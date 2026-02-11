import { useState, useEffect } from "react";
import { heroSectionHome, freshIngredients, fastDelivery,diverseMenu,
        customerSatisfaction, masterChief, affordablePrices 
       } from "../../assets";
import { Button, Card } from "../../components/component_index.js";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig.js";


function Home() {
  const navigation = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch menu items from Firestore
  useEffect(() => {
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "menuItems"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name||doc.data().Name, // 
        description: doc.data().description || doc.data().Description, 
        image: doc.data().image || doc.data().Image, 
        category: doc.data().category || doc.data().Category,
        price: doc.data().price || doc.data().Price, 
      }));
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchMenuItems();
  }, []);

  // Filter menu items based on active tab
  const filteredItems = menuItems.filter((item) => {
    if (activeTab === 1) return item.category === "main"|| item.category === "Main";
    if (activeTab === 2) return item.category === "dessert "|| item.category === "Dessert";
    if (activeTab === 3) return item.category === "drink" || item.category === "Drink";
    return false; // Add default return
  });

  // FAQ data
  const faqData = [{
    question: "What are your delivery hours?",
    answer: "Our delivery hours are from 7:00 PM to 2:00 AM daily."
  }, {
    question: "Do you offer free delivery?",
    answer: "Free delivery is offered for orders over Rs. 2000. For orders below that amount, a delivery fee of Rs. 100 applies."
  }, {
    question: "How can I track my order??",
    answer: "Once your order is confirmed, you will receive a tracking link via SMS or email. You can use this link to monitor the status of your delivery in real-time."
  }, {
    question: "Is your delivery service secure and private?",
    answer: "Yes, we prioritize the security and privacy of our customers. Our delivery personnel are trained to handle orders with care, and we use secure packaging to ensure your food arrives safely. Additionally, we do not share your personal information with third parties."
  }];
// Accordion item component for FAQs
  const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="bg-(--light-color)">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="w-full flex justify-between items-center text-left p-5 md:p-6 focus:outline-none hover:bg-(--bg-color) transition-colors duration-300"
          >
            <span className="text-base md:text-lg font-semibold text-(--heading-color) pr-4">
              {question}
            </span>
            <span className={`transform transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-(--button-bg-color)" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
        </button>

        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2">
            <p className="text-(--text-color) text-sm md:text-base leading-relaxed">{answer}</p>
          </div>
        </div>
        </div>
      </div>
    );
  };

  // home function return
  return (
    <>
      {/* hero section */}
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

        {/* TAB CONTENT HERE */}
        <div className="w-full text-center mt-6">
          {loading ? (
            <p className="text-(--text-color)">Loading menu items...</p>
          ) : (
            <>
              {activeTab === 1 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <Card titleClass="text-(--white-color)" descriptionClass="text-(--light-color)" buttonClass="hover:text-(--light-color)"
                        key={item.id}
                        image={item.image}
                        title={item.name}
                        description={item.description.substring(0, 100)+"..."}
                        price={item.price} 
                        buttonText="Add to Cart"
                        // onClick={() => addToCart(item)}
                      />
                    ))
                  ) : (
                    <p className="col-span-2 md:col-span-3 text-(--text-color)">
                      No main dishes available
                    </p>
                  )}
                </div>
              )}

              {activeTab === 2 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <Card titleClass="text---white-color)" descriptionClass="text-(--light-color)" buttonClass="hover:text-(--light-color)"
                        key={item.id}
                        image={item.image}
                        title={item.name}
                        description={item.description.substring(0, 100)+"..."}
                        price={item.price}
                        buttonText="Add to Cart"
                      />
                    ))
                  ) : (
                    <p className="col-span-2 md:col-span-3 text-(--text-color)">
                      No desserts available
                    </p>
                  )}
                </div>
              )}

              {activeTab === 3 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <Card titleClass="text-[var(--white-color)]" descriptionClass="text-[var(--light-color)]" buttonClass="hover:text-[var(--light-color)]"
                        key={item.id}
                        image={item.image}
                        title={item.name}
                        description={item.description}
                        price={item.price}
                        buttonText="Add to Cart"
                      />
                    ))
                  ) : (
                    <p className="col-span-2 md:col-span-3 text-(--text-color)">
                      No drinks available
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* end of menu section */}
      
      {/* why choose us */}
      <div className="flex flex-col gap-20 justify-center items-center py-[30px] md:py-[50px] lg:py-20 px-5 lg:px-[50px] md:px-[30px] bg-(--light-color)">
        <h2 className="text-(--heading-color) text-2xl md:text-3xl lg:text-4xl font-bold">Why Choose Us</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 lg:gap-10 text-[13px] md:text-sm justify-center items-center text-center p-0 lg:px-12 ">
          {/* first box */}
          <div className="p-4 md:p-6 lg:p-10 bg-amber-200 rounded-xl h-full hover:-translate-y-2 transition-transform duration-400" >
            <img src={freshIngredients} alt="Fresh Ingredients"
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto" />
            <h3 className="text-(--heading-color) text-lg md:text-xl font-semibold mb-2">Fresh Ingredients</h3>
            <p className="text-(--text-color) max-w-xs">We source only the freshest ingredients to ensure every dish is bursting with flavor.</p>
          </div>

          {/* second box */}
          <div className="p-4 md:p-6 lg:p-10 bg-(--dark-color) rounded-xl h-full hover:-translate-y-2 transition-transform duration-400" >
            <img src={fastDelivery} alt="Fast Delivery"
              className=" w-16 h-16 lg:w-24 lg:h-24 mx-auto" />
            <h3 className="text-(--white-color) text-lg md:text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-(--light-color) max-w-xs">We ensure quick and reliable delivery so you can enjoy your meals without delay.</p>
          </div>

          {/* third box */}
          <div className="p-4 md:p-6 lg:p-10 bg-(--dark-color) md:bg-amber-200 rounded-xl h-full hover:-translate-y-2 transition-transform duration-400" >
            <img src={masterChief} alt="Master Chief"
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto" />
            <h3 className="text-(--white-color) md:text-(--heading-color) text-lg md:text-xl font-semibold mb-2"> Master Chief</h3>
            <p className="text-(--light-color) md:text-(--text-color) max-w-xs">Our master chefs bring years of experience and passion to every dish.</p>
          </div>  
          
          {/* fourth box */}
            <div className="p-4 md:p-6 lg:p-10 md:bg-(--dark-color) bg-amber-200 rounded-xl h-full hover:-translate-y-2 transition-transform duration-400" >
            <img src={diverseMenu} alt="Diverse Menu"
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto" />
            <h3 className="md:text-(--white-color) text-(--heading-color) text-lg md:text-xl font-semibold mb-2">Diverse Menu</h3>
            <p className="md:text-(--light-color) text-(--text-color) max-w-xs">Our menu offers a wide variety of dishes to satisfy every palate.</p>
          </div> 

          {/* fifth box */}
            <div className="p-4 md:p-6 lg:p-10 bg-amber-200 rounded-xl  h-full hover:-translate-y-2 transition-transform duration-400" >
            <img src={affordablePrices} alt="Affordable Prices"
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto" />
            <h3 className="text-(--heading-color) text-lg md:text-xl font-semibold mb-2">Affordable Prices</h3>
            <p className="text-(--text-color) max-w-xs">We offer competitive pricing without compromising on quality.</p>
          </div>

          {/* sixth box */}
          <div className="p-4 md:p-6 lg:p-10 bg-(--dark-color) rounded-xl  h-full hover:-translate-y-2 transition-transform duration-400" >
            <img src={customerSatisfaction} alt="Customer Satisfaction"
              className=" w-16 h-16 lg:w-24 lg:h-24 mx-auto" />
            <h3 className="text-(--white-color) text-lg md:text-xl font-semibold mb-2">Customer Satisfaction</h3>
            <p className="text-(--light-color) max-w-xs">Our customers are our top priority, and we strive to exceed their expectations.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}

      {/* FAQs */}
      <div className="flex flex-col gap-10 md:gap-16 justify-center items-center py-[30px] md:py-[50px] lg:py-20 px-5 lg:px-[50px] md:px-[30px] bg-(--bg-color)">
  <h2 className="text-(--heading-color) text-2xl md:text-3xl lg:text-4xl font-bold">
    Frequently Asked Questions
  </h2>
  <div className="space-y-4 md:space-y-5 w-full max-w-4xl">
    {faqData.map((item, index) => (
      <AccordionItem key={index} question={item.question} answer={item.answer} />
    ))}
  </div>
      </div>
  
    {/* carousel */}
    {/* <Carousel className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel> */}
    </>
  );
}

export default Home;