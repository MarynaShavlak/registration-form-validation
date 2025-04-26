import {selectors} from "./js/selectors.js";
import {setupValidation} from "./js/validation.js";
import {getFormData, isFormDataValid} from "./js/utils.js";

document.addEventListener('DOMContentLoaded', () => {
  const regForm = document.querySelector(selectors.registrationForm);
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
