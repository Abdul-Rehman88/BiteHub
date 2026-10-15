import { useState, useEffect  } from "react";
import { freshIngredients, fastDelivery,diverseMenu,
        customerSatisfaction, masterChief, affordablePrices 
       } from "../../assets";
import { Button,Tab } from "../../components/component_index.js";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigation = useNavigate();

  // Carousel states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false); 

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

  // Carousel data - testimonials/reviews
  const carouselCards = [
    {
      id: 1,
      name: "Sarah",
      review: "Amazing food quality and quick delivery! The biryani was absolutely delicious and arrived hot. Will definitely order again!",
      rating: 4,
      image: "public/reviews/sarah.webp"
    },
    {
      id: 2,
      name: "Ali Khan",
      review: "Best restaurant in town! The customer service is exceptional and the menu variety is impressive. Highly recommended!",
      rating: 5,
      image: "public/reviews/Ali_Khan.webp"
    },
    {
      id: 3,
      name: "Fatima Malik",
      review: "Love the ambiance and the food taste. The desserts are to die for! Perfect place for family gatherings.",
      rating: 5,
      image: "public/reviews/Fatima_Malik.webp"
    },
    {
      id: 4,
      name: "Raza",
      review: "Great experience overall. The staff is friendly and the delivery was faster than expected. Keep up the good work!",
      rating: 4,
      image: "public/reviews/Raza.webp"
    },
    {
      id: 5,
      name: "Ayesha",
      review: "Affordable prices with premium quality. The master chef really knows how to create magic with flavors!",
      rating: 5,
      image: "public/reviews/Ayesha.webp"
    },
    {
      id: 6,
      name: "Imran Sheikh",
      review: "Excellent food and service! The diverse menu has something for everyone. My go-to restaurant now!",
      rating: 5,
      image: "public/reviews/Imran_Sheikh.webp"
    }
  ];

  // Carousel functions
// Calculate cards per view based on screen width
const getCardsPerView = () => {
  if (window.innerWidth >= 1024) return 3; // Desktop: 3 cards
  if (window.innerWidth >= 768) return 2;  // Tablet: 2 cards
  return 1; // Mobile: 1 card
};

// Calculate maximum index for carousel navigation
const maxIndex = carouselCards.length - cardsPerView;

// Handle window resize to update cards per view
useEffect(() => {
  const handleResize = () => {
    const newCardsPerView = getCardsPerView();
    setCardsPerView(newCardsPerView);
    // Ensure currentIndex doesn't exceed max possible index
    setCurrentIndex(prev => Math.min(prev, carouselCards.length - newCardsPerView));
  };

  // Set initial cards per view
  handleResize();
  
  // Add resize event listener
  window.addEventListener('resize', handleResize);
  
  // Cleanup: remove event listener on unmount
  return () => window.removeEventListener('resize', handleResize);
},); // Empty dependency - only run once on mount

// Auto-scroll carousel every 5 seconds
useEffect(() => {
  // Don't auto-scroll if paused (hover state)
  if (isPaused) return;

  const interval = setInterval(() => {
    setCurrentIndex(prev => {
      // Calculate max index based on current cards per view
      const max = carouselCards.length - cardsPerView;
      // Loop back to start if at the end
      return prev >= max ? 0 : prev + 1;
    });
  }, 5000); // 5 seconds interval

  // Cleanup: clear interval on unmount or when dependencies change
  return () => clearInterval(interval);
}, [isPaused, cardsPerView, carouselCards.length]); // Proper dependencies


// Go to specific slide (for indicators)
const goToSlide = (index) => {
  setCurrentIndex(index);
};

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
        style={{ backgroundImage: `url(/heroSections/home_hero.webp)` }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full z-10 gap-4 px-2">
          <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold text-center text-(--light-color)">
            Welcome to BiteHub
          </h1>
          <p className="px-2 lg:text-xl md:text-xl text-lg text-center xs:w-[320px] sm:w-[350px] md:w-[400px] text-(--light-color)">
            Taste the excellence. Feel the ambiance. Enjoy the moment.
          </p>
          <Button
            className="text-[15px] capitalize text-(--light-color) hover:text-(--button-hover-text-color) bg-transparent hover:bg-transparent border border-(--light-color) hover:border-(--button-hover-bg-color) px-8 py-2 rounded transition-all duration-300"
            onClick={() => navigation("/reservation")}
          >
            Reservation
          </Button>
        </div>
      </div>

      {/* menu section */}
      <div className="flex flex-col gap-5 md:gap-8 lg:gap-10  justify-center items-center py-[30px] md:py-[50px] lg:py-20 px-5 lg:px-[50px] md:px-[30px] bg-(--bg-color)">
        {/* tabs */}
          <Tab limit={8}/>
        {/* tabs end */}
          <Button className="text-(--white-color) hover:bg-transparent hover:text-(--button-hover-text-color)"
          onClick={() => navigation('/menu')}>View all Menu</Button>
      </div>
      {/* end of menu section */}
      
      {/* why choose us */}
      <div className="flex flex-col gap-20 justify-center items-center py-[30px] md:py-[50px] lg:py-20 px-5 lg:px-[50px] md:px-[30px] bg-(--light-color)">
        <h2 className="text-(--heading-color) text-2xl md:text-3xl lg:text-4xl font-bold">Why Choose Us</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gag-5 lg:gap-10 text-[13px] md:text-sm justify-center items-center text-center p-0 lg:px-12 ">
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

      {/* Customer Reviews Carousel */}
      <div className="flex flex-col gap-10 md:gap-16 justify-center items-center py-[30px] md:py-[50px] lg:py-20 px-5 lg:px-[50px] md:px-[30px] bg-(--bg-color)">
        <h2 className="text-(--heading-color) text-2xl md:text-3xl lg:text-4xl font-bold">
          What Our Customers Say
        </h2>
  
      <div className="w-full max-w-7xl">
        <div className="relative">
          {/* Carousel wrapper with pause on hover */}
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
              }}
            >
              {carouselCards.map((card) => (
                <div
                  key={card.id}
                  className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-2 py-4"
                >
                  <div className="bg-(--light-color) rounded-xl shadow-lg p-6 h-full min-h-[280px] flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={card.image}
                          alt={card.name}
                          loading="lazy"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-(--heading-color)">{card.name}</h3>
                          <div className="flex gap-1">
                            {[...Array(card.rating)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-(--text-color) text-sm leading-relaxed">
                        "{card.review}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
            
        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(maxIndex + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-(--button-bg-color) w-8' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      </div>
      {/* FAQs */}
      <div className="flex flex-col gap-10 md:gap-16 justify-center items-center py-[30px] md:py-[50px] lg:py-20 px-5 lg:px-[50px] md:px-[30px] bg-(--light-color)">
        <h2 className="text-(--heading-color) text-2xl md:text-3xl lg:text-4xl font-bold">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 md:space-y-5 w-full max-w-4xl">
          {faqData.map((item, index) => (
            <AccordionItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
