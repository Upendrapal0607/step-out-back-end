import axios from "axios";
const bashUrl = "http://localhost:8080/";
const token = JSON.parse(localStorage.getItem("trailtoken")) || "";

export const ResisterUser = async (payload) => {
  try {
    return await axios.post(`${bashUrl}adminusers/register`, payload);
  } catch (error) {
    return {
      error,
      message: "error getting",
    };
  }
};

export const LoginUser = async (payload) => {
  try {
    return await axios.post(`${bashUrl}adminusers/login`, payload);
  } catch (error) {
    return {
      error,
      message: "error getting",
    };
  }
};

export const GetAllTrain = async (payload) => {
  try {
    return await axios.post(`${bashUrl}admin/gettrain`, payload);
  } catch (error) {
    return {
      error,
      message: "error getting",
    };
  }
};

export const AddNewTrainUpdate = async (payload) => {
  try {
    const data = await axios.post(`${bashUrl}admin/train`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Inside controller", data);
    return data;
  } catch (error) {
    console.log({ error });
    return {
      error,
      message: "error getting",
    };
  }
};

export const BookedTrain = async (payload) => {
  try {
    return await axios.post(`${bashUrl}user/booking`, payload);
  } catch (error) {
    return { error };
  }
};
export const GetBookedTrain = async (payload) => {
  try {
    return await axios.post(`${bashUrl}user/getbooking`, payload);
  } catch (error) {
    return { error };
  }
};

export const CancelBookedTrain = async (id) => {
  try {
    return await axios.delete(`${bashUrl}user/cancel/${id}`);
  } catch (error) {
    return { error };
  }
};
// headers:{Authorization: `Bearer `}
