import LoginComponent from "../components/Login.component";
import { useMutation } from "@apollo/react-hooks";
import { mutation } from "../../../services";
import { Wrapper, FormWrapper } from "../styles/Login.style";
import { Formik } from "formik";
import { forms, formsKeys } from "../constants";
import { AuthContext } from "../../shared/context/auth";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

type TypeSubmit = {
  values: {
    email: string;
    password: string;
  };
  setSubmitting: any;
};

const LoginContainer = () => {
  const { authenticate, isAuthenticated } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const [loginMutation] = useMutation(mutation.LOGIN_USER, {
    update(_, { data: { login } }) {
      if (login.success) {
        authenticate(login.token);
      }
    },
    onError(e) {
      setErrorMessage(e.message.split(" ").slice(2).join(" "));
    },
  });

  const loginSubmit = (data: TypeSubmit) => {
    setErrorMessage("");
    loginMutation({
      variables: { email: data.values.email, password: data.values.password },
    });
    data.setSubmitting(false);
  };

  if (isAuthenticated) return <Navigate to="/home" />;

  return (
    <Wrapper>
      <FormWrapper>
        <Formik
          initialValues={{
            [formsKeys.login.email]:
              forms.login.initialValues[formsKeys.login.email],
            [formsKeys.login.password]:
              forms.login.initialValues[formsKeys.login.password],
          }}
          onSubmit={(values, { setSubmitting }) => {
            const data = {
              values,
              setSubmitting,
            };
            loginSubmit(data);
          }}
          validationSchema={forms.login.schema}
        >
          {(props) => <LoginComponent {...props} errorMessage={errorMessage} />}
        </Formik>
      </FormWrapper>
    </Wrapper>
  );
};

export default LoginContainer;
