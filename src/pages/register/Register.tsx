import React from 'react'
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userRegisterApiAction } from '../../redux/slices/userSlice';
import { AppDispatch } from '../../redux/configStore';

type FieldType = {
    email: string;
    password: string;
};



const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Register: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>()
    const history = useHistory()

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            await dispatch(userRegisterApiAction(values)).unwrap()
            alert('Registration successful! Redirecting to login...');
            history.push('/login');

        } catch (error) {
            alert(error || 'Registration failed!');
        }
    };


    return (

        <div>
            <h1 className='p-auto'>Register</h1>
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >



                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register
