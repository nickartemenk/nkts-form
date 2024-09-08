const formChecks = document.querySelectorAll('.form-check');

formChecks.forEach((elem) =>{
  elem.addEventListener(`click`, (e) => {
    // console.log(`e`, e.target.tagName);
    const parent = e.target.tagName === `DIV` ? e.target : e.target.parentElement || e.target.closest(`.form-check`);
    console.log(parent);

    if (parent.classList.contains('active')) {
      parent.classList.remove('active');
    } else {
      formChecks.forEach((item) => {
        item.classList.remove(`active`);
      })

      elem.classList.toggle('active');
    }
  });
});