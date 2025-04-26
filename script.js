// const registrationFormSelector = '#registrationForm';
// const nameFieldSelector = '#name';
// const usernameFieldSelector = '#username';
// const phoneFieldSelector = '#phone';
// const emailFieldSelector = '#email';
// const passwordFieldSelector = '#password';
// const passwordConfirmFieldSelector = '#passwordConfirm';
// const genderFieldSelector = '#advanced-usage_communication_radio_group';
// const regFormSelector = '.reg-form';
//
// const validationReg = new JustValidate(registrationFormSelector);
// const inputPhone = document.querySelector(phoneFieldSelector);
// const phoneMask = new Inputmask('+38(999)999-99-99');
// phoneMask.mask(inputPhone);
//
// validationReg
//   .addField(nameFieldSelector, [
//     { rule: 'required', errorMessage: 'Please enter your name' },
//     {
//       rule: 'minLength',
//       value: 2,
//       errorMessage: 'Name should have a minimum of 2 characters',
//     },
//   ],{
//         errorLabelStyle: {
//           color: '#7F265B'
//         }
//       })
//   .addField(usernameFieldSelector, [
//     { rule: 'required', errorMessage: 'Please enter your username' },
//     {
//       rule: 'minLength',
//       value: 4,
//       errorMessage: 'Username should have a minimum of 4 characters',
//     },
//     {
//       rule: 'customRegexp',
//       value: /^[a-zA-Z0-9]+$/,
//       errorMessage: 'Only letters (a-z or A-Z) and digits (0-9) are allowed',
//     },
//   ], {errorLabelStyle: {
//           color: '#7F265B'
//         } })
//   .addField(phoneFieldSelector, [
//     {
//       validator: value => {
//         const phone = getUnmaskedPhoneValue();
//         return Boolean(Number(phone) && phone.length > 0);
//       },
//       errorMessage: 'Please enter a valid phone number',
//     },
//     {
//       validator: value => {
//         const phone = getUnmaskedPhoneValue();
//         return Boolean(Number(phone) && phone.length === 10);
//       },
//       errorMessage: 'Phone number should have 10 digits',
//     },
//   ],
//       {
//         errorLabelStyle: {
//           color: '#7F265B'
//         }
//       })
//   .addField(emailFieldSelector, [
//     { rule: 'required', errorMessage: 'Please enter your email' },
//     { rule: 'email', errorMessage: 'Please enter a valid email address' },
//   ],
//       {
//         errorLabelStyle: {
//           color: '#7F265B'
//         }
//       })
//   .addField(passwordFieldSelector, [
//     { rule: 'required', errorMessage: 'Please enter your password' },
//     { rule: 'strongPassword' },
//   ],
//       {
//         errorLabelStyle: {
//           color: '#7F265B'
//         }
//       })
//   .addField(passwordConfirmFieldSelector, [
//     { rule: 'required', errorMessage: 'Please confirm your password' },
//     {
//       validator: (value, fields) => {
//         const repeatPasswordValue = fields[passwordFieldSelector].elem.value;
//         return value === repeatPasswordValue;
//       },
//       errorMessage: 'Passwords do not match',
//     },
//     { rule: 'strongPassword' },
//   ],
//       {
//         errorLabelStyle: {
//           color: '#7F265B'
//         }
//       })
//   .addField(genderFieldSelector, [
//       {
//         validator: (value) => {
//
//           return value !== undefined;
//         },
//         errorMessage: 'Please select your gender',
//       },
//     ],
//     {
//       errorLabelStyle: {
//         color: '#7F265B'
//       }
//     });
//
//
//
// const regForm = document.querySelector(regFormSelector);
// regForm.addEventListener('submit', sendForm);
//
// function getUnmaskedPhoneValue() {
//   return inputPhone.inputmask.unmaskedvalue();
// }
//
// function getFormData(form) {
//   const genderRadioButtons = form.querySelectorAll('.input-gender:checked');
//   const gender =
//     genderRadioButtons.length > 0 ? genderRadioButtons[0].value : undefined;
//   return {
//     name: form.querySelector(nameFieldSelector).value,
//     username: form.querySelector(usernameFieldSelector).value,
//     phone: form.querySelector(phoneFieldSelector).value,
//     email: form.querySelector(emailFieldSelector).value,
//     password: form.querySelector(passwordFieldSelector).value,
//     passwordConfirm: form.querySelector(passwordConfirmFieldSelector).value,
//     gender: gender,
//   };
// }
//
// function sendForm(e) {
//   e.preventDefault();
//   const regForm = document.querySelector(regFormSelector);
//   const formData = getFormData(regForm);
//   if (
//     Object.values(formData).every(value => value !== '' && value !== undefined)
//   ) {
//     console.log('formData : ', formData);
//     validationReg.refresh();
//     regForm.reset();
//   } else {
//     console.log('Data in form is not valid');
//   }
// }


import {selectors} from "./js/selectors.js";
import {setupValidation} from "./js/validation.js";
import {getFormData, isFormDataValid} from "./js/utils.js";

document.addEventListener('DOMContentLoaded', () => {
  const regForm = document.querySelector(selectors.regForm);
  const validation = setupValidation();

  regForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = getFormData(regForm);

    if (isFormDataValid(formData)) {
      console.log('formData : ', formData);
      validation.refresh();
      regForm.reset();
    } else {
      console.log('Data in form is not valid');
    }
  });
});
