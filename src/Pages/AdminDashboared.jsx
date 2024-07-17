import React, { useState } from "react";
import { GetContextValue } from "../ContextProvider/TrainContext";
import { AddNewTrainUpdate, GetAllTrain } from "../Controller/Controller";
import { TrainList } from "../Components/TrainList";
export const AdminDashboared = () => {
  const [trainDetails, setTrainDetails] = useState({
    arrival_time_at_destination: "",
    arrival_time_at_source: "",
    destination: "",
    seat_opacity: 60,
    seats_available: 60,
    source: "",
    train_name: "",
    train_number: "",
  });

  const { setTrainList, trainList } = GetContextValue();
  // console.log(trainDetails);
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setTrainDetails({
      ...trainDetails,
      [name]:
        name == "source" || name == "destination" ? value.toLowerCase() : value,
    });
  };

  const HandleSubmitTrain = async (e) => {
    e.preventDefault();
    console.log("Details",trainDetails);
    try {
     const response =  await AddNewTrainUpdate(trainDetails);
     if(response?.data?.message=="Train has been saved successfully"){

       alert(response?.data?.message);
       const data = await GetAllTrain();
       setTrainList(data?.data?.data);
     }
     else{
       alert(response?.data?.message);
     }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="  m-auto w-full p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Check Train Availability</h2>
      <div className="w-full flex justify-between items-center md:flex-row gap-8 flex-col">
        <form
          className=" lg:justify-center space-y-4 md:gap-2 gap-0 w-full lg:items-center flex lg:flex-row flex-col"
          onSubmit={HandleSubmitTrain}
        >
          <div>
            <input
              value={trainDetails.source}
              onChange={HandleChange}
              type="text"
              id="from"
              name="source"
              className="mt-[20px] block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              placeholder="Enter departure station"
            />
          </div>
          <div className="">
            <input
              type="text"
              value={trainDetails.destination}
              onChange={HandleChange}
              name="destination"
              id="to"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              placeholder="Enter destination station"
            />
          </div>
          <div>
            <input
              type="text"
              value={trainDetails.train_name}
              onChange={HandleChange}
              name="train_name"
              placeholder="Train Name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="">
            <input
              type="text"
              value={trainDetails.train_number}
              onChange={HandleChange}
              name="train_number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              placeholder="Train Number"
            />
          </div>

          <div className="">
            <input
              type="number"
              value={trainDetails.seat_opacity}
              onChange={HandleChange}
              name="seat_opacity"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              placeholder="Total Seats"
            />
          </div>

          <div className="">
            <input
              type="number"
              value={trainDetails.seats_available}
              onChange={HandleChange}
              name="seats_available"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              placeholder="Available Seats"
            />
          </div>

          <div className="">
            <input
              type="time"
              value={trainDetails.arrival_time_at_source}
              onChange={HandleChange}
              name="arrival_time_at_source"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              placeholder="Update arrival time at source"
            />
          </div>
          <div className="">
            <input
              type="time"
              value={trainDetails.arrival_time_at_destination}
              onChange={HandleChange}
              name="arrival_time_at_destination"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              placeholder="Update arrival time at destination"
            />
          </div>

          <button
            type="submit"
            className="md:w-36 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Add Train
          </button>
        </form>
      </div>
      <main className=" bg-center min-h-screen">
        {/* <TrainCheck /> */}
        <TrainList />
      </main>
    </div>
  );
};
