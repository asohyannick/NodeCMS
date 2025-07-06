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
const profileSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters long'),
    lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters long'),
    email: Yup.string()
        .required('Email is required')
        .email('Email must be a valid email address'),
    address: Yup.object().shape({
        street: Yup.string()
            .required('Street is required'),
        city: Yup.string()
            .required('City is required'),
        state: Yup.string()
            .required('State is required'),
        country: Yup.string()
            .required('Country is required'),
        zipCode: Yup.string()
            .required('Zip code is required')
            .matches(/^\d{5}(-\d{4})?$/, 'Zip code must be a valid format'),
    }),
    occupation: Yup.string()
        .required('Occupation is required'),
    hobbies: Yup.array()
        .of(Yup.string().required('Hobby must be a string'))
        .required('Hobbies are required'),
    date: Yup.date()
        .required('Date is required')
        .nullable(),
});
const updateProfileSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters long'),
    lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters long'),
    email: Yup.string()
        .required('Email is required')
        .email('Email must be a valid email address'),
    address: Yup.object().shape({
        street: Yup.string()
            .required('Street is required'),
        city: Yup.string()
            .required('City is required'),
        state: Yup.string()
            .required('State is required'),
        country: Yup.string()
            .required('Country is required'),
        zipCode: Yup.string()
            .required('Zip code is required')
            .matches(/^\d{5}(-\d{4})?$/, 'Zip code must be a valid format'),
    }),
    occupation: Yup.string()
        .required('Occupation is required'),
    hobbies: Yup.array()
        .of(Yup.string().required('Hobby must be a string'))
        .required('Hobbies are required'),
    date: Yup.date()
        .required('Date is required')
        .nullable(),
});
export {
    userRegistrationSchema,
    userLoginSchema,
    updateUserRegistrationSchema,
    profileSchema,
    updateProfileSchema
}