import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Tag, Button, Flex, message, Popconfirm } from 'antd';
import useListPage from "../customize/useListPage";
// import apiConfig from '../api/ApiConfig';
import apiConfig from '../api/apiConfig';

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

const preprocessPagination = (pagination) => {
  pagination = {
    ...pagination,
    limit: 5,
  }

  console.log('pagination 1', pagination)

  const handlePageChange = (page) => {
    console.log(page);
    pagination = {
      ...pagination,
      limit: 5, 
      offset: page * 5 + 1, 
      total: 12
    }
    handlePaginationAnt()

    console.log('pagination 2', pagination)
  }

  function handlePaginationAnt() { 
    return {
      current: pagination.offset / pagination.limit + 1, // Trang hiện tại
      pageSize: pagination.limit, // Số mục trên mỗi trang
      total: pagination.total, // Tổng số mục dữ liệu
      // showSizeChanger: true, // Cho phép chọn số mục trên trang
      // pageSizeOptions: ['10', '20', '30'], // Các tùy chọn số mục trên trang
      onChange: handlePageChange // Hàm xử lý khi thay đổi trang
    }
  }

  return handlePaginationAnt();
}


const UsersList = ({ users, onDeleteUser }) => {
    // const [data, pagination, setPagination] = useListPage(apiConfig.user)
    let { data, pagination } = useListPage(apiConfig.user)

    // pagination = {
    //   ...pagination,
    //   limit: 5,
    // }

    // const handlePageChange = (page) => {
    //   // console.log(page);
    //   // setPagination = {
    //   //   ...pagination,
    //   //   limit: 5, 
    //   //   offset: page * 5 + 1, 
    //   //   total: 12
    //   // }
    //   // handlePaginationAnt()
  
    //   // console.log('pagination 2', pagination)
    //   setPaginationAnt({
    //     ...paginationAnt,
    //     current: page * pagination.limit + 1,
    //   })
    // }

    // const { paginationAnt, setPaginationAnt } = useState({
    //   current: pagination.offset / pagination.limit + 1, // Trang hiện tại
    //   pageSize: pagination.limit, // Số mục trên mỗi trang
    //   total: pagination.total, // Tổng số mục dữ liệu
    //   // showSizeChanger: true, // Cho phép chọn số mục trên trang
    //   // pageSizeOptions: ['10', '20', '30'], // Các tùy chọn số mục trên trang
    //   onChange: handlePageChange // Hàm xử lý khi thay đổi trang
    // })

    data = preprocessData(data)
    // pagination = preprocessPagination(pagination);

    // console.log('pagination 1', pagination)
  

  
    // function handlePaginationAnt() { 
    //   return {
    //     current: pagination.offset / pagination.limit + 1, // Trang hiện tại
    //     pageSize: pagination.limit, // Số mục trên mỗi trang
    //     total: pagination.total, // Tổng số mục dữ liệu
    //     // showSizeChanger: true, // Cho phép chọn số mục trên trang
    //     // pageSizeOptions: ['10', '20', '30'], // Các tùy chọn số mục trên trang
    //     onChange: handlePageChange // Hàm xử lý khi thay đổi trang
    //   }
    // }
  
    // return handlePaginationAnt();

    return (
      <Table columns={columns(onDeleteUser)} dataSource={data} 
      // pagination={paginationAnt}
      />
    )
};

export default UsersList;

