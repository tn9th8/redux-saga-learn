import UsersList from '../components/UserList';
import UserForm from '../components/UserForm';
import ModalCreateUser from '../components/ModalCreateUser';

const routesConfig = [
    {
        module: 'users',
        path: '/users/list',
        element:    
            <div>
                <ModalCreateUser />
                <UsersList />
            </div>,
    },
    {   
        module: 'users',
        path: '/users/form/:id',
        element: <UserForm />,
    },
]
    

export default routesConfig;