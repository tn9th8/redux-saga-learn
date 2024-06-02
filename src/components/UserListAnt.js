import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Space, Table, Tag } from 'antd';
import { Button, Flex } from 'antd';

function getRandomElementFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const columns = [
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
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {
            tags.map((tag) => {
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
          <Button type="primary" danger  >
            Update
          </Button>
        </Flex>
        // <Space size="middle">
        //   <a>Invite</a>
        //   <a>Update</a>
        //   <a>Delete</a>
        // </Space>
      ),
    },
  ];

const UsersListAnt = ({users, onDeleteUser}) => {

    const rawTags = [ 'Project Manager', 'Business Analyst', 'Developer', 'QA/QC' ];
    const rawAddress = ['Thu Duc, HCM, VN', 'Q9, HCM, VN', 'Q2, HCM, VN'];
    const rawAge = [22, 23, 24, 25, 26, 27, 28, 29];

    const newUsers = users.map((user) => {
      const tags = [getRandomElementFromArray(rawTags)];
      const address = getRandomElementFromArray(rawAddress);
      const age = getRandomElementFromArray(rawAge);
      return {
        ...user,
        key: user.id,
        age,
        tags,
        address,
      }
    });

    return (
        <Table columns={columns} dataSource={newUsers} />
    )
};

export default UsersListAnt;

