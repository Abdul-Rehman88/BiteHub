import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig.js";
import { useDispatch } from "react-redux";
import { addItems } from "../../store/Cart.js";
import toast from "react-hot-toast";
import useRequireAuth from "../../hook/useRequireAuth.js";
import { Button } from "../../components/component_index.js";
import placeholder from "../../assets/images/img_placeholder.webp";
import { Card } from "../../components/component_index.js";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkAuth = useRequireAuth();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const descLimit = window.innerWidth < 768 ? 20 : 30;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "menuItems", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const fetchedItem = {
            id: docSnap.id,
            name: data.name || data.Name,
            description: data.description || data.Description,
            image: data.image || data.Image,
            category: data.category || data.Category,
            price: data.price || data.Price,
          };
          setItem(fetchedItem);

          // Fetch related items from same category
          const querySnapshot = await getDocs(collection(db, "menuItems"));
          const allItems = querySnapshot.docs.map((d) => ({
            id: d.id,
            name: d.data().name || d.data().Name,
            description: d.data().description || d.data().Description,
            image: d.data().image || d.data().Image,
            category: d.data().category || d.data().Category,
            price: d.data().price || d.data().Price,
          }));
          const relatedItems = allItems
            .filter(
              (i) =>
                i.category?.toLowerCase() ===
                  fetchedItem.category?.toLowerCase() && i.id !== id,
            )
            .slice(0, 4);
          setRelated(relatedItems);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    if (!checkAuth()) return;
    dispatch(addItems({ ...item, quantity }));
    toast.success(`${item.name} x${quantity} added to cart!`);
  };    

  if (loading) return (
  <div className="min-h-screen bg-(--bg-color) px-4 py-10 md:px-10 lg:px-20 animate-pulse">
    
    {/* Back button skeleton */}
    <div className="h-5 w-16 bg-gray-200 rounded-full mb-6" />

    <div className="flex flex-col md:flex-row gap-8 lg:gap-16">

      {/* Image skeleton */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[420px] bg-gray-200 rounded-xl" />

      {/* Info skeleton */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
        
        {/* Category badge */}
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        
        {/* Title */}
        <div className="h-10 w-3/4 bg-gray-200 rounded-lg" />
        
        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>

        {/* Price */}
        <div className="h-8 w-24 bg-gray-200 rounded-lg" />

        {/* Quantity selector */}
        <div className="h-10 w-36 bg-gray-200 rounded-full" />

        {/* Button */}
        <div className="h-12 w-40 bg-gray-200 rounded-full" />
      </div>
    </div>

    {/* Related items */}
    <div className="mt-16">
      <div className="h-7 w-48 bg-gray-200 rounded-lg mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[215px] md:h-60 lg:h-[290px] bg-gray-200 rounded-md" />
        ))}
      </div>
    </div>
  </div>
);

  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center text-(--text-color)">
        Item not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-(--bg-color) px-4 py-10 md:px-10 lg:px-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-(--text-color) hover:text-(--button-bg-color) transition-all duration-300"
      >
        ← Back
      </button>

      {/* Item Detail */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        {/* Image */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg h-[300px] md:h-[420px]">
          <img
            src={item.image || placeholder}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
          {/* Category Badge */}
          <span className="w-fit bg-(--button-bg-color) text-white text-sm px-3 py-1 rounded-full capitalize">
            {item.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-(--text-color) capitalize">
            {item.name}
          </h1>

          {/* Description */}
          <p className="text-(--text-color) text-base md:text-lg leading-relaxed">
            {item.description}
          </p>

          {/* Price */}
          <p className="text-2xl font-bold text-(--button-bg-color)">
            Rs. {item.price}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-(--text-color) font-medium">Quantity:</span>
            <div className="flex items-center gap-3 border border-(--text-color)/20 rounded-full px-4 py-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-xl font-bold text-(--text-color) hover:text-(--button-bg-color) transition"
              >
                −
              </button>
              <span className="text-(--text-color) font-semibold w-4 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-xl font-bold text-(--text-color) hover:text-(--button-bg-color) transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full md:w-fit px-8 py-3 text-base font-semibold"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Related Items */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-(--text-color) mb-6">
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((relItem) => (
              <Card
                key={relItem.id}
                image={relItem.image}
                title={relItem.name}
                description={
                  relItem.description.substring(0, descLimit) + "..."
                }
                price={relItem.price}
                buttonText="Add to Cart"
                titleClass="text-[var(--light-color)]"
                descriptionClass="text-[var(--light-color)]"
                buttonClass="hover:bg-transparent hover:text-[var(--light-color)]"
                onClick={() => navigate(`/item/${relItem.id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
