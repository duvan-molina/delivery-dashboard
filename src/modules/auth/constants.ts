import * as Yup from "yup";

export const formsKeys = {
  login: {
    email: "email",
    password: "password",
  },
} as const;

export const forms = {
  login: {
    initialValues: {
      [formsKeys.login.email]: "",
      [formsKeys.login.password]: "",
    },
    labels: {
      email: "Correo eléctronico",
      password: "Contraseña",
    },
    placeholders: {
      email: "Correo eléctronico",
      password: "Contraseña",
    },
    schema: Yup.object({
      [formsKeys.login.email]: Yup.string()
        .ensure()
        .trim()
        .required("El Correo es Requerido"),
      [formsKeys.login.password]: Yup.string()
        .ensure()
        .trim()
        .required("La Contraseña es Requerida"),
    }),
  },
};

export type LoginTypesForm = Yup.InferType<typeof forms.login.schema>;
