import React, { useState } from "react";
import Sheet from "./Sheet";
import { Tabs } from "antd";
import dayjs from "dayjs";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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
    date: "2024/04/01",
  },
];

const threeMonths = (currMonth) => {
  return new Array(3).fill(null).map((_, i) => {
    const monthIndex = (currMonth - i + 12) % 12;
    return {
      label: months[monthIndex],
      key: monthIndex,
      children: monthIndex === currMonth ? <Sheet data={data} /> : <p>...</p>,
      closable: false,
    };
  });
};

const initialItems = threeMonths(dayjs().month());

const History = () => {
  const [items, setItems] = useState(initialItems);
  const [activeKey, setActiveKey] = useState(initialItems[0].key);

  const onChange = (key) => {
    setActiveKey(key);
  };

  const add = () => {
    const lastMonth = items[items.length - 1].key;
    const newPanes = [...items, ...threeMonths(lastMonth - 1)];
    setItems(newPanes);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    }
  };

  return (
    <Tabs
      onChange={onChange}
      type="editable-card"
      activeKey={activeKey}
      items={items}
      onEdit={onEdit}
    />
  );
};

export default History;
