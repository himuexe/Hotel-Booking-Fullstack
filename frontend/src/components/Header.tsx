import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignoutButton from "./SignoutButton";
export default function Header() {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="py-6">
      <div className="container mx-auto flex justify-between ">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Vacays.com</Link>
        </span>
        <span className="flex space-x-2 ">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="flex items-center text-white px-3 font-bold hover:bg-blue-900  rounded-lg">My Bookings</Link>
              <Link to="/my-hotels" className="flex items-center text-white px-3 font-bold hover:bg-blue-900  rounded-lg" >My Hotels</Link>
              <SignoutButton/>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-white px-3   font-bold rounded-lg hover:bg-blue-900 hover:text-white "
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}
