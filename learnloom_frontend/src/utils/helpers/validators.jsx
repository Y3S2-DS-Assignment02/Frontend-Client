const validateRegistrationForm = (fullname, email, username, password, repeatPassword, phoneNumber) => {
    const newErrors = {};
    if (!fullname) {
        newErrors.fullname = 'Full name is required!';
    }
    if (!email) {
        newErrors.email = 'Email is required!';
    }
    if (!username) {
        newErrors.username = 'Username is required!';
    }
    if (!password) {
        newErrors.password = 'Password is required!';
    }
    if (!repeatPassword) {
        newErrors.repeatPassword = 'Repeat password is required!';
    }
    if (!phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required!';
    }
    return newErrors;
};


export { validateRegistrationForm };