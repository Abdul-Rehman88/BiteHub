import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItems, updateItems, clearCart } from "../../store/Cart.js";
import toast from "react-hot-toast";
import { Button, PhoneInput } from "../../components/component_index.js";
import { Link } from "react-router-dom";
import order from "../../firebase/order.js";
import { clearCartFromFirebase } from "../../store/Cart.js";
import { DataTable, StatCardSkeleton } from "../../admin/components/adminComponentIndex.js";
import { TableSkeleton } from "../../admin/components/adminComponentIndex.js"; // import TableSkeleton
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

function Cart() {
  const user = useSelector((state) => state.user.user);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const cartItems = useSelector((state) => state.cart.items) || [];
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const dispatch = useDispatch();

  // fetch user's orders from Firebase in real-time
useEffect(() => {
  if (!user?.uid) {
    setUserOrders([]);
    setOrdersLoading(false);
    return;
  }

  const q = query(
    collection(db, "orders"),
    where("user.uid", "==", user.uid),
    orderBy("orderTime", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      orderTime: doc.data().orderTime?.toDate?.()?.toLocaleString() || "—",
    }));
    setUserOrders(orders);
    setOrdersLoading(false);
  });

  return () => unsubscribe();
}, [user]);

  // totals
  const subTotal = cartItems.length
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;
  const deliveryFee = cartItems.length ? 150 : 0;
  const total = subTotal + deliveryFee;

  // remove item from cart
  const handleRemoveFromCart = (item) => {
    dispatch(removeItems(item));
    toast.success(`${item.name} Remove successfully`);
  };

  // add quantity in cart
  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.quantity) {
      toast.success(`${item.name} quantity increased!`);
    } else if (newQuantity < item.quantity) {
      toast.success(`${item.name} quantity decreased!`);
    }
    dispatch(updateItems({ ...item, quantity: newQuantity }));
  };

  // order the food
  const handleOrderSubmit = async () => {
    let missingFields = [];
    if (!phone) missingFields.push("Phone Number");
    if (!address) missingFields.push("Address");

    if (missingFields.length > 0) {
      toast.error(`Please add: ${missingFields.join("& ")}`);
      return;
    }
    if (phone.length !== 11) {
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }

    setLoading(true);
    try {
      await order(cartItems, total, phone, address, user);
      dispatch(clearCart());
      dispatch(clearCartFromFirebase());
      setPhone("");
      setAddress("");
    } catch (error) {
      toast.error("Something went wrong while placing the order", error);
    } finally {
      setLoading(false);
    }
  };

  // DataTable column definitions
  const orderColumns = [
    {
      key: "orderTime",
      label: "Date & Time",
    },
    {
      key: "items",
      label: "Items",
      render: (items) =>
        items?.map((i) => `${i.name} ×${i.quantity}`).join(", ") || "—",
    },
    {
      key: "total",
      label: "Total",
      render: (val) => `Rs. ${val}`,
    },
    {
      key: "phoneNumber",
      label: "Phone",
    },
    {
      key: "address",
      label: "Address",
    },
    {
  key: "status",
  label: "Status",
  render: (val) => {
    const styles = {
      preparing: {
        dot: "bg-yellow-400",
        badge: "bg-yellow-50 text-yellow-800 border border-yellow-200",
      },
      completed: {
        dot: "bg-green-400",
        badge: "bg-green-50 text-green-800 border border-green-200",
      },
      canceled: {
        dot: "bg-red-500",
        badge: "bg-red-50 text-red-800 border border-red-200",
      },
    };

    const style = styles[val] || {
      dot: "bg-gray-400",
      badge: "bg-gray-50 text-gray-700 border border-gray-200",
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.badge}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
        {val}
      </span>
    );
  },
},
  ];

  return (
    <>
      {/* hero section */}
      <div className="flex justify-center items-center px-5 lg:px-[50px] md:px-[30px] py-[30px] md:py-[50px] lg:py-20 bg-(--bg-color)">
        <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold text-center text-(--heading-color)">
          Your Cart
        </h1>
      </div>

      {/* MAIN CONDITION */}
      {cartItems.length === 0 ? (
        /* EMPTY STATE */
        <div className="flex justify-center items-center py-20 bg-(--light-color)">
          <p className="text-center text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        /* FULL CART */
        <div className="relative flex flex-col md:flex-row gap-5 md:gap-6 lg:gap-10 justify-between items-start py-[30px] md:py-[50px] lg:py-20 px-5 lg:px-[50px] md:px-[30px] bg-(--light-color)">
          {/* order cart */}
          <div className="w-full md:w-4/6 bg-white p-6 lg:p-8 rounded-lg shadow-lg space-y-6">
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-200 pb-2"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-md"
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-(--heading-color)">{item.name}</span>
                      <span className="font-semibold text-(--button-hover-text-color)">
                        Rs. {item.price}
                      </span>
                      <button
                        onClick={() => handleRemoveFromCart(item)}
                        className="text-red-500 text-left hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <input
                    className="w-12 text-center border border-gray-300 rounded-md"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item, parseInt(e.target.value) || 1)
                    }
                  />
                </li>
              ))}
            </ul>

            {/* Delivery Details */}
            <div>
              <h4 className="text-xl font-semibold text-(--heading-color) mb-4">
                Delivery Details
              </h4>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <PhoneInput
                    value={phone}
                    setValue={setPhone}
                    showError={showError}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-(--button-hover-bg-color)"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-(--button-hover-bg-color)"
                    placeholder="Enter your delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* order Summary */}
          <div className="w-full md:w-2/6 bg-white p-6 lg:p-8 rounded-lg shadow-lg space-y-6 sticky top-1">
            <h4 className="text-xl font-semibold text-(--heading-color)">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-[15px] lg:text-[16px]">
                <span>Subtotal:</span>
                <span>Rs. {subTotal}</span>
              </div>
              <div className="flex justify-between text-[15px] lg:text-[16px]">
                <span>Delivery:</span>
                <span>Rs. {deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold text-[16px] lg:text-[18px]">
                <span>Total:</span>
                <span>Rs. {total}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleOrderSubmit}
                className="w-full text-(--white-color) hover:text-(--button-text-color) hover:bg-transparent"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  </span>
                ) : (
                  "Place Order"
                )}
              </Button>
              <p className="text-xs text-gray-400">Estimated delivery time: 30-45 minutes</p>
            </div>
          </div>
        </div>
      )}

      {/* load the order table */}
      <div className="py-[30px] md:py-[50px] lg:py-20 px-5 lg:px-[50px] md:px-[30px] bg-(--bg-color)">
        <h2 className="text-2xl md:text-3xl font-bold text-(--heading-color) mb-2">
          My Orders
        </h2>
        <p className="text-sm text-gray-400 mb-6">Track all your past and current orders</p>

        {ordersLoading ? (
          <TableSkeleton rows={4} cols={6} />
        ) : userOrders.length === 0 ? (
          <div className="flex justify-center items-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-gray-400 text-sm">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <DataTable
            title={`${userOrders.length} Order${userOrders.length > 1 ? "s" : ""} Found`}
            columns={orderColumns}
            rows={userOrders}
          />
        )}
      </div>
    </>
  );
}

export default Cart;