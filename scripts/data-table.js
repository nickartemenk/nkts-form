'use strict';

const get = async () => {
  const r = await fetch('https://nkts-projects-be.onrender.com/api/projects');
  const res = await r.json();
  return res;
};

const renderElement = array => {
  const table = document.getElementById('table-body');

  for (let i = 0; i < array.length; i++) {
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

    table.appendChild(row);

    row.querySelector('.edit').addEventListener('click', () => {
      row.setAttribute('data-id', array[i].id); 
      row.setAttribute('data-project', JSON.stringify(array[i]));
      const projectData = JSON.parse(row.getAttribute('data-project'));
      window.location.href = './edit-page.html?id=' + projectData.id;
    });
  }
};

const initPage = async () => {
  const resp = await get();
  const TYPE_PROJECT = {
    Website: 'Веб-сайт',
    MobileApp: 'Мобильное приложение',
    WebApp: 'Веб-приложение',
    UXUIDesign: 'UX/UI дизайн',
    ChatBot: 'Чат-бот',
    CRMSystem: 'CRM система'
  };

  let currentPage = 1;
  const itemsOnPage = 1; 

  const fetchProjects = async (page) => {
    const offset = (page - 1) * itemsOnPage;
    const filteredResp = resp.data.slice(offset, offset + itemsOnPage);
    
    return filteredResp.map(res => {
      return {
        id: res.id,
        name: res.attributes.name,
        email: res.attributes.email,
        phone: res.attributes.phone,
        company_name: res.attributes.company_name,
        type: TYPE_PROJECT[res.attributes.type]
      };
    });
  };

  const renderCurrentPage = async (projects) => {

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    renderElement(projects);
  };

  // const updatePagination = async () => {
  //   const projects = await fetchProjects(currentPage);
  //   await renderCurrentPage(projects);
  
  //   const handlePaginationClick = async (page) => {
  //     currentPage = page;
  //     await updatePagination();
  //   };
  
  //   const paginationButtons = document.querySelectorAll('.page-item');
    
  //   paginationButtons.forEach(button => {
  //     button.addEventListener('click', async () => {
  //       const pageNumber = parseInt(button.querySelector('.page-link').textContent);
  //       await handlePaginationClick(pageNumber);
  //     });
  //   });

  //   localStorage.setItem('currentPage', currentPage);
    
  // };

  const updatePagination = async () => {
    const projects = await fetchProjects(currentPage);
    await renderCurrentPage(projects);

    const totalProjects = resp.data.length;
    const totalPages = totalProjects / itemsOnPage;
    
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    const prevBtn = document.createElement('li');
    prevBtn.className = 'page-prev';
    prevBtn.innerHTML = '<a>Previous</a>';
    paginationContainer.appendChild(prevBtn);

    const firstPageBtn = document.createElement('li');
    firstPageBtn.className = 'page-item';
    firstPageBtn.innerHTML = '<a class="page-link" href="#1">1</a>';
    paginationContainer.appendChild(firstPageBtn);

    for (let i = 2; i <= totalPages; i++) {
      const pageBtn = document.createElement('li');
      pageBtn.className = 'page-item';
      pageBtn.innerHTML = `<a class="page-link" href="#${i}">${i}</a>`;
      paginationContainer.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('li');
    nextBtn.className = 'page-next';
    nextBtn.innerHTML = '<a>Next</a>';
    paginationContainer.appendChild(nextBtn);

    // prevBtn.disabled = currentPage === 1;
    // nextBtn.disabled = currentPage === totalPages;

    // paginationContainer.addEventListener('click', async (e) => {
    //   const pageNumber = parseInt(e.target.textContent);
    //   currentPage = pageNumber;
    //   await updatePagination();
    // });

    const pageItemButtons = document.querySelectorAll('.page-item');
  pageItemButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const pageNumber = parseInt(e.target.textContent);
        currentPage = pageNumber;
        await updatePagination();
    });
  });

    prevBtn.addEventListener('click',async  () => {
      if (currentPage > 1) {
        console.log(currentPage);
        
        currentPage--;
        await updatePagination();
      }
    });
    
    nextBtn.addEventListener('click',async  () => {
      if (currentPage * itemsOnPage < resp.data.length) {
        currentPage++;
        await updatePagination();
      }
    });

    localStorage.setItem('currentPage', currentPage);

    console.log('prevbtn', prevBtn);
    
  };

  const storedPage = parseInt(localStorage.getItem('currentPage') || '1');

  currentPage = storedPage > 0 ? storedPage : 1;

  updatePagination();
};

window.addEventListener('load', initPage);
















// const initPage = async () => {
//   const resp = await get();

//   const TYPE_PROJECT = {
//     Website: 'Веб-сайт',
//     MobileApp: 'Мобильное приложение',
//     WebApp: 'Веб-приложение',
//     UXUIDesign: 'UX/UI дизайн',
//     ChatBot: 'Чат-бот',
//     CRMSystem: 'CRM система'
//   };

//   const newResp = resp.data.map(res => {
//     return {
//       id: res.id,
//       name: res.attributes.name,
//       email: res.attributes.email,
//       phone: res.attributes.phone,
//       company_name: res.attributes.company_name,
//       type: TYPE_PROJECT[res.attributes.type]
//     };
//   });





// let currentPage = 1;
//   const itemsPerPage = 1;
//   const totalPages = newResp.length / itemsPerPage;

//   // renderElement(newResp[currentPage - 1]);

//   const prevButton = document.getElementById('prev-btn');
//   const nextButton = document.getElementById('next-btn');

//   prevButton.addEventListener('click', () => {
//     if (currentPage > 1) {
//       currentPage--;
//       updatePagination(currentPage);
//     }
//   });

//   nextButton.addEventListener('click', () => {
//     if (currentPage < totalPages) {
//       currentPage++;
//       updatePagination(currentPage);
//     }
//   });

//   function updatePagination(page) {
//     const tableBody = document.getElementById('table-body');
//     tableBody.innerHTML = ''; 

//     if (page <= totalPages && page >= 1) {
//       renderElement(newResp[page - 1]);
//     }

//     prevButton.disabled = currentPage === 1;
//     nextButton.disabled = currentPage === totalPages;
//   }