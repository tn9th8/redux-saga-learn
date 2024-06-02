import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { 
  getUsersRequest, 
  createUsersRequest, 
  deleteUsersRequest,
  fireUserError,
  getNonDeleteUsersRequest 
} from '../actions/users';
import UsersList from './UserList';
import NewUserForm from './NewUserForm';
import ModalDeleteUser from './ModalDeleteUser';
import { Alert } from 'reactstrap';
import UsersListAnt from './UserListAnt';
import ModalCreateUserAnt from './ModalCreateUserAnt';

class App extends Component {
  state = { isModalOpen: false };

  constructor(props) {
    super(props);
    this.props.getUsersRequest();
    
  } 

  handleSubmit = ({ firstName, lastName }) => {
    this.props.createUsersRequest({
      firstName,
      lastName
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

  showModal = () => {
    // setIsModalOpen(true);
    this.setState = { isModalOpen: true }
  };

  render() {
    const users = this.props.users;
    console.log('app: user: ', users)

    return (
      <div style={{margin: '0 auto', padding: '20px', maxWidth: '800px'}}>
        <Alert color="danger" isOpen={ !!users.error } toggle={ this.handleCloseAlert }>
          { users.error }
        </Alert>

        <UsersListAnt 
          users={ users.items } 
          onDeleteUser={ this.handleDeleteUserConfirm } 
          onCreateUser={ () => { this.setState({ isModalOpen: true }) } }
        />

        <ModalCreateUserAnt isModalOpen={ this.state.isModalOpen } />

        {
          console.log(this.state.isModalOpen)
        }

        <ModalDeleteUser 
          userId={ users.userId } 
          onCancel={ this.handleDeleteUserClick } 
          onConfirm={ this.handleDeleteUserClick } 
        />

        <NewUserForm onSubmit={ this.handleSubmit }/>

        {/* <UsersList users={ users.items } onDeleteUser={ this.handleDeleteUserClick }/> */}
        
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
