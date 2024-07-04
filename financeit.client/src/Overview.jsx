import React from "react";
import Sheet from "./Sheet";
import { Card, Divider, Flex } from "antd";

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
    date: "2024/05/02",
  },
];

const Overview = () => (
  <Flex justify="space-between">
    <Card title="Upcoming expenses">
      <Sheet data={data} withOp={false} />
      <Divider />
      <Sheet data={data} withOp={false} />
    </Card>
  </Flex>
);

export default Overview;
