import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Tag, Button, Flex, message, Popconfirm } from 'antd';

const getRandomElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const rawTags = [ 'Project Manager', 'Business Analyst', 'Developer', 'QA/QC' ];
const rawAddress = ['Thu Duc, HCM, VN', 'Q9, HCM, VN', 'Q2, HCM, VN'];
const rawAge = [22, 23, 24, 25, 26, 27, 28, 29];

const cancel = (e) => {
  console.log('e', e);
  message.error('No user was deleted');
};

const columns = (onDeleteUser) => [
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
    render: (_, { age }) => (
      <>{ age }</>
    ),
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (_, { address }) => (
      <>{ address }</>
    ),
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
    render: (_, { id }) => (
      <Flex wrap gap="small">
        <Popconfirm
          title="Sure to delete?"
          description="Are you sure to delete this user?"
          onConfirm={ () => onDeleteUser(id) }
          onCancel={ cancel }
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>Delete</Button>
        </Popconfirm>
      </Flex>
    ),
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

const UsersList = ({ users, onDeleteUser }) => {

    const data = preprocessData(users)

    return (
      <div>
        <Table columns={columns(onDeleteUser)} dataSource={data} />
      </div>
    )
};

export default UsersList;

