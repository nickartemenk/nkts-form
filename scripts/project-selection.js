const formChecks = document.querySelectorAll('.form-check');

let selectedProject = null;

formChecks.forEach((elem) =>{
  elem.addEventListener(`click`, (e) => {
    const parent = e.target.tagName === `DIV` ? e.target : e.target.closest(`.form-check`);

    if (parent.classList.contains('active')) {
      parent.classList.remove('active');
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