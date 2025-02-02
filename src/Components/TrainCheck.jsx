import React, { useState } from "react";
import { GetContextValue } from "../ContextProvider/TrainContext";
import { GetAllTrain } from "../Controller/Controller";
import { useToast } from "@chakra-ui/react";
// import { GetAttTrain } from '../Controller/Controller';
import city from "../db.json";

function TrainCheck() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const [trainId, setTrainId] = useState("");
  const { setTrainList } = GetContextValue();
  const toast = useToast();

  const handleCheckTrain = async (e) => {
    e.preventDefault();
    const trainData = {
      source: source.toLocaleLowerCase(),
      destination: destination.toLowerCase(),
      date,
    };
    try {
      const data = await GetAllTrain(trainData);

      setTrainList(data?.data?.data);
    } catch (error) {
      toast({
        title: "Error accessing train",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
      toast({
        title: "Error accessing train",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
          <div className="mt-[20px]">
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              type="text"
              id="from"
              className="block w-full py-[10px] px-4 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Source</option>
              {city?.city?.map((item) => (
                <option value={item?.name} key={item?.name}>
                  {item?.name}
                </option>
              ))}
        
            </select>
          </div>
          
          <div className="mt-[20px]">
            <select
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              id="to"
              className="block w-full py-[10px] px-4 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Destination</option>
              {city?.city?.map((item) => (
                <option value={item?.name} key={item?.name}>
                  {item?.name}
                </option>
              ))}
          
            </select>
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
