import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Tag, Button, Flex, message, Popconfirm } from 'antd';

function getRandomElementFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const cancel = (e) => {
  console.log('e', e);
  message.error('No user was deleted');
};

const UsersListAnt = ({ users, onDeleteUser }) => {

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
      <div>
        {/* <Button onClick={ () => onCreateUser() } type="primary" style={{ marginBottom: 16 }}>
          Add
        </Button> */}
        <Table dataSource={newUsers}>
          <columns
            title = 'Name'
            dataIndex = 'name'
            key = 'name'
            render = {(_, { firstName, lastName }) => (
              <>{ firstName } { lastName }</>
            )}
          />
          <columns
            title = 'Age'
            dataIndex = 'age'
            key = 'age'
            render = {(_, { age }) => (
              <>{ age }</>
            )}
          />
          <columns
            title = 'Address'
            dataIndex = 'address'
            key = 'address'
            render = {(_, { address }) => (
              <>{ address }</>
            )}
          />
          <columns
            title = 'Role'
            key = 'tags'
            dataIndex = 'tags'
            render = {(_, { tags }) => (
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
            )}
          />
          <columns
            title = 'Action'
            key = 'action'
            render = {(_, { id }) => (
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
            )}
          />
        </Table>
      </div>
    )
};

export default UsersListAnt;

