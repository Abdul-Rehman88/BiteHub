import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig.js";
import { Card, CardSkeleton } from "../component_index";
import { useDispatch } from "react-redux";
import { addItems } from "../../store/Cart.js";
import toast from "react-hot-toast";
import useRequireAuth from "../../hook/useRequireAuth.js";
import { useNavigate } from "react-router-dom";

const TABS = [
  { id: 1, label: "Main", empty: "No main dishes available" },
  { id: 2, label: "Dessert", empty: "No desserts available" },
  { id: 3, label: "Drinks", empty: "No drinks available" },
];

export default function Tab({ limit }) {
  const [activeTab, setActiveTab] = useState(1);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const checkAuth = useRequireAuth();
  const navigate = useNavigate();

  const descLimit = window.innerWidth < 768 ? 20 : 30;

  // Only the "Add to Cart" button requires login
  const handleAddToCart = (item) => {
    if (!checkAuth()) return;
    dispatch(addItems(item));
    toast.success(`${item.name} added to cart successfully!`);
  };

  // Fetch menu items from Firestore (no login needed)
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "menuItems"));
        const items = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || data.Name,
            description: data.description || data.Description || "",
            image: data.image || data.Image,
            category: data.category || data.Category,
            price: data.price || data.Price,
          };
        });
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  // Filter menu items based on active tab (case-insensitive)
  const categoryByTab = { 1: "main", 2: "dessert", 3: "drink" };
  const filteredItems = menuItems.filter(
    (item) => (item.category || "").toLowerCase() === categoryByTab[activeTab]
  );

  const gridClasses =
    "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6";

  return (
    <>
      {/* Tab switcher */}
      <ul className="flex items-center bg-(--bg-color) rounded-full p-1 relative">
        <div
          className={`${
            (activeTab === 1 && "translate-x-0") ||
            (activeTab === 2 && "translate-x-[90px]") ||
            (activeTab === 3 && "translate-x-[186px]")
          } bg-(--button-bg-color) absolute text-(--white-color) h-[85%] w-[30%] text-center transition duration-700 rounded-full border-transparent cursor-pointer`}
        ></div>

        {TABS.map((tab) => (
          <li
            key={tab.id}
            className={`${
              activeTab === tab.id
                ? "text-(--white-color)"
                : "text-(--button-text-color)"
            } px-6 py-2 z-20 transition duration-300 rounded-full cursor-pointer`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>

      {/* Tab content */}
      <div className="w-full text-center">
        {loading ? (
          // Skeleton grid matches the real card grid
          <div className={gridClasses}>
            {Array.from({ length: limit || 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className={gridClasses}>
            {filteredItems.length > 0 ? (
              filteredItems.slice(0, limit).map((item) => (
                <Card
                  key={item.id}
                  titleClass="text-[var(--light-color)]"
                  descriptionClass="text-[var(--light-color)]"
                  buttonClass="hover:bg-transparent hover:text-[var(--light-color)]"
                  image={item.image}
                  title={item.name}
                  description={item.description.substring(0, descLimit) + "..."}
                  price={item.price}
                  buttonText="Add to Cart"
                  // Viewing the item: no login required
                  onClick={() => navigate(`/item/${item.id}`)}
                  // Adding to cart: login required
                  onButtonClick={() => handleAddToCart(item)}
                />
              ))
            ) : (
              <p className="col-span-2 md:col-span-3 lg:col-span-4 text-center text-(--text-color)">
                {TABS.find((t) => t.id === activeTab)?.empty}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
