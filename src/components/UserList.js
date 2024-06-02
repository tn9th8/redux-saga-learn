import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const UsersList = ({users, onDeleteUser}) => {
    return (
        <ListGroup>
            { 
                users
                // .sort((a, b) => {
                //     // follow alphabet, a < b < c,...
                //     // 1: a, b => a > b => b, a
                //     // -1: a, b => a < b => a, b
                //     // 0: free
                //     if (a.firstName > b.firstName) {
                //         return 1;
                //     } else if (a.firstName < b.firstName) {
                //         return -1;
                //     } else if (a.lastName > b.lastName) {
                //         return 1;
                //     } else if (a.lastName < b.lastName) {
                //         return -1;
                //     }
                //     return 0;
                // })
                .map((user) => {
                    return (
                        <ListGroupItem key={ user.id }>
                            <section style={{display: 'flex'}}>
                                <div style={{flexGrow: 1, margin: 'auto 0'}}>
                                    { user.firstName } { user.lastName }
                                </div>
                                <div>
                                    <Button outline color="danger" onClick={() => onDeleteUser({ userId: user.id, confirm: '' })}>
                                        Delete
                                    </Button>
                                </div>
                            </section>
                            
                        </ListGroupItem>
                    )
                })
            }
        </ListGroup>
    )
};

export default UsersList;

