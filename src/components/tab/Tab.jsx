import {useState,useEffect} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig.js";
import { Card } from "../component_index";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/AddToCart.js";
import toast from "react-hot-toast";


export default function Tab() {

    const [activeTab, setActiveTab] = useState(1);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const handleAddToCart =(item)=>{
        dispatch(addItem(item))
        toast.success(`${item.name} added to cart successfully!`);
    }
    // Fetch menu items from Firestore
    useEffect(() => {
    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "menuItems"));
            const items = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name||doc.data().Name,
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
          return false;
        });

        return (
            <>
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
                        activeTab === 1 ? "text-(--white-color)" : "text-(--button-text-color)"
                        } px-6 py-2 z-20 transition duration-300 rounded-full cursor-pointer`}
                        onClick={() => setActiveTab(1)}
                    >
                        Main
                    </li>

                    <li
                        className={`${
                        activeTab === 2 ? "text-(--white-color)" : "text-(--button-text-color)"
                        } px-6 py-2 z-20 transition duration-300 rounded-full cursor-pointer`}
                        onClick={() => setActiveTab(2)}
                    >
                        Dessert
                    </li>

                    <li
                        className={`${
                        activeTab === 3 ? "text-(--white-color)" : "text-(--button-text-color)"
                        } px-6 py-2 z-20 transition duration-300 rounded-full cursor-pointer`}
                        onClick={() => setActiveTab(3)}
                    >
                      Drinks
                    </li>
              </ul>

              {/* TAB CONTENT HERE */}
              <div className="w-full text-center">
                {loading ? (
                  <p className="text-(--text-color)">Loading menu items...</p>
                ) : (
                  <div>
                    {activeTab === 1 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {filteredItems.length > 0 ? (
                          filteredItems.map((item) => (
                            <Card titleClass="text-[var(--white-color)]" descriptionClass="text-[var(--light-color)]" buttonClass="hover:bg-transparent hover:text-[var(--light-color)]"
                              key={item.id}
                              image={item.image}
                              title={item.name}
                              description={item.description.substring(0, 100)+"..."}
                              price={item.price} 
                              buttonText="Add to Cart"
                              onClick={()=>handleAddToCart(item)}
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
                            <Card titleClass="text-[var(--white-color)]" descriptionClass="text-[var(--light-color)]" buttonClass="hover:bg-transparent hover:text-[var(--light-color)]"
                              key={item.id}
                              image={item.image}
                              title={item.name}
                              description={item.description.substring(0, 100)+"..."}
                              price={item.price}
                              buttonText="Add to Cart"
                              onClick={()=>handleAddToCart(item)}
                              
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
                            <Card titleClass="text-[var(--white-color)]" descriptionClass="text-[var(--light-color)]" buttonClass="hover:bg-transparent hover:text-[var(--light-color)]"
                              key={item.id}
                              image={item.image}
                              title={item.name}
                              description={item.description}
                              price={item.price}
                              buttonText="Add to Cart"
                              onClick={()=>handleAddToCart(item)}
                            />
                          ))
                        ) : (
                          <p className="col-span-2 md:col-span-3 text-(--text-color)">
                            No drinks available
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
        </>
    )
}




        