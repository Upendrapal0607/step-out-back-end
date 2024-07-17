import React, { useEffect, useState } from "react";
// import { GetAttTrain } from '../Controller/Controller';
import { GetContextValue } from "../ContextProvider/TrainContext";
import { BookedTrain, GetAllTrain } from "../Controller/Controller";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export const TrainList = () => {
  const { setTrainList, trainList, userDetails } = GetContextValue();
  const [loading, setLoading] = useState(false);
  console.log();
  const navigate = useNavigate();

  useEffect(() => {
    const GetTrainList = async () => {
      setLoading(true);
      try {
        const data = await GetAllTrain();
        console.log(data);
        setTrainList(data?.data?.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(error.message);
      }
    };

    GetTrainList();
  }, []);
  const handleBooking = async (train, checkSeat) => {
    if (checkSeat <= 0) alert("Seat is not available!");
    else {
      if (userDetails?.userid) {
        const data = await BookedTrain({
          userId: userDetails?.email,
          train_details: train,
        });
        console.log(data);
      } else {
        navigate("/login");
      }
    }
  };

  return loading ? (
    <div>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  ) : trainList.length <= 0 ? (
    <div>
      <div className="text-center">No Train available</div>
    </div>
  ) : (
    <div className="bg-white m-auto w-full mt-10 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Train Availability</h2>
      <div className="space-y-4">
        {trainList.map((train, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-medium">{train.train_name}</h3>
                <p className="text-gray-600">{train.train_number}</p>
                <button
                  onClick={() => handleBooking(train, train.seats_available)}
                  className="md:w-36 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                  Book Now
                </button>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">From: {train.source}</p>
                <p className="text-sm text-gray-500">To: {train.destination}</p>
                <p className="text-sm text-gray-500">
                  Available seate: {train.seats_available}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  Departure: {train.arrival_time_at_source}
                </p>
                <p className="text-sm text-gray-500">
                  Arrival: {train.arrival_time_at_destination}
                </p>
                <p className="text-sm text-gray-500">
                  Total Seate: {train.seat_opacity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
