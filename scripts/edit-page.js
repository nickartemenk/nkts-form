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

const initPage = async () => {
    const resp = await get();

    const newResp = {
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

};

initPage();