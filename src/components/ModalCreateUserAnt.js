import React, { useState } from 'react';
import { Modal, Button, Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const ModalCreateUserAnt = ({onSubmit}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [user, setUser] = useState({ 
        firstName:'', 
        lastName: '',
        age: 0,
        role: '',
        address: ''
    });

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
            role: e
        }));
    }

    const handleAddressChange = e => {
        setUser((prevUser) => ({
            ...prevUser,
            address: e.target.value
        }));
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (e) => {
        e.preventDefault();

        onSubmit(user)

        setUser({ 
            firstName:'', 
            lastName: '',
            age: 0,
            role: '',
            address: ''
        });

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [form] = Form.useForm();
  
    const onFinish = (values) => {
      console.log('onFinish', values);
    };
  
    const onReset = () => {
      form.resetFields();
    };
  
    const onFill = () => {
        const fillUser = { 
            firstName: 'Trung Nhan', 
            lastName: 'Nguyen', 
            age: 20, 
            role: 'Developer', 
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
            open={ isModalOpen } 
            // onOk={handleOk} 
            onCancel={handleCancel}
            footer={(_, { CancelBtn }) => (
                <>
                    <CancelBtn />
                    {/* <OkBtn /> */}
                    <Button type="primary" onClick={
                        handleOk
                        //() => onSubmit(user)
                    }>
                            Submit
                    </Button>
                  <Button type="primary" onClick={onReset}>Reset</Button>
                  <Button type="primary" onClick={onFill}>Fill form</Button>
                </>
              )}
        >
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
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
            </Form>
        </Modal>
    </div>
    );
};

export default ModalCreateUserAnt;