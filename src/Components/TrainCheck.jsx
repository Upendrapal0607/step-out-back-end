import React, { useState } from "react";
import { GetContextValue } from "../ContextProvider/TrainContext";
import { GetAllTrain } from "../Controller/Controller";
// import { GetAttTrain } from '../Controller/Controller';

function TrainCheck() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const [trainId, setTrainId] = useState("");
  const { setTrainList } = GetContextValue();

  const handleCheckTrain = async (e) => {
    e.preventDefault();
    const trainData = {
      source: source.toLocaleLowerCase(),
      destination: destination.toLowerCase(),
      date,
    };
    try {
      const data = await GetAllTrain(trainData);
      console.log(data);
      setTrainList(data?.data?.data);
    } catch (error) {
      alert(error.message);
    }
  };
  const FindByTrainID = async (e) => {
    e.preventDefault();
    const trainData = {
      train_number: trainId,
    };

    try {
      const data = await GetAllTrain(trainData);
      console.log(data);
      setTrainList(data?.data?.data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="  m-auto w-full p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">
        Check Train Availability
      </h2>
      <div className="w-full flex justify-between items-center md:flex-row gap-8 flex-col">
        <form
          className=" md:justify-center space-y-4 md:w-[60%] md:gap-2 gap-0 w-full md:items-center flex md:flex-row flex-col"
          onSubmit={handleCheckTrain}
        >
          <div>
            <input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              type="text"
              id="from"
              className="mt-[20px] block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              placeholder="Enter departure station"
            />
          </div>
          <div className="">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              id="to"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              placeholder="Enter destination station"
            />
          </div>
          <div>
            <input
              value={date}
              type="date"
              id="date"
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="md:w-36 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Check Availability
          </button>
        </form>
        <form
          className="space-y-4 md:justify-center md:w-[35%] md:gap-2 gap-0 w-full md:items-center flex md:flex-row flex-col"
          onSubmit={FindByTrainID}
        >
          <div>
            <input
              value={trainId}
              onChange={(e) => setTrainId(e.target.value)}
              type="number"
              id="from"
              className="mt-[20px] block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
              placeholder="Enter train Number"
            />
          </div>
          <button
            type="submit"
            className="md:w-36 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Find
          </button>
        </form>
      </div>
    </div>
  );
}

export default TrainCheck;
