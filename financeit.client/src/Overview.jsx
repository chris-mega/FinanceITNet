import React from "react";
import Sheet from "./Sheet";

const data = [
  {
    key: "0",
    name: "Rent",
    amount: 100,
    date: "2024/04/01",
  },
  {
    key: "1",
    name: "Vicky's rent",
    amount: 100,
    date: "2024/05/01",
  },
];

const Overview = () => <Sheet data={data} withOp={false} />;

export default Overview;
