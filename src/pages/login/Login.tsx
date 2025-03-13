/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import { userLoginApiAction } from '../../redux/slices/userSlice';

type FieldType = {
    email: string;
    password: string;
    remember?: string;
};



const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const history = useHistory()
    const { error } = useSelector((state: RootState) => state.user)

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const result = await dispatch(userLoginApiAction({
            email: values.email,
            password: values.password

        }))
        console.log(result)
        if (userLoginApiAction.fulfilled.match(result)) {
            alert('Login successful')
            history.push("/listemployee")
        }
    };



    return (
        <div>
            <h1 className='p-auto'>Login</h1>
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
                    label="email"
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
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                {error && (
                    <p style={{ color: 'red', textAlign: "center", marginBottom: 10 }}>{error}</p>
                )}

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <NavLink to="/register" className="link-danger">Register</NavLink></p>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
