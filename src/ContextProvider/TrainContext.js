import React, { createContext, useContext, useState } from "react";
export const TrainContextProvider = createContext();
export const TrainContext = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [trainList, setTrainList] = useState([]);
  const [loginType, SetLoginType] = useState("user");

  return (
    <TrainContextProvider.Provider
      value={{
        isAuth,
        setTrainList,
        trainList,
        setIsAuth,
        loginType,
        SetLoginType,
        setUserDetails,
        userDetails,
      }}
    >
      {children}
    </TrainContextProvider.Provider>
  );
};
export const GetContextValue = () => {
  return useContext(TrainContextProvider);
};
