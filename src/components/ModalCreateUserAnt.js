import React from 'react';
import { Modal } from 'antd';

const ModalCreateUserAnt = ({ isModalOpen }) => {
    const state = {
        firstName: '',
        lastName: ''
    };

    const handleFirstNameChange = e => {

    }

    const handleLastNameChange = e => {

    }

    const handleSubmit = e => {

    }

    const handleOk = () => {
    
    };
    
    const handleCancel = () => {

    };

    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
};

export default ModalCreateUserAnt;