import { combineReducers } from "redux";
import UsersReduces from './users';

export default combineReducers({
    users: UsersReduces
});