import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData) {
    return <span className="text-gray-100">No Hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-100">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex  text-white text-xl font-bold p-2 hover:bg-blue-800 rounded-lg"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-blue-600 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold text-white">{hotel.name}</h2>
            <div className="whitespace-pre-line text-white">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-blue-600 rounded-sm p-3 flex items-center text-white">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-blue-600 rounded-sm p-3 flex items-center text-white">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-blue-600 rounded-sm p-3 flex items-center text-white">
                <BiMoney className="mr-1" />₹{hotel.pricePerNight} per night
              </div>
              <div className="border border-blue-600 rounded-sm p-3 flex items-center text-white">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-blue-600 rounded-sm p-3 flex items-center text-white">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded-lg"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;