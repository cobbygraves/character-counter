const themeSwitch = document.querySelector('.theme-switch')
let isDark = true

themeSwitch.addEventListener('click', () => {
  if (isDark) {
    isDark = false
    themeSwitch.style.backgroundColor = '#f2f2f7'
    document.body.style.backgroundImage =
      'url("./assets/images/bg-light-theme.png")'
    document.body.style.color = '#000000'
    document.querySelector('#text-entry').style.color = '#000000'
    document.querySelector('#text-entry').style.backgroundColor = '#f2f2f7'
    const progressInactive = document.querySelectorAll('.progress-inactive')
    progressInactive.forEach((element) => {
      element.style.backgroundColor = '#f2f2f7'
    })
    document
      .querySelector('#logo')
      .setAttribute('src', './assets/images/logo-light-theme.svg')
    document
      .querySelector('#theme-icon')
      .setAttribute('src', './assets/images/light-moon.png')
  } else {
    isDark = true
    themeSwitch.style.backgroundColor = '#2a2b37'
    document.querySelector('#text-entry').style.color = '#f2f2f7'
    document.querySelector('#text-entry').style.backgroundColor = '#2a2b37'
    document
      .querySelector('#logo')
      .setAttribute('src', './assets/images/logo-dark-theme.svg')
    document.body.style.backgroundImage =
      'url("./assets/images/bg-dark-theme.png")'
    document.body.style.color = '#f2f2f7'
    document
      .querySelector('#theme-icon')
      .setAttribute('src', './assets/images/icon-sun.svg')
    const progressInactive = document.querySelectorAll('.progress-inactive')
    progressInactive.forEach((element) => {
      element.style.backgroundColor = '#2a2b37'
    })
  }
})
