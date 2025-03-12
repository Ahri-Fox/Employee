/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { RouteProps } from 'react-router-dom';

type HomeTemplateProps = RouteProps & {
    WrappedComponent: React.ComponentType<any>;
}


const HomeTemplate: React.FC<HomeTemplateProps> = ({ WrappedComponent, ...restProps }) => {
    return (
        <div className="container-fluid ">
            <div className="row d-flex justify-content-center align-items-center h-100 mt-5 pt-5">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <img className="img-fluid" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="homeTemplate image" />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <WrappedComponent {...restProps} />
                </div>
            </div>
        </div>
    )
}

export default HomeTemplate
