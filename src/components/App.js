import React, { Component, } from 'react';
import { connect } from 'react-redux';
import {
  createUsersRequest,
  deleteUsersRequest,
  fireUserError,
  getNonDeleteUsersRequest,
  getUsersRequest
} from '../actions/users';
import ModalCreateUser from './ModalCreateUser';
import UsersList from './UserList';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.getUsersRequest(); 
  } 

  handleSubmit = ({ firstName = '', lastName = '', age = 0, role = [''], address = '' }) => {
    this.props.createUsersRequest({
      firstName,
      lastName,
      age,
      role,
      address
    });
  };

  handleDeleteUserClick = ({ userId, confirm }) => {
    this.props.deleteUsersRequest({
      userId,
      confirm
    });
  };

  handleDeleteUserConfirm = (userId) => {
    this.props.getNonDeleteUsersRequest(userId);
  };

  render() {
    const users = this.props.users; 
    console.log('app: user: ', users)

    return (
      <div style={{margin: '0 auto', padding: '20px', maxWidth: '800px'}}>
        <ModalCreateUser onSubmit={ this.handleSubmit } />
        <UsersList />

        {/* <UsersList 
           users={ users.items } 
           onDeleteUser={ this.handleDeleteUserConfirm } 
        /> */}
        
      </div>
    );
  }
}

export default connect(
  ({users}) => ({users}), 
  { 
    getUsersRequest, 
    createUsersRequest,
    deleteUsersRequest,
    fireUserError,
    getNonDeleteUsersRequest
  }
) (App);
