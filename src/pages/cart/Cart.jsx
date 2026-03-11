import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateitem } from "../../store/Cart.js";
import toast from "react-hot-toast";
import Button from "../../components/button/Button.jsx";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart.item) || [];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // safe totals
  const subTotal = cartItems.length
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const deliveryFee = cartItems.length ? 150 : 0;
  const total = subTotal + deliveryFee;

  const handleRemoveFromCart = (item) => {
    dispatch(removeItem(item));
    toast.success (`${item.name} Remove successfully`)
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return; // prevent below 1

    if (newQuantity > item.quantity) {
      toast.success(`${item.name} quantity increased!`);
    } else if (newQuantity < item.quantity) {
      toast.success(`${item.name} quantity decreased!`);
    }

    dispatch(updateitem({ ...item, quantity: newQuantity }));
  };

  if (!user) {
        return (
            <div className="text-center py-20">
                <p className="text-lg text-gray-500">Please login to view your cart</p>
                <Link to="/LogIn" className="mt-4 inline-block bg-[#FFB703] px-6 py-2 rounded-full transition-all duration-150
                  active:scale-95 active:translate-y-0.5 hover:bg-transparent text-(--white-color) hover:text-(--button-text-color) 
                  border border-[#FFB703] hover:border-[#E09A05]">
                    Sign In
                </Link>
            </div>
        );
    }


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
          <div className=" w-full md:w-4/6 bg-white p-6 lg:p-8 rounded-lg shadow-lg space-y-6">
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
                      <span className="font-bold text-(--heading-color)">
                        {item.name}
                      </span>
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
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="w-full border border-gray-300  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-(--button-hover-bg-color)"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2.5  focus:outline-none focus:ring-2 focus:ring-(--button-hover-bg-color)"
                    placeholder="Enter your delivery address"
                  />
                </div>

              </form>
            </div>
          </div>

          {/* order Summary */}
          <div className="w-full md:w-2/6 bg-white p-6 lg:p-8 rounded-lg shadow-lg space-y-6 sticky top-1">
            <h4 className="text-xl font-semibold text-(--heading-color)">
              Order Summary
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between text-[15px] lg:text-[16px]">
                <span>Subtotal:</span>
                <span>Rs. {subTotal}</span>
              </div>

              <div className="flex justify-between text-[15px] lg:text-[16px]">
                <span>Delivery:</span>
                <span>Rs. {deliveryFee}</span>
              </div>

              <div className="flex justify-between font-bold text-[16px] lg:text-[18px] ">
                <span>Total:</span>
                <span>Rs. {total}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">

            <Button className="w-full text-(--white-color) hover:text-(--button-text-color) hover:bg-transparent">Place Order</Button>
            <p className="text-xs text-gray-400">Estimated delivery time: 30-45 minutes</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
