import { Formik, Form, Field } from 'formik';
import styles from './NewCommentForm.module.css';


function validateText(value) {
    let error;
    if (value === '') {
        error = 'Comment is required!';
    }
    return error;
}

const NewCommentForm = () => (
    <div className={styles.container}>
        <h3>Post a comment</h3>
        <Formik
            initialValues={{
                name: '',
                text: '',
            }}
            onSubmit={values => {
                console.log(values);
            }}
        >
            {({ errors, touched, isValidating }) => (
                <Form>
                    <div className={styles.formContainer}>
                        name:
                    <Field name="name" />
                    comment:
                    <Field name="text" validate={validateText} />
                        {errors.text && touched.text && <div>{errors.text}</div>}

                    <button className={styles.submitButtonLayout} type="submit">Submit</button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
);

export default NewCommentForm;