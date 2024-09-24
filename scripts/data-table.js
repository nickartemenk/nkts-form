new DataTable('#example');


const editBtn = document.querySelectorAll('.edit');

editBtn.forEach(elem => {
    elem.addEventListener(`click`, () => {
        window.location.href = './edit-page.html';
    });
  });