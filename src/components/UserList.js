import { Button, Divider, Flex, Form, Input, Radio, Table } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import apiConfig from "../config/apiConfig";
import useListPage from "../customize/useListPage";

// const columns = (onDeleteUser) => [
const columns = (renderAction) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, { firstName, lastName }) => (
      <>
        {firstName} {lastName}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: renderAction,
  },
];

const preprocessData = (users) => {
  return users.map((user) => {
    return {
      ...user,
      key: user.id,
    };
  });
};

const UsersList = () => {
  const [page, setPage] = useState(1);
  const { data, pagination, loading, renderAction, handleFilter } = useListPage(
    {
      apiObject: apiConfig.user,
      page,
    }
  );
  const [form] = Form.useForm();
  const [user, setUser] = useState({});

  const dataSource = preprocessData(data);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleReset = () => {
    setUser({});
    handleFilter.user(user);
    form.resetFields();
    // navigate(0);
  };

  const handleSearch = () => {
    // console.log(user);
    handleFilter.user(user);
  };

  const handleFirstNameChange = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      firstName: value,
    }));
  };

  const handleLastNameChange = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      lastName: value,
    }));
  };

  const handleGenderChange = (e) => {
    // console.log(e);
    setUser((prevUser) => ({
      ...prevUser,
      gender: e.target.value,
    }));
  };

  return (
    <div>
      <Form
        form={form}
        name="searching"
        onFinish={handleSearch}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="firstName" label="First name">
          <Input
            style={{ width: "150px" }}
            placeholder="Fill your first name"
            onChange={(e) => handleFirstNameChange(e.target.value)}
            value={user.firstName}
          />
        </Form.Item>
        <Form.Item name="lastName" label="Last name">
          <Input
            style={{ width: "150px" }}
            placeholder="Fill your last name"
            onChange={(e) => handleLastNameChange(e.target.value)}
            value={user.lastName}
          />
        </Form.Item>
        <Form.Item name="male" label="Male">
          <Radio.Group onChange={handleGenderChange} value={user.gender}>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Flex wrap gap="small" style={{ marginBottom: 16 }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Flex>
        </Form.Item>
      </Form>
      <Divider />
      <Table
        loading={loading}
        columns={columns(renderAction)}
        dataSource={dataSource}
        pagination={{
          pageSize: pagination.limit,
          total: pagination.total,
          onChange: handlePageChange,
          // pageSize: pagination.limit, // Số mục trên mỗi trang
          // showSizeChanger: true, // Cho phép chọn số mục trên trang
          // pageSizeOptions: ['10', '20', '30'], // Các tùy chọn số mục trên trang
        }}
      />
    </div>
  );
};

export default UsersList;
