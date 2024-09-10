const validations = () => {
  const formName = document.querySelector('.form-name');
  const formMail = document.querySelector('.form-mail');
  const formPhoneNumber = document.querySelector('.form-phone-number');

  let result = true;

  const errorMessages = {
    name: 'Имя не указано',
    email: 'Неверный email',
    phone: 'Неверный номер телефона'
  };

  if (formName.value.trim().length <= 2) {
    createError(formName, errorMessages.name);
    result = false;
  } else {
    removeError(formName);
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(formMail.value)) {
    createError(formMail, errorMessages.email);
    result = false;
  } else {
    removeError(formMail);
  }

  const phoneNumberRegex = /^[+() -]?(\d[\d ()-]*){10,14}$/;
  if (!phoneNumberRegex.test(formPhoneNumber.value)) {
    createError(formPhoneNumber, errorMessages.phone);
    result = false;
  } else {
    removeError(formPhoneNumber);
  }

  return result;
};

const createError = (htmlElement, errorMessage) => {
  const parent = htmlElement.parentNode;
  const currentErrorLabel = parent.querySelector('.error-label');

  if (!currentErrorLabel) {
    parent.classList.add('error-label');
    const errorLabel = document.createElement('label');
    errorLabel.classList.add('error-label');
    errorLabel.textContent = errorMessage;
    parent.append(errorLabel);
    htmlElement.classList.add('error');
  }
};

const removeError = (htmlElement) => {
  const parent = htmlElement.parentNode;
  const errorLabel = parent.querySelector('.error-label');

  if (errorLabel) {
    parent.removeChild(errorLabel);
    parent.classList.remove('error-label');
    htmlElement.classList.remove('error');
  }
};

document.querySelector('.form-wrapper').addEventListener('submit', event => {
  event.preventDefault();

  if (validations()) {
    alert('Форма проверена успешно');
  }
});