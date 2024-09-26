'use strict';

const get = async () => {
  const r = await fetch('https://nkts-projects-be.onrender.com/api/projects');
  const res = await r.json();
  return res;
};

const renderElement = array => {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${array[i].id}</th>
          <td class="name">${array[i].name}</td>
            <td class="email">${array[i].email}</td>
            <td class="phone">${array[i].phone}</td>
            <td class="company-name">${array[i].company_name}</td>
            <td class="selected-project">${array[i].type}</td>
            <td class="edit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></td>
      `;

    const table = document.getElementById('table-body');
    table.appendChild(row);

    row.querySelector('.edit').addEventListener('click', () => {
      window.location.href = './edit-page.html';
    });
  }
};

const initPage = async () => {
  const resp = await get();

  const typeProject = {
    Website: 'Веб-сайт',
    MobileApp: 'Мобильное приложение',
    WebApp: 'Веб-приложение',
    UXUIDesign: 'UX/UI дизайн',
    ChatBot: 'Чат-бот',
    CRMSystem: 'CRM система'
  };

  const newResp = resp.data.map(res => {
    return {
      id: res.id,
      name: res.attributes.name,
      email: res.attributes.email,
      phone: res.attributes.phone,
      company_name: res.attributes.phone,
      type: typeProject[res.attributes.type]
    };
  });

  renderElement(newResp);
};

initPage();
