import React, { useState } from 'react';
import { Modal, Button, Form, Input, InputNumber, Select, message, Space } from 'antd';
import useCustomHook from '../customize/useModalHook';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
};

const ModalCreateUserAnt = ({onSubmit}) => {
    const [open, handle] = useCustomHook();
    const [form] = Form.useForm();
    const [user, setUser] = useState({ 
        firstName:'', 
        lastName: '',
        age: 0,
        role: [''],
        address: ''
    });

    // handle on change inputs
    const handleFirstNameChange = (value) => {
        setUser((prevUser) => ({
            ...prevUser,
            firstName: value
        }));
    };

    const handleLastNameChange = (value) => {
        setUser((prevUser) => ({
            ...prevUser,
            lastName: value
        }));
    };

    const handleAgeChange = e => {
        setUser((prevUser) => ({
            ...prevUser,
            age: e
        }));
    }

    const handleRoleChange = e => {
        setUser((prevUser) => ({
            ...prevUser,
            role: [e]
        }));
    }

    const handleAddressChange = e => {
        setUser((prevUser) => ({
            ...prevUser,
            address: e.target.value
        }));
    }

    // handle add button
    const showModal = () => {
        handle.open();
    };

    // handle form
    const handleFinish = (e) => {
        onSubmit(user);
        handleReset();
        handle.close();
    };

    const handleCancel = () => {
        handleReset();
        handle.close();
        message.error('No user was added');
    };
  
    const handleReset = () => {
        setUser({ 
            firstName:'', 
            lastName: '',
            age: 0,
            role: [''],
            address: ''
        });
        form.resetFields();
    };
  
    const handleFill = () => {
        const fillUser = { 
            firstName: 'Trung Nhan', 
            lastName: 'Nguyen', 
            age: 20, 
            role: ['Developer'], 
            address: 'Thu Duc, HCM, VN' 
        };
        form.setFieldsValue(fillUser);
        setUser(fillUser);
    };
    
    return (
    <div>
        <Button onClick={ showModal } type="primary" style={{ marginBottom: 16 }}>
          Add
        </Button>
        <Modal 
            title="Create a user" 
            open={ open } 
            onCancel={handleCancel}
            footer={() => {}} // set Modal footer rong
        >
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={handleFinish}
                style={{ maxWidth: 600 }}
            >
                <Form.Item name="firstName" label="First name" rules={[{ required: true }]}>
                    <Input 
                        placeholder="Fill your first name"
                        onChange={ (e) => handleFirstNameChange(e.target.value) } 
                        value={ user.firstName }
                    />
                </Form.Item>
                <Form.Item name="lastName" label="Last name" rules={[{ required: true }]}>
                    <Input 
                        placeholder="Fill your last name"
                        onChange={ (e) => handleLastNameChange(e.target.value) } 
                        value={ user.lastName }
                    />
                </Form.Item>
                <Form.Item name="age" label="Age" rules={[{ required: true }]}>
                    <InputNumber 
                        placeholder="Fill your age"
                        onChange={ handleAgeChange } 
                        value={ user.age }
                    />
                </Form.Item>
                <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select your role"
                        onChange={ handleRoleChange } 
                        value={ user.role }
                        allowClear
                    >
                        <Option value="Project Manager">Project Manager</Option>
                        <Option value="Business Analyst">Business Analyst</Option>
                        <Option value="Developer">Developer</Option>
                        <Option value="QA/QC">QA/QC</Option>
                        <Option value="Other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.role !== currentValues.role}
                >
                    {({ getFieldValue }) =>
                    getFieldValue('role') === 'Other' ? (
                        <Form.Item name="customizeRole" label="Customize Role" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    ) : null
                    }
                </Form.Item>
                <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                    <Input 
                        placeholder="Fill your address"
                        onChange={ handleAddressChange } 
                        value={ user.address }
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button onClick={handleFill}>
                            Fill form
                        </Button>
                        <Button onClick={handleReset}>
                            Reset
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    </div>
    );
};

export default ModalCreateUserAnt;