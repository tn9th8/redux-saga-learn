import { Table, Tag } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import apiConfig from '../api/apiConfig';
import useListPage from "../customize/useListPage";

const getRandomElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const rawTags = [ 'Project Manager', 'Business Analyst', 'Developer', 'QA/QC' ];
const rawAddress = ['Thu Duc, HCM, VN', 'Q9, HCM, VN', 'Q2, HCM, VN'];
const rawAge = [22, 23, 24, 25, 26, 27, 28, 29];

// const columns = (onDeleteUser) => [
const columns = (renderAction) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, { firstName, lastName }) => (
      <>{ firstName } { lastName }</>
    ),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Role',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        { tags.map((tag) => {
          let color = tag.length > 12 ? 'geekblue' : 'green';
          if (tag === 'Project Manager') {
            color = 'volcano';
          }
          if (tag === 'QA/QC') {
            color = 'gold';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: renderAction
  },
];

const preprocessData = (users) => {
  return users.map((user) => {
    const tags = [getRandomElement(rawTags)];
    const address = getRandomElement(rawAddress);
    const age = getRandomElement(rawAge);
    return {
      ...user,
      key: user.id,
      age: user?.age ?? age,
      tags: user?.role ?? tags,
      address: user?.address ?? address,
    }
  });
}

const UsersList = () => {
    const [page, setPage] = useState(1);
    const { data, pagination, loading, renderAction } = useListPage({apiObject: apiConfig.user, page: page}) 

    const dataSource = preprocessData(data)

    const handlePageChange = (page) => {
      setPage(page); 
    };

    return (
      <Table 
        loading={loading}
        columns={columns(renderAction)} 
        dataSource={dataSource} 
        pagination={{
          pageSize: pagination.limit,
          total: pagination.total,
          onChange: handlePageChange
          // pageSize: pagination.limit, // Số mục trên mỗi trang
          // showSizeChanger: true, // Cho phép chọn số mục trên trang
          // pageSizeOptions: ['10', '20', '30'], // Các tùy chọn số mục trên trang
        }}
      />
    )
};

export default UsersList;

