import * as Yup from 'yup';
import { HierachyLevelStatus } from '../service/interfac/role/role.interfac';
import { ContentStatus } from '../service/interfac/content/content.interfac';
import { Types } from 'mongoose';
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
const roleSchema = Yup.object().shape({
    name: Yup.string()
        .required('Role name is required')
        .min(2, 'Role name must be at least 2 characters long'),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters long'),
    permissions: Yup.array()
        .of(Yup.string().required('Permission must be a string'))
        .required('Permissions are required'),
    hierarchyLevel: Yup.mixed<HierachyLevelStatus>()
        .oneOf(Object.values(HierachyLevelStatus), 'Invalid hierarchy level')
        .required('Hierarchy level is required'),
    isActive: Yup.boolean()
        .required('Status is required'),
});
const updateRoleSchema = Yup.object().shape({
    name: Yup.string()
        .required('Role name is required')
        .min(2, 'Role name must be at least 2 characters long'),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters long'),
    permissions: Yup.array()
        .of(Yup.string().required('Permission must be a string'))
        .required('Permissions are required'),
    hierarchyLevel: Yup.mixed<HierachyLevelStatus>()
        .oneOf(Object.values(HierachyLevelStatus), 'Invalid hierarchy level')
        .required('Hierarchy level is required'),
    isActive: Yup.boolean()
        .required('Status is required'),
});
const contentSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters long'),
    body: Yup.string()
        .required('Body is required')
        .min(10, 'Body must be at least 10 characters long'),
    author: Yup.mixed<Types.ObjectId>()
        .required('Author is required')
        .test('is-objectid', 'Author must be a valid ObjectId', value => {
            return Types.ObjectId.isValid(value);
        }),
    category: Yup.mixed<Types.ObjectId>()
        .required('Category is required')
        .test('is-objectid', 'Category must be a valid ObjectId', value => {
            return Types.ObjectId.isValid(value);
        }),
    tags: Yup.array()
        .of(Yup.string().required('Tag must be a string'))
        .required('Tags are required'),
    status: Yup.mixed<ContentStatus>()
        .oneOf(Object.values(ContentStatus), 'Invalid content status')
        .required('Status is required'),
    publishedAt: Yup.date()
        .nullable(), // Allows publishedAt to be null
    metadata: Yup.object().shape({
        views: Yup.number()
            .required('Views count is required')
            .min(0, 'Views count cannot be negative'),
        likes: Yup.number()
            .required('Likes count is required')
            .min(0, 'Likes count cannot be negative'),
        comments: Yup.number()
            .required('Comments count is required')
            .min(0, 'Comments count cannot be negative'),
    }),
});
const updateContentSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters long'),
    body: Yup.string()
        .required('Body is required')
        .min(10, 'Body must be at least 10 characters long'),
    author: Yup.mixed<Types.ObjectId>()
        .required('Author is required')
        .test('is-objectid', 'Author must be a valid ObjectId', value => {
            return Types.ObjectId.isValid(value);
        }),
    category: Yup.mixed<Types.ObjectId>()
        .required('Category is required')
        .test('is-objectid', 'Category must be a valid ObjectId', value => {
            return Types.ObjectId.isValid(value);
        }),
    tags: Yup.array()
        .of(Yup.string().required('Tag must be a string'))
        .required('Tags are required'),
    status: Yup.mixed<ContentStatus>()
        .oneOf(Object.values(ContentStatus), 'Invalid content status')
        .required('Status is required'),
    publishedAt: Yup.date()
        .nullable(), // Allows publishedAt to be null
    metadata: Yup.object().shape({
        views: Yup.number()
            .required('Views count is required')
            .min(0, 'Views count cannot be negative'),
        likes: Yup.number()
            .required('Likes count is required')
            .min(0, 'Likes count cannot be negative'),
        comments: Yup.number()
            .required('Comments count is required')
            .min(0, 'Comments count cannot be negative'),
    }),
});
const categorySchema = Yup.object().shape({
    name: Yup.string()
        .required('Category name is required')
        .min(2, 'Category name must be at least 2 characters long'),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters long'),
    slug: Yup.string()
        .required('Slug is required')
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly (lowercase letters, numbers, and hyphens)'),
    isActive: Yup.boolean()
        .required('Status is required'),
    metadata: Yup.object().shape({
        contentCount: Yup.number()
            .required('Content count is required')
            .min(0, 'Content count cannot be negative'),
        createdBy: Yup.mixed<Types.ObjectId>()
            .required('Creator ID is required')
            .test('is-objectid', 'Created by must be a valid ObjectId', value => {
                return Types.ObjectId.isValid(value);
            }),
    }),
});
const updateCategorySchema = Yup.object().shape({
    name: Yup.string()
        .required('Category name is required')
        .min(2, 'Category name must be at least 2 characters long'),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters long'),
    slug: Yup.string()
        .required('Slug is required')
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly (lowercase letters, numbers, and hyphens)'),
    isActive: Yup.boolean()
        .required('Status is required'),
    metadata: Yup.object().shape({
        contentCount: Yup.number()
            .required('Content count is required')
            .min(0, 'Content count cannot be negative'),
        createdBy: Yup.mixed<Types.ObjectId>()
            .required('Creator ID is required')
            .test('is-objectid', 'Created by must be a valid ObjectId', value => {
                return Types.ObjectId.isValid(value);
            }),
    }),
});
const tagSchema = Yup.object().shape({
    name: Yup.string()
        .required('Tag name is required')
        .min(2, 'Tag name must be at least 2 characters long'),
    slug: Yup.string()
        .required('Slug is required')
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly (lowercase letters, numbers, and hyphens)'),
    description: Yup.string()
        .optional(),
    contentCount: Yup.number()
        .required('Content count is required')
        .min(0, 'Content count cannot be negative'),
    createdBy: Yup.mixed<Types.ObjectId>()
        .required('Creator ID is required')
        .test('is-objectid', 'Created by must be a valid ObjectId', value => {
            return Types.ObjectId.isValid(value);
        }),
});
const updateTagSchema = Yup.object().shape({
    name: Yup.string()
        .required('Tag name is required')
        .min(2, 'Tag name must be at least 2 characters long'),
    slug: Yup.string()
        .required('Slug is required')
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly (lowercase letters, numbers, and hyphens)'),
    description: Yup.string()
        .optional(),
    contentCount: Yup.number()
        .required('Content count is required')
        .min(0, 'Content count cannot be negative'),
    createdBy: Yup.mixed<Types.ObjectId>()
        .required('Creator ID is required')
        .test('is-objectid', 'Created by must be a valid ObjectId', value => {
            return Types.ObjectId.isValid(value);
        }),
});
export {
    userRegistrationSchema,
    userLoginSchema,
    updateUserRegistrationSchema,
    profileSchema,
    updateProfileSchema,
    roleSchema,
    updateRoleSchema,
    contentSchema,
    updateContentSchema,
    categorySchema,
    updateCategorySchema,
    tagSchema,
    updateTagSchema,
}