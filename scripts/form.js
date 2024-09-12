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
    const request = await fetch('https://nkts-projects-be.onrender.com/api/projects',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({data: formData}),
      });
    return await request.json();
  } catch (error) {
    throw new Error(`ERROR`);
  }
};

const clearFormFields = () =>  {
  document.querySelectorAll('.form-name, .form-mail, .form-phone-number, .form-company-name').forEach(input => input.value = '');
  document.querySelector('.form-project__description').value = '';
  selectedProject = null;
  formChecks.forEach((elem) => {
    elem.classList.remove('active');
  });
}

document.querySelector('.form-wrapper').addEventListener('submit', async (e) => {
  e.preventDefault();

  if (validations()) {
    console.log('Start');

    const fullPageBlur = document.querySelector('.full-page-wrapper');
    const loader = document.querySelector('.loader');

    fullPageBlur.classList.add('loader-blur');
    loader.classList.add('show');

    try {
      const resp = await postData();
      console.log(resp);
    } catch (error) {
      alert(`Ошибка при отправке данных`);
    } finally {
      setTimeout(() => {
        fullPageBlur.classList.remove('loader-blur');
        loader.classList.remove('show');
      }, 1500);
    }
    clearFormFields();
  }
});