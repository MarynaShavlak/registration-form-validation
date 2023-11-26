const registrationFormSelector = '#registrationForm';
const nameFieldSelector = '#name';
const usernameFieldSelector = '#username';
const phoneFieldSelector = '#phone';
const emailFieldSelector = '#email';
const passwordFieldSelector = '#password';
const passwordConfirmFieldSelector = '#passwordConfirm';
const regFormSelector = '.reg-form';


const validationConfig = {
  validateBeforeSubmitting: true,
};

const validationReg = new JustValidate(registrationFormSelector, validationConfig);
const inputPhone = document.querySelector(phoneFieldSelector);
const phoneMask = new Inputmask('+38(999)999-99-99');
phoneMask.mask(inputPhone);

validationReg
  .addField(nameFieldSelector, [
    { rule: 'required', errorMessage: 'Please enter your name' },
    { rule: 'minLength', value: 2, errorMessage: 'Name should have a minimum of 2 characters' },
  ])
  .addField(usernameFieldSelector, [
    { rule: 'required', errorMessage: 'Please enter your username' },
    { rule: 'minLength', value: 2, errorMessage: 'Username should have a minimum of 2 characters' },
  ])
  .addField(phoneFieldSelector, [
    {
      validator: (value) => {
        const phone = getUnmaskedPhoneValue();
        return Boolean(Number(phone) && phone.length > 0);
      },
      errorMessage: 'Please enter a valid phone number',
    },
    {
      validator: (value) => {
        const phone = getUnmaskedPhoneValue();
        return Boolean(Number(phone) && phone.length === 10);
      },
      errorMessage: 'Phone number should have 10 digits',
    },
  ])
  .addField(emailFieldSelector, [
    { rule: 'required', errorMessage: 'Please enter your email' },
    { rule: 'email', errorMessage: 'Please enter a valid email address' },
  ])
  .addField(passwordFieldSelector, [
    { rule: 'required', errorMessage: 'Please enter your password' },
    { rule: 'minLength', value: 6, errorMessage: 'Password should have a minimum of 6 characters' },
  ])
  .addField(passwordConfirmFieldSelector, [
    { rule: 'required', errorMessage: 'Please confirm your password' },
    {
      validator: (value, fields) => {
        const repeatPasswordValue = fields[passwordFieldSelector].elem.value;
        return value === repeatPasswordValue;
      },
      errorMessage: 'Passwords do not match',
    },
    {
      rule: 'minLength',
      value: 6,
      errorMessage: 'Password confirmation should have a minimum of 6 characters',
    },
  ])
  .onSuccess(handleSubmit);

function getUnmaskedPhoneValue() {
  return inputPhone.inputmask.unmaskedvalue();
}


// function resetForm(form) {
//   form.reset();
// }

function getFormData(form) {
  return {
    name: form.querySelector(nameFieldSelector).value,
    username: form.querySelector(usernameFieldSelector).value,
    phone: form.querySelector(phoneFieldSelector).value,
    email: form.querySelector(emailFieldSelector).value,
    password: form.querySelector(passwordFieldSelector).value,
    passwordConfirm: form.querySelector(passwordConfirmFieldSelector).value,
  };
}


async function handleSubmit(event) {
  console.log('submit');
  const regForm = document.querySelector(regFormSelector);
  regForm.addEventListener('submit', sendForm);

  async function sendForm(e) {
    e.preventDefault();
    const formData = getFormData(regForm);
    regForm.classList.add('form--sending');
    let response = await fetch('sendForm.php', {
      method:'POST',
      body: formData
    });
    if (response.ok) {
      let result = await response.json();
      alert(result.message);
      regForm.reset();
      regForm.classList.add('form--sending');
    } else {
      alert('error');
      regForm.classList.add('form--sending');
    }

  }
  

  // try {
  //   // Example: Send form data using Fetch API
  //   const response = await fetch('your-api-endpoint', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   });

  //   // Handle the response data
  //   const data = await response.json();
  //   console.log(data);

  //   // Optionally reset the form or perform other actions
  //   resetForm(regForm);
  // } catch (error) {
  //   // Handle errors
  //   console.error('Error:', error);
  // }
}

// Attach the named function to the onSuccess event
