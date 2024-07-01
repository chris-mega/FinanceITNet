import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Typography,
  DatePicker,
  InputNumber,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const defaultColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    inputType: "text",
    editable: true,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    inputType: "number",
    editable: true,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    inputType: "date",
    editable: true,
    render: (_, { date }) => <>{dayjs(date).format("MMM DD, YYYY")}</>,
  },
];

const frequency = {
  title: "Frequency",
  dataIndex: "frequency",
  key: "frequency",
  inputType: "text",
  editable: true,
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  var inputNode;
  switch (inputType) {
    case "number":
      inputNode = <InputNumber />;
      break;
    case "date":
      inputNode = (
        <DatePicker
          format={{
            format: "MMM DD, YYYY",
            type: "mask",
          }}
        />
      );
      break;
    default:
      inputNode = <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
          getValueProps={(value) => ({
            value: value && inputType === "date" ? dayjs(value) : value,
          })}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Sheet = ({ data, type, withOp = true }) => {
  const [form] = Form.useForm();
  const [count, setCount] = useState(data.length);
  const [dataSource, setDataSource] = useState(data);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      name: " ",
      amount: " ",
      date: dayjs(),
    };
    if (type === "frequency") newData["frequency"] = " ";
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  var dataColumns = [];

  const edit = (record) => {
    form.setFieldsValue({ name: "", amount: "", date: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  switch (type) {
    case "frequency":
      dataColumns = [...defaultColumns, frequency];
      break;
    default:
      dataColumns = [...defaultColumns];
  }

  if (withOp) {
    dataColumns.push({
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    });
  }

  const columns = dataColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editing: isEditing(record),
        inputType: col.inputType,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowClassName="editable-row"
        bordered
        columns={columns}
        dataSource={dataSource}
        pagination={{
          onChange: cancel,
        }}
      />
      {withOp ? (
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
      ) : null}
    </Form>
  );
};

export default Sheet;
