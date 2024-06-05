import UserForm from '../components/UserForm';
import UsersListAndModal from '../components/UserListAndModal';

const routesConfig = [
    {   
        title: 'Users list page',
        module: 'users',
        path: '/users/list',
        element: UsersListAndModal,
    },
    {   
        title: 'User form page',
        module: 'users',
        path: '/users/form/:id',
        element: UserForm,
    },
]
    

export default routesConfig;