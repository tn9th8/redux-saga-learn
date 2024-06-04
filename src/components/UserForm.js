import { Button, Form, Input, Space, message } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiConfig from '../api/apiConfig';
import useSavePage from '../customize/useSavePage';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
};

const UserForm = () => {
    const { id } = useParams(); 
    const [data, setData, updateData] = useSavePage({apiObject: apiConfig.user, id})
    const [form] = Form.useForm();
    const navigate = useNavigate();
    console.log(data);

    // handle on change inputs
    const handleFirstNameChange = (value) => {
        setData((prevUser) => ({
            ...prevUser,
            firstName: value
        }));
    };

    const handleLastNameChange = (value) => {
        setData((prevUser) => ({
            ...prevUser,
            lastName: value
        }));
    };

    // handle form
    const handleFinish = () => {
        updateData(data)
    };

    const handleCancel = () => {
        navigate('/users/list');
        message.info('Don\'t update any user')
    };
  
    const handleReset = () => {
        setData({ 
            id,
            firstName:'', 
            lastName: '',
        });
        form.resetFields();
    };

    form.setFieldsValue(data);
    return (
        <div>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={handleFinish}
                style={{ maxWidth: 600 }}
                //initialValues={{firstName: data.firstName, lastName: data.lastName}}
            >
                <Form.Item name="firstName" label="First name" rules={[{ required: true }]}>
                    <Input 
                        onChange={ (e) => handleFirstNameChange(e.target.value) } 
                        value={ data.firstName }
                    />
                </Form.Item>
                <Form.Item name="lastName" label="Last name" rules={[{ required: true }]}>
                    <Input 
                        onChange={ (e) => handleLastNameChange(e.target.value) } 
                        value={ data.lastName }
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
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
        </div>
    );
};

export default UserForm;