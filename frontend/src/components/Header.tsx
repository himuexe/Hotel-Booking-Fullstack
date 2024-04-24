import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
export default function Header() {
  const { isLoggedin } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between ">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Vacays.com</Link>
        </span>
        <span className="flex space-x-2 ">
          {isLoggedin ? (
            <>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/my-hotels">My Hotels</Link>
              <button>Sign Out</button>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-blue-600 px-3 hover:bg-gray-100 bg-white font-bold"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}
