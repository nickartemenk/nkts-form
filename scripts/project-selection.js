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