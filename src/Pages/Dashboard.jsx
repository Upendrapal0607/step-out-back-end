import React, { useEffect, useState } from "react";
import { GetContextValue } from "../ContextProvider/TrainContext";
import { CancelBookedTrain, GetBookedTrain } from "../Controller/Controller";
import { Loader } from "../Components/Loader";
import { Spinner, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { userDetails } = GetContextValue();
  const [bookedTrain, setBookedTrain] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [Trainid, setTrainId] = useState(null);
  const toast = useToast();

  const GetAllTerain = async () => {
    // setLoading(true);
    try {
      const traindata = await GetBookedTrain({ userId: userDetails?.email });
      setBookedTrain(traindata.data.data);
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
    }
  };

  useEffect(() => {
    GetAllTerain();
  }, []);

  const handleCancelBooking = async (id) => {
    try {
      setTrainId(id);
      const Data = await CancelBookedTrain(id);
      console.log(Data.data.message);
      if (Data?.data?.message == "Train has been canceled") {
        setTrainId(null);
        toast({
          title: "Cancel Success",
          description: "You are successfully canceled train",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      } else {
        setTrainId(null);
        toast({
          title: "Cancel Failed",
          description: "Sorry we are not able to cancel",
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      }
      GetAllTerain();
    } catch (error) {
      setTrainId(null);
  
      toast({
        title: "Cancel Failed",
        description: error?.message,
        status: "error",
        duration: 7000,
        isClosable: true,
      });

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

        {bookedTrain.length <= 0 ? (
          <div className="mt-4 ">
            <div className="text-center font-bold text-xl pt-8 mb-10">You Haven't Booked any train yet</div>
            <Link to={"/"} className="md:w-36 w-full  bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">Book now</Link>
          </div>
        ) : (
          <div className="bg-white m-auto w-full mt-10 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Booke train</h2>
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
                      <p className="text-gray-600">
                        {train?.train_details?.train_number}
                      </p>
                      <button
                        onClick={() => handleCancelBooking(train?._id)}
                        className="md:w-36 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                      >
                        {Trainid !== train?._id ? "Cancel" : "Wait..."}
                      </button>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">
                        From: {train?.train_details?.source}
                      </p>
                      <p className="text-sm text-gray-500">
                        To: {train?.train_details?.destination}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">
                        Departure:{" "}
                        {train?.train_details?.arrival_time_at_source}
                      </p>
                      <p className="text-sm text-gray-500">
                        Arrival:{" "}
                        {train?.train_details?.arrival_time_at_destination}
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
