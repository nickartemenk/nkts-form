const formChecks = document.querySelectorAll('.form-check');

let selectedProject = null;

formChecks.forEach((elem) =>{
  elem.addEventListener(`click`, () => {
    if (elem.classList.contains('active')) {
      elem.classList.remove('active');
      selectedProject = null;
    } else {
      formChecks.forEach((item) => {
        item.classList.remove(`active`);
      })
      elem.classList.toggle('active');
      selectedProject = elem.dataset.value;
    }
  });
});

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

const getFormData = () => ({
  name: document.querySelector('.form-name').value,
  email: document.querySelector('.form-mail').value,
  phone: document.querySelector('.form-phone-number').value,
  company_name: document.querySelector('.form-company-name').value,
  type: selectedProject,
  description: document.querySelector('.form-project__description').value
});

const postData = async () => {
  try {
    const formData = getFormData();
    const response = await fetch('https://nkts-projects-be.onrender.com/api/projects',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({data: formData}),
      });
    return await response.json();
  } catch (error) {
    throw new Error(`ERROR`);
  }
};

const showServerError = () => {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'server-error-message';
  errorDiv.textContent = 'Упс... Что-то пошло не так. Попробуйте позже.';

  const formWrapper = document.querySelector('.form-wrapper');
  const existingError = formWrapper.querySelector('.server-error-message');

  if (existingError) {
    existingError.remove();
  }

  formWrapper.appendChild(errorDiv);
};

const clearFormFields = () =>  {
  document.querySelectorAll('.form-name, .form-mail, .form-phone-number, .form-company-name, .form-project__description').forEach(input => input.value = '');
  selectedProject = null;
  formChecks.forEach((elem) => {
    elem.classList.remove('active');
  });
}

const form = document.querySelector('.form-wrapper');
  form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (validations()) {

    const loader = document.querySelector('.loader');
    const formBlur = document.querySelector('.form-blur');

    formBlur.classList.add('loader-blur');
    loader.classList.add('show');

    try {
      const resp = await postData();
      clearFormFields();
      const errorDiv = document.querySelector('.server-error-message');
      if (errorDiv) {
        errorDiv.remove();
      }
    } catch {
      showServerError();
    } finally {
      formBlur.classList.remove('loader-blur');
        loader.classList.remove('show');
    }
  }
});