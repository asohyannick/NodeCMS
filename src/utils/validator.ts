import * as Yup from 'yup';
const userRegistrationSchema = Yup.object().shape({
    firstName: Yup.string().required("firstName must be provided").min(3, "firstName must be at least 3 characters minimum").trim().lowercase(),
    lasttName: Yup.string().required("lastName must be provided").min(3, "lastName must be at least 3 characters minimum").trim().lowercase(),
    username: Yup.string().email('username must be provided').required("username must be provided").max(255, "username must be at least 255 characters maximum").trim().lowercase(),
    password: Yup.string().required("password must be provided").min(3, "password must be at least 3 characters minimum").trim(),
    isAdmin: Yup.boolean().required('User regsitration status must be provided').default(false),
});
const userLoginSchema = Yup.object().shape({
    username: Yup.string().email('username must be provided').required("username must be provided").max(255, "username must be at least 255 characters maximum").trim().lowercase(),
    password: Yup.string().required("password must be provided").min(3, "password must be at least 3 characters minimum").trim(),
});
const updateUserRegistrationSchema = Yup.object().shape({
    firstName: Yup.string().required("firstName must be provided").min(3, "firstName must be at least 3 characters minimum").trim().lowercase(),
    lasttName: Yup.string().required("lastName must be provided").min(3, "lastName must be at least 3 characters minimum").trim().lowercase(),
    username: Yup.string().email('username must be provided').required("username must be provided").max(255, "username must be at least 255 characters maximum").trim().lowercase(),
    password: Yup.string().required("password must be provided").min(3, "password must be at least 3 characters minimum").trim(),
    isAdmin: Yup.boolean().required('User regsitration status must be provided').default(false),
});
export {
    userRegistrationSchema,
    userLoginSchema,
    updateUserRegistrationSchema,
}