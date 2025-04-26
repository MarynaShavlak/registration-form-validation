import {selectors} from "./selectors.js";
import {getUnmaskedPhoneValue} from "./utils.js";

export function setupValidation() {
    const validation = new JustValidate(selectors.registrationForm);
    const inputPhone = document.querySelector(selectors.phone);
    const phoneMask = new Inputmask('+38(999)999-99-99');
    phoneMask.mask(inputPhone);

    const errorLabelStyle = { color: '#7F265B' };

    validation
        .addField(selectors.name, [
            { rule: 'required', errorMessage: 'Please enter your name' },
            { rule: 'minLength', value: 2, errorMessage: 'Name should have a minimum of 2 characters' },
        ], { errorLabelStyle })
        .addField(selectors.username, [
            { rule: 'required', errorMessage: 'Please enter your username' },
            { rule: 'minLength', value: 4, errorMessage: 'Username should have a minimum of 4 characters' },
            { rule: 'customRegexp', value: /^[a-zA-Z0-9]+$/, errorMessage: 'Only letters and digits are allowed' },
        ], { errorLabelStyle })
        .addField(selectors.phone, [
            {
                validator: () => {
                    const phone = getUnmaskedPhoneValue(inputPhone);
                    return Boolean(Number(phone) && phone.length > 0);
                },
                errorMessage: 'Please enter a valid phone number',
            },
            {
                validator: () => {
                    const phone = getUnmaskedPhoneValue(inputPhone);
                    return Boolean(Number(phone) && phone.length === 10);
                },
                errorMessage: 'Phone number should have 10 digits',
            },
        ], { errorLabelStyle })
        .addField(selectors.email, [
            { rule: 'required', errorMessage: 'Please enter your email' },
            { rule: 'email', errorMessage: 'Please enter a valid email address' },
        ], { errorLabelStyle })
        .addField(selectors.password, [
            { rule: 'required', errorMessage: 'Please enter your password' },
            { rule: 'strongPassword' },
        ], { errorLabelStyle })
        .addField(selectors.passwordConfirm, [
            { rule: 'required', errorMessage: 'Please confirm your password' },
            {
                validator: (value, fields) => value === fields[selectors.password].elem.value,
                errorMessage: 'Passwords do not match',
            },
            { rule: 'strongPassword' },
        ], { errorLabelStyle })
        .addField(selectors.genderGroup, [
            {
                validator: value => value !== undefined,
                errorMessage: 'Please select your gender',
            },
        ], { errorLabelStyle });

    return validation;
}
