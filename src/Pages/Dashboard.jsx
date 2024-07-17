import React, { useEffect, useState } from "react";
import { GetContextValue } from "../ContextProvider/TrainContext";
import { CancelBookedTrain, GetBookedTrain } from "../Controller/Controller";
import { Loader } from "../Components/Loader";
import { Spinner } from "@chakra-ui/react";

export const Dashboard = () => {
  const { userDetails } = GetContextValue();
  const [bookedTrain, setBookedTrain] = useState([]);
  const [loading, setLoading] = useState(false);
  const GetAllTerain = async () => {
    setLoading(true);
    try {
      const traindata = await GetBookedTrain({ userId: userDetails?.email });
      setBookedTrain(traindata.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllTerain();
  }, []);

  const handleCancelBooking = async (id) => {
    try {
      const Data = await CancelBookedTrain(id);
      GetAllTerain();
    } catch (error) {
      alert(error?.message);
      console.log(error);
    }
  };
  return (
    <div>
      <main
        className=" bg-center min-h-screen"
        style={{
          backgroundImage:
            'url("https://png.pngtree.com/png-vector/20240506/ourmid/pngtree-modern-bullet-train-png-image_12370412.png")',
        }}
      >
        <div className="font-bold text-3xl pt-8">
          <h1>
            Welcome {userDetails.username} here you all booking train and
            Update.
          </h1>
        </div>

        {loading ? (
          <div>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        ) : bookedTrain.length <= 0 ? (
          <div>
            <div className="text-center">No Train available</div>
          </div>
        ) : (
          <div className="bg-white m-auto w-full mt-10 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Train Availability</h2>
            <div className="space-y-4">
              {bookedTrain.map((train, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">
                        {train?.train_name}
                      </h3>
                      <p className="text-gray-600">{train?.train_number}</p>
                      <button
                        onClick={() => handleCancelBooking(train?._id)}
                        className="md:w-36 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">
                        From: {train?.source}
                      </p>
                      <p className="text-sm text-gray-500">
                        To: {train?.destination}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">
                        Departure: {train?.arrival_time_at_source}
                      </p>
                      <p className="text-sm text-gray-500">
                        Arrival: {train?.arrival_time_at_destination}
                      </p>
                      <p className="text-sm text-gray-500">Your seat: 32</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
