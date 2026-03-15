import { useState } from "react";
import heroSectionReservation from "../../assets/images/Reservation-hero.webp";
import reservationFormImge from "../../assets/images/reservation-form-image.webp";
import { createReservation } from "../../firebase/reservation";
import toast from "react-hot-toast";
import useRequireAuth from "../../hook/useRequireAuth";
import { PhoneInput } from "../../components/component_index.js";
import { useSelector } from "react-redux";

function Reservation() {
  const user = useSelector((state)=>state.user.user)
  const [loading, setLoading] = useState(false);
  const checkAuth = useRequireAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2 People");
  const [specialRequest, setSpecialRequest] = useState("");
  const [showError, setShowError]= useState(false)

  const handleReservation = async (e) => {
    e.preventDefault();
    
    if (phone.length !==11){
      setShowError(true)
      return
    }else{
      setShowError(false)
    }
    setLoading(true);

    if (!checkAuth()) {
      setLoading(false);
      return;
    }

    try {
      await createReservation(
        name,
        email,
        phone,
        date,
        time,
        guests,
        specialRequest,
        user,
      );
      toast.success("Your reservation has been submitted successfully!");
      //  Reset form after submission
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setGuests("2 People");
      setSpecialRequest("");

    } catch (error) {
      console.error("Error submitting reservation:", error);
      toast.error("Failed to submit reservation. Please try again.");
      setLoading(false);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* hero section */}
      <div
        className="flex bg-cover bg-center h-[45vh] md:h-[55vh] lg:h-[60vh] w-full relative gradient-overlay"
        style={{ backgroundImage: `url(${heroSectionReservation})` }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full z-10 gap-4">
          <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold text-center text-white">
            Book Your Table
          </h1>
          <p className="lg:text-xl md:text-xl text-lg text-center w-[300px] text-white">
            Reserve your table and enjoy our exquisite menu.
          </p>
        </div>
      </div>

      {/* Reservation form section */}
      <section className="flex md:flex-row flex-col-reverse gap-5 md:gap-8 lg:gap-10 justify-center items-center py-[30px] md:py-[50px] lg:py-20 px-5 lg:px-[50px] md:px-[30px] bg-(--bg-color)">
        {/* Image Section */}
        <div className="w-full">
          <img
            src={reservationFormImge}
            alt="Reservation"
            className="rounded-md"
          />
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleReservation}
          className="w-full bg-white p-6 lg:p-8 rounded-md shadow-lg space-y-6"
        >
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="full_name"
                id="full_name"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-(--button-hover-bg-color) peer"
                required
              />
              <label
                htmlFor="full_name"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Full Name
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-(--button-hover-bg-color) peer"
                required
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email Address
              </label>
            </div>
          </div>

          {/* Row 2: Phone & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative z-0 w-full group">
              <PhoneInput
                value={phone}
                setValue={setPhone}
                showError={showError}
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-(--button-hover-bg-color) peer"
                required
              />
              <label
                htmlFor="phone"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="date"
                name="date"
                id="date"
                placeholder=" "
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-(--button-hover-bg-color) peer"
                required
              />
              <label
                htmlFor="date"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Date
              </label>
            </div>
          </div>

          {/* Row 3: Time & Guests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative z-0 w-full group">
              <input
                type="time"
                name="time"
                id="time"
                placeholder=" "
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-(--button-hover-bg-color) peer"
                required
              />
              <label
                htmlFor="time"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Time
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <select
                name="guests"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="block py-2.5 px-0 w-full md:max-w-30 lg:max-w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-(--button-hover-bg-color) peer"
                required
              >
                <option>2 People</option>
                <option>3 People</option>
                <option>4 People</option>
                <option>5 People</option>
                <option>6 People</option>
                <option>7 People</option>
                <option>8 People</option>
              </select>
              <label
                htmlFor="guests"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Number of Guests
              </label>
            </div>
          </div>

          {/* Row 4: Special Request */}
          <div className="relative z-0 w-full group">
            <textarea
              name="special_request"
              id="special_request"
              placeholder=" "
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-(--button-hover-bg-color) peer"
            ></textarea>
            <label
              htmlFor="special_request"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Special Request
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-(--button-bg-color) hover:text-(--button-hover-text-color) border border-(--button-bg-color) hover:border-(--button-hover-bg-color) hover:bg-transparent font-medium rounded-lg text-sm px-4 py-3 focus:outline-none shadow-md"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              </span>
            ) : (
              "Confirm Reservation"
            )}
          </button>
        </form>
      </section>
    </>
  );
}

export default Reservation;