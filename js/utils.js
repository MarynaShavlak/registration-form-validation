import {selectors} from "./selectors.js";

export function getUnmaskedPhoneValue(inputPhone) {
    return inputPhone.inputmask.unmaskedvalue();
}

export function getFormData(form) {
    const genderRadio = form.querySelector('.input-gender:checked');
    return {
        name: form.querySelector(selectors.name).value,
        username: form.querySelector(selectors.username).value,
        phone: form.querySelector(selectors.phone).value,
        email: form.querySelector(selectors.email).value,
        password: form.querySelector(selectors.password).value,
        passwordConfirm: form.querySelector(selectors.passwordConfirm).value,
        gender: genderRadio ? genderRadio.value : undefined,
    };
}

export function isFormDataValid(formData) {
    return Object.values(formData).every(value => value !== '' && value !== undefined);
}
