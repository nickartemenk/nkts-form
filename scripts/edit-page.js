'use strict';

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

const get = async () => {
    const r = await fetch(`https://nkts-projects-be.onrender.com/api/projects/${projectId}`);
    const res = await r.json();
    return res;
};

const formChecks = document.querySelectorAll('.form-check');

let selectedProject = null;

formChecks.forEach(elem => {
    elem.addEventListener('click', () => {
        if (elem.classList.contains('active')) {
            elem.classList.remove('active');
            selectedProject = null;
        } else {
            formChecks.forEach(item => {
                item.classList.remove('active')
            })
            elem.classList.toggle('active') 
            selectedProject = elem.dataset.value
        }
    })
})

const fillFormFields = (newResp) => {
    document.querySelector('.form-name').value = newResp.name;
    document.querySelector('.form-mail').value = newResp.email;
    document.querySelector('.form-phone-number').value = newResp.phone;
    document.querySelector('.form-company-name').value = newResp.company_name;
    document.querySelector('.form-project__description').value = newResp.description;
    selectedProject = newResp.type;
    document.querySelector(`.form-check[data-value="${newResp.type}"]`).classList.add('active');
};

const initPage = async (callback) => {
    const resp = await get();

    const newResp = {
        id: resp.data.attributes.id,
        name: resp.data.attributes.name,
        id: resp.data.attributes.id,
        name: resp.data.attributes.name,
        email: resp.data.attributes.email,
        phone: resp.data.attributes.phone,
        company_name: resp.data.attributes.company_name,
        type: resp.data.attributes.type,
        description: resp.data.attributes.description
    };

    fillFormFields(newResp);
    callback && callback()

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

const clearFormFields = () => {
document
    .querySelectorAll(
    '.form-name, .form-mail, .form-phone-number, .form-company-name, .form-project__description'
    )
    .forEach(input => (input.value = ''));
selectedProject = null;
formChecks.forEach(elem => {
    elem.classList.remove('active');
});
};

const getFormData = () => ({
    id: projectId,
    name: document.querySelector('.form-name').value,
    email: document.querySelector('.form-mail').value,
    phone: document.querySelector('.form-phone-number').value,
    company_name: document.querySelector('.form-company-name').value,
    type: selectedProject,
    description: document.querySelector('.form-project__description').value
});

const showModalWindowDelete = () => {
  const modalWindow = document.querySelector('.modal-delete');
  const blackout = document.querySelector('.modal-blackout');

  modalWindow.classList.add('show');
  blackout.classList.add('show');

  document.body.style.overflow = 'hidden';

  document.addEventListener('click', event => {
    if (!modalWindow.contains(event.target)) {
      console.log('closeModalWindowDelete')
      closeModalWindowDelete();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
    e.preventDefault();
    closeModalWindowDelete();
    }
  });

  document.querySelector('.modal-close__cross').addEventListener('click', e => {
  e.preventDefault();
  closeModalWindowDelete();
  });
};

const closeModalWindowDelete = () => {
  const modalWindow = document.querySelector('.modal-delete');
  const blackout = document.querySelector('.modal-blackout');

  blackout.classList.remove('show');

  modalWindow.classList.remove('show');

  document.body.style.overflow = '';
  console.log('modal-delete')
};

const deleteProjectBtn = document.querySelector('.button-delete');

deleteProjectBtn.addEventListener('click', async (e) => {
  console.log('button-delete')
e.preventDefault();

showModalWindowDelete();
});

const modalCloseButtonYes = document.querySelector('.modal-close-button-yes');
const modalCloseButtonNo = document.querySelector('.modal-close-button-no');

modalCloseButtonYes.addEventListener('click', async (e) => {
  console.log('closeModalWindowDelete')
  e.preventDefault();
  await deleteProject();
  closeModalWindowDelete();
    window.location.href = './data-table.html';
});

modalCloseButtonNo.addEventListener('click', (e) => {
  console.log('closeModalWindowDelete')
    e.preventDefault();
    closeModalWindowDelete();
});

const deleteProject = async () => {
    try {
        const response = await fetch(`https://nkts-projects-be.onrender.com/api/projects/${projectId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            window.location.href = './data-table.html';
        } else {
            showServerError();
        }
    } catch (error) {
        showServerError();
    }
}

const editProjectBtn = document.querySelector('.button-save');

editProjectBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
        const formData = getFormData();
        const response = await fetch(
          `https://nkts-projects-be.onrender.com/api/projects/${projectId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ data: formData })
          }
        );

        if (response.ok) {
          showEditSuccessModal(() => {
            closeModalWindowEdit();
            window.location.href = './data-table.html';
          });
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
        showServerError();
    }
});

const showEditSuccessModal = (callback) => {
    const modalWindow = document.querySelector('.modal-edit');
    const blackout = document.querySelector('.modal-blackout');

    modalWindow.classList.add('show');
    blackout.classList.add('show');

    document.body.style.overflow = 'hidden';

    document.addEventListener('click', event => {
        if (!modalWindow.contains(event.target)) {
            closeModalWindowEdit();
            callback();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeModalWindowEdit();
            callback();
        }
    });

    document.querySelector('.modal-close__cross').addEventListener('click', e => {
        e.preventDefault();
        closeModalWindowEdit();
        callback();
    });
};

const closeModalWindowEdit = () => {
    const modalWindow = document.querySelector('.modal-edit');
    const blackout = document.querySelector('.modal-blackout');

    blackout.classList.remove('show');

    modalWindow.classList.remove('show');

    document.body.style.overflow = '';
};

initPage();