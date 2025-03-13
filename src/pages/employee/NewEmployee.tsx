import React from "react";
import { Button, Form, Input } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { createEmployeeApiAction } from "../../redux/slices/employeeSlice";
import { useHistory } from "react-router-dom";

const EmployeeSchema = Yup.object().shape({
    name: Yup.string().required("First name is required"),
    job: Yup.string().required("Last name is required"),

});


const NewEmployee: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            name: "",
            job: "",

        },
        validationSchema: EmployeeSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(createEmployeeApiAction(values)).unwrap();
                alert("Employee added successfully!");
                history.push("/listemployee");
            } catch (error) {
                alert("Failed to add employee!");
            }

        }
    })
    return (
        <div>
            <h2 className="text-left pb-4">Add employee</h2>
            <Form onFinish={formik.handleSubmit} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} style={{ maxWidth: 600 }}>

                <Form.Item label="Name" help={formik.errors.name} validateStatus={formik.errors.name ? "error" : ""}>
                    <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Job" help={formik.errors.job} validateStatus={formik.errors.job ? "error" : ""}>
                    <Input name="job" value={formik.values.job} onChange={formik.handleChange} />
                </Form.Item>


                <Button type="primary" htmlType="submit">Thêm</Button>

            </Form>
        </div>

    );
};

export default NewEmployee;
