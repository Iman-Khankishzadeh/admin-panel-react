import React from "react";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import AuthFormikControl from "../../components/authForm/AuthFormikControl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../utils/alerts";
import httpService from "../../services/httpService";
import { loginService } from "../../services/auth";

const initialValues = {
  phone: "",
  password: "",
  remember: false,
};

const onSubmit = async (values, submitMethods, navigate) => {
  try {
    const res = await loginService(values);
    if (res.status == 200) {
      localStorage.setItem("loginToken", JSON.stringify(res.data));
      navigate("/");
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);
    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};

const validationSchema = Yup.object({
  phone: Yup.number().required("لطفا این قسمت را پر کنید"),
  password: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[a-zA-Z0-9@!%$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  remember: Yup.boolean(),
});

const Login = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate)
      }
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <div className="wrap-login100">
            <Form className="login100-form validate-form pos-relative d-flex flex-column align-items-center justify-content-center">
              <span className="login100-form-title">ورود اعضا</span>

              <span className="alert alert-info">
                شماره موبایل : 09110000000
              </span>
              <span className="alert alert-info">رمز عبور : 123456</span>

              <AuthFormikControl
                formik={formik}
                control="input"
                type="text"
                name="phone"
                icon="fa fa-mobile"
                label="شماره موبایل"
              />

              <AuthFormikControl
                formik={formik}
                control="input"
                type="password"
                name="password"
                icon="fa fa-lock"
                label="رمز عبور"
              />

              <AuthFormikControl
                control="switch"
                name="remember"
                label="مرا بخاطر بسپارید"
              />

              <div className="container-login100-form-btn">
                <button
                  className="login100-form-btn "
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "لطفا صبر کنید..." : "ورود"}
                </button>
              </div>
            </Form>
            <div className="login100-pic js-tilt" data-tilt>
              <img
                src="https://images.squarespace-cdn.com/content/v1/5eb48d3fef49df153d320521/1615045363001-DJXR515LC4U5UWMKWX01/Sherlock+Toy+Face-high.gif?format=750w"
                alt="IMG"
              />
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
