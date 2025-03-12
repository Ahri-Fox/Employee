import React from "react";
import { Button, Form, Input, Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Employee } from "../../models/Employee";
import { addEmployeeAction } from '../../redux/slices/employeeSlice'
import { useHistory } from "react-router-dom";


const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const EmployeeSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
});


const NewEmployee: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            avatar: null,
        },
        validationSchema: EmployeeSchema,
        onSubmit: (values) => {
            const newEmployee: Employee = {
                id: Math.floor(Math.random() * 1000),
                ...values,
                avatar: values.avatar || ''
            }

            dispatch(addEmployeeAction(newEmployee))
            history.push("/listemployee")

        }
    })
    return (
        <Form onFinish={formik.handleSubmit} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} style={{ maxWidth: 600 }}>

            <Form.Item label="First Name" help={formik.errors.first_name} validateStatus={formik.errors.first_name ? "error" : ""}>
                <Input name="first_name" value={formik.values.first_name} onChange={formik.handleChange} />
            </Form.Item>

            <Form.Item label="Last Name" help={formik.errors.last_name} validateStatus={formik.errors.last_name ? "error" : ""}>
                <Input name="last_name" value={formik.values.last_name} onChange={formik.handleChange} />
            </Form.Item>

            <Form.Item label="Email" help={formik.errors.email} validateStatus={formik.errors.email ? "error" : ""}>
                <Input name="email" value={formik.values.email} onChange={formik.handleChange} />
            </Form.Item>

            <Form.Item label="Avatar" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card"
                    beforeUpload={(file) => {
                        formik.setFieldValue("avatar", file);
                        return false;
                    }}>
                    <button
                        style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                        type="button"
                    >
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                </Upload>
            </Form.Item>


            <Button type="primary" htmlType="submit">Thêm</Button>

        </Form>
    );
};

export default NewEmployee;
