import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { 
  getUsersRequest, 
  createUsersRequest, 
  deleteUsersRequest,
  fireUserError,
  getNonDeleteUsersRequest 
} from '../actions/users';
// import UsersList from './UserList';
// import NewUserForm from './NewUserForm';
// import ModalDeleteUser from './ModalDeleteUser';
import { Alert } from 'reactstrap';
import UsersListAnt from './UserListAnt';
import ModalCreateUserAnt from './ModalCreateUserAnt';

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

  handleCloseAlert = () => {
    this.props.fireUserError('');
  };

  render() {
    const users = this.props.users;
    console.log('app: user: ', users)

    return (
      <div style={{margin: '0 auto', padding: '20px', maxWidth: '800px'}}>
        <Alert color="danger" isOpen={ !!users.error } toggle={ this.handleCloseAlert }>
          { users.error }
        </Alert>

        <ModalCreateUserAnt onSubmit={ this.handleSubmit } />

        <UsersListAnt 
          users={ users.items } 
          onDeleteUser={ this.handleDeleteUserConfirm } 
        />

        {/* <ModalDeleteUser 
          userId={ users.userId } 
          onCancel={ this.handleDeleteUserClick } 
          onConfirm={ this.handleDeleteUserClick } 
        />

        <NewUserForm onSubmit={ this.handleSubmit }/>

        <UsersList users={ users.items } onDeleteUser={ this.handleDeleteUserClick }/> */}
        
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
