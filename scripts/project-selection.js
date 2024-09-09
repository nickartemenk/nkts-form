const formChecks = document.querySelectorAll('.form-check');

let selectedProject = null;

formChecks.forEach((elem) =>{
  elem.addEventListener(`click`, (e) => {
    const elem = e.target.tagName === `DIV` ? e.target : e.target.closest(`.form-check`);

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