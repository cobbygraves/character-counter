const themeSwitch = document.querySelector('.theme-switch')
const textEntry = document.querySelector('#text-entry')
const characterLimit = document.querySelector('#character-limit')
const spaces = document.querySelector('#activate-spaces')
const limit = document.querySelector('#activate-limit')
const limitWarning = document.querySelector('#limit-warning')
const limitValue = document.querySelector('#limit-value')
const characterCountValue = document.querySelector('#character-count')
const sentenceCountValue = document.querySelector('#sentence-count')
const wordCountValue = document.querySelector('#word-count')
const readingValue = document.querySelector('.reading-value')
const densityContainer = document.querySelector('.density-container')
const characterContainer = document.querySelector('.character-container')
const emptyCharacter = document.querySelector('#empty-character')

let lastCharacter = ''
let progressData = []
let ignoreSpace = true
let textContent = ''
let tracker = 0
let isDark = true
const blackListedKeys = ['Backspace', 'Shift']

const onBackspaceInfo = (character) => {
  let modifiedData = progressData.map((item) => {
    if (item.character === character) {
      item.value -= 1
    }
    return item
  })
  progressData = modifiedData
}

const progressInfo = (character) => {
  if (character === ' ') {
    return
  }
  if (progressData.length === 0) {
    progressData.push({ character, value: 1 })
  } else {
    if (progressData.some((obj) => obj.character === character)) {
      let modifiedData = progressData.map((item) => {
        if (item.character === character) {
          item.value += 1
        }
        return item
      })
      progressData = modifiedData
    } else {
      progressData.push({ character, value: 1 })
    }
  }
}

const renderProgressData = (dataArray) => {
  characterContainer.innerHTML = ''
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].value > 0) {
      const characterProgress = document.createElement('div')
      characterProgress.classList.add('density-progress')
      characterProgress.innerHTML = `<div class="progress-character">${
        dataArray[i].character
      }</div>
            <div class="progress-inactive">
              <div class="progress-active" style="width: ${(
                (dataArray[i].value / textContent.length) *
                100
              ).toFixed(2)}%"></div>
            </div>
            <div class="density-value">${dataArray[i].value} (${(
        (dataArray[i].value / textContent.length) *
        100
      ).toFixed(2)}%)</div>`
      characterContainer.appendChild(characterProgress)
    }
  }
}

// Switching between light and dark mode
themeSwitch.addEventListener('click', () => {
  if (isDark) {
    isDark = false
    characterLimit.style.color = 'black'
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
    characterLimit.style.color = 'white'
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

//textarea focused event handler
textEntry.addEventListener('focus', () => {
  textEntry.style.border = '1px solid #d3a0fa'
  textEntry.style.boxShadow = '0px 0px 5px 1px #d3a0fa'
})

//textarea blured event handler
textEntry.addEventListener('blur', () => {
  textEntry.style.border = '1px solid #2a2b37'
  textEntry.style.boxShadow = 'none'
})

//calculate word count
const calculateWordCount = (sentence) => {
  const numberOfWords = sentence.trim().split(' ').length
  if (numberOfWords <= 200) {
    readingValue.innerText = 1
  } else if (numberOfWords <= 400) {
    readingValue.innerText = 2
  } else {
    readingValue.innerText = 3
  }

  if (sentence.length === 0) {
    readingValue.innerText = 0
  }
  return numberOfWords > 1 ? numberOfWords : 0
}

//calculate sentence count
const calculateSentenceCount = (sentence) => {
  return sentence.split('.').length - 1
}

//handle textarea change event
textEntry.addEventListener('keydown', (e) => {
  if (blackListedKeys.includes(e.key)) {
    lastCharacter = textContent[textContent.length - 1]
    textContent = textContent.slice(0, textContent.length - 1)
    tracker = tracker - 1 < 0 ? 0 : tracker - 1
    onBackspaceInfo(lastCharacter)
    console.log(progressData)
  } else {
    lastCharacter = e.key
    tracker = tracker + 1
    textContent = textContent + e.key
    progressInfo(e.key)
    console.log(progressData)
  }

  if (textContent.length > 0) {
    emptyCharacter.style.display = 'none'
  } else {
    emptyCharacter.style.display = 'block'
  }

  if (
    textContent !== '' &&
    parseInt(characterLimit.value) > 0 &&
    limit.checked &&
    tracker >= parseInt(characterLimit.value)
  ) {
    textEntry.style.border = '1px solid red'
    textEntry.style.boxShadow = '0px 0px 5px 1px red'
    limitWarning.style.display = 'flex'
    limitValue.innerHTML = characterLimit.value
  } else {
    textEntry.style.border = '1px solid #d3a0fa'
    textEntry.style.boxShadow = '0px 0px 5px 1px #d3a0fa'
    limitWarning.style.display = 'none'
  }
  characterCountValue.innerText = tracker.toString().padStart(2, 0)
  sentenceCountValue.innerText = calculateSentenceCount(textContent)
    .toString()
    .padStart(2, 0)
  wordCountValue.innerText = calculateWordCount(textContent)
    .toString()
    .padStart(2, 0)
  renderProgressData(progressData)
})

//handle limit error message
limit.addEventListener('click', () => {
  if (limit.checked) {
    characterLimit.style.display = 'block'
  } else {
    characterLimit.style.display = 'none'
  }
})

//handle spaces event listener
spaces.addEventListener('click', () => {
  if (spaces.checked) {
    ignoreSpace = true
  } else {
    ignoreSpace = false
  }
})
