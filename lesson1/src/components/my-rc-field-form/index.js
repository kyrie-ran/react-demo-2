import _Form from "./Form";
import Field from "./Field";

import useForm from "./useForm";
import React from "react";

const Form = React.forwardRef(_Form);
Form.useForm = useForm;

export {Field};

export default Form;
