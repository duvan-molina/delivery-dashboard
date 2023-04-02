import {
  FormFields,
  FormLabel,
  FormTitle,
  Error,
} from "../../shared/components/FormFields/FormFields";
import { LogoImage, LogoWrapper } from "../styles/Login.style";
import Logoimage from "../../../assets/image/PickBazar.png";
import { Form, Field } from "formik";
import * as Yup from "yup";
import Input from "../../shared/components/Input/Input";
import Button from "../../shared/components/Button/Button";
import { FormikProps } from "formik";
import { LoginTypesForm, forms, formsKeys } from "../constants";
import { useEffect } from "react";

const MyInput = ({ field, form, ...props }: any) => {
  return <Input {...field} {...props} />;
};

type Props = FormikProps<LoginTypesForm> & { errorMessage: string };

const LoginComponent: React.FC<Props> = ({
  errors,
  touched,
  isSubmitting,
  setFieldError,
  errorMessage,
}) => {
  useEffect(() => {
    if (errorMessage) {
      setFieldError("password", errorMessage);
    }
  }, [errorMessage]);

  return (
    <Form>
      <FormFields>
        <LogoWrapper>
          <LogoImage src={Logoimage} alt="pickbazar-admin" />
        </LogoWrapper>
        <FormTitle>Log in to admin</FormTitle>
      </FormFields>

      <FormFields>
        <FormLabel>Username</FormLabel>
        <Field
          type="email"
          name={formsKeys.login.email}
          component={MyInput}
          placeholder={forms.login.placeholders.email}
        />
        {errors.email && touched.email && <Error>{errors.email}</Error>}
      </FormFields>
      <FormFields>
        <FormLabel>Password</FormLabel>
        <Field
          type="password"
          name={formsKeys.login.password}
          component={MyInput}
          placeholder={forms.login.placeholders.password}
        />
        {errors.password && touched.password && (
          <Error>{errors.password}</Error>
        )}
      </FormFields>
      <Button
        type="submit"
        disabled={isSubmitting}
        overrides={{
          BaseButton: {
            style: () => ({
              width: "100%",
              marginLeft: "auto",
              borderTopLeftRadius: "3px",
              borderTopRightRadius: "3px",
              borderBottomLeftRadius: "3px",
              borderBottomRightRadius: "3px",
            }),
          },
        }}
      >
        Submit
      </Button>
    </Form>
  );
};

export default LoginComponent;
