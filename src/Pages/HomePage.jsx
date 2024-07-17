import React from "react";
import TrainCheck from "../Components/TrainCheck";
import TicketBooking from "../Components/TicketBooking";
import { TrainList } from "../Components/TrainList";

export const HomePage = () => {
  return (
    <main
      className=" bg-center min-h-screen"
      style={{
        backgroundImage:
          'url("https://png.pngtree.com/png-vector/20240506/ourmid/pngtree-modern-bullet-train-png-image_12370412.png")',
      }}
    >
      <TrainCheck />
      <TrainList />
    </main>
  );
};
