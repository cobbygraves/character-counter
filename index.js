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
const readingValue = document.querySelector('.reading-time span')
const densityContainer = document.querySelector('.density-container')
const characterContainer = document.querySelector('.character-container')
const emptyCharacter = document.querySelector('#empty-character')
const showMore = document.querySelector('.show-more')
const seeMore = document.querySelector('.show-more span')
const seeMoreImg = document.querySelector('.show-more img')

let progressData = []
let ignoreSpace = false
let textContent = ''
let isDark = true

//assign character array
const assignCharacterArray = (sentence) => {
  progressData = []
  for (let i = 0; i < sentence.length; i++) {
    if (progressData.length === 0) {
      progressData.push({ character: sentence[i], value: 1 })
    } else {
      if (progressData.some((obj) => obj.character === sentence[i])) {
        let modifiedData = progressData.map((item) => {
          if (item.character === sentence[i]) {
            item.value += 1
          }
          return item
        })
        progressData = modifiedData
      } else {
        progressData.push({ character: sentence[i], value: 1 })
      }
    }
  }
}

//rendering progress bars
const renderProgressData = (dataArray) => {
  if (characterContainer) {
    characterContainer.innerHTML = ''
    const textContentWithoutSpace = textContent.replace(/\s/g, '')
    dataArray.sort((a, b) => b.value - a.value)
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].character === ' ') {
        continue
      }
      if (dataArray[i].value > 0) {
        const characterProgress = document.createElement('div')
        characterProgress.classList.add('density-progress')
        characterProgress.innerHTML = `<div class="progress-character">${dataArray[
          i
        ].character.toUpperCase()}</div>
              <div class="progress-inactive">
                <div class="progress-active" style="width: ${(
                  (dataArray[i].value / textContentWithoutSpace.length) *
                  100
                ).toFixed(2)}%"></div>
              </div>
              <div class="density-value">${dataArray[i].value} (${(
          (dataArray[i].value / textContentWithoutSpace.length) *
          100
        ).toFixed(2)}%)</div>`
        characterContainer.appendChild(characterProgress)
      }
    }
  }
}

// Switching between light and dark mode
themeSwitch?.addEventListener('click', () => {
  if (!isDark) {
    isDark = !isDark
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
    isDark = !isDark
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
textEntry?.addEventListener('focus', () => {
  textEntry.style.border = '1px solid #d3a0fa'
  textEntry.style.boxShadow = '0px 0px 5px 1px #d3a0fa'
})

//textarea blured event handler
textEntry?.addEventListener('blur', () => {
  textEntry.style.border = '1px solid #2a2b37'
  textEntry.style.boxShadow = 'none'
})

//calculate word count
const calculateWordCount = (sentence) => {
  const wordsArray = sentence.split(' ')
  const filteredWords = wordsArray.filter((word) => word.trim() !== '')
  return filteredWords.length
}

//calculate estimated reading time
const estimatedReadingTime = (sentence) => {
  if (sentence.trim().length === 0) {
    return 0
  }
  const numberOfWords = sentence.trim().split(' ').length

  if (numberOfWords <= 200) {
    return 1
  } else if (numberOfWords <= 400) {
    return 2
  } else {
    return 3
  }
}

//calculate sentence count
const calculateSentenceCount = (sentence) => {
  return sentence.split(/[.!?}]+/).length - 1
}

// calculate character count
const calculateCharacterCount = (sentence, ignoreSpace) => {
  let textContent = sentence.trim()

  if (ignoreSpace) {
    textContent = sentence.replace(/\s+/g, '').trim()
  }

  return textContent.length
}

const textEntryHandler = (e) => {
  const maxCharacters = parseInt(characterLimit?.value) // Default limit if not set
  textContent = e.target.value

  // **Prevent typing beyond maxCharacters**
  if (textContent.length > maxCharacters) {
    e.target.value = textContent.substring(0, maxCharacters) // Truncate the excess characters
    textContent = e.target.value
  }

  // **Handle visibility of empty character message**
  if (emptyCharacter) {
    emptyCharacter.style.display = textContent.length > 0 ? 'none' : 'block'
  }

  // **Apply character limit warning**
  if (characterLimit && textEntry && limitValue && limitWarning && limit) {
    if (textContent.length >= maxCharacters && limit.checked) {
      textEntry.style.border = '1px solid red'
      textEntry.style.boxShadow = '0px 0px 5px 1px red'
      limitWarning.style.display = 'flex'
      limitValue.innerHTML = maxCharacters
    } else {
      textEntry.style.border = '1px solid #d3a0fa'
      textEntry.style.boxShadow = '0px 0px 5px 1px #d3a0fa'
      limitWarning.style.display = 'none'
    }
  }

  // **Update counts and reading time**
  if (
    sentenceCountValue &&
    wordCountValue &&
    characterCountValue &&
    readingValue
  ) {
    sentenceCountValue.innerText = calculateSentenceCount(textContent)
      .toString()
      .padStart(2, '0')
    wordCountValue.innerText = calculateWordCount(textContent)
      .toString()
      .padStart(2, '0')
    characterCountValue.innerText = calculateCharacterCount(
      textContent,
      ignoreSpace
    )
      .toString()
      .padStart(2, '0')
    readingValue.innerHTML = estimatedReadingTime(textContent)
  }

  // **Update progress data**
  assignCharacterArray(textContent)
  const slicedData =
    progressData.length > 5 ? progressData.slice(0, 5) : progressData
  renderProgressData(slicedData)

  if (showMore) {
    showMore.style.display = progressData.length > 5 ? 'block' : 'none'
  }
}

//handle textarea change event
textEntry?.addEventListener('input', textEntryHandler)

//handle limit error message
limit?.addEventListener('click', () => {
  if (limit.checked) {
    characterLimit.style.display = 'block'
  } else {
    characterLimit.style.display = 'none'
  }
})

//handle spaces event listener
spaces?.addEventListener('click', () => {
  if (spaces.checked) {
    ignoreSpace = true
  } else {
    ignoreSpace = false
  }
})

//show more handler
showMore?.addEventListener('click', () => {
  if (seeMore.innerHTML === 'See less') {
    seeMore.innerHTML = 'See More'
    seeMoreImg.className = 'rotate'
    seeMoreImg.classList.remove('rotate')
    const slicedData = progressData.slice(0, 5)
    renderProgressData(slicedData)
  } else {
    seeMore.innerHTML = 'See less'
    seeMoreImg.className = 'rotate'
    const slicedData = progressData.slice(0)
    renderProgressData(slicedData)
  }
})

//handle character limit event listener
characterLimit?.addEventListener('input', (e) => {
  if (limit.checked && textContent.length < parseInt(e.target.value)) {
    textEntry.style.border = '1px solid #d3a0fa'
    textEntry.style.boxShadow = '0px 0px 5px 1px #d3a0fa'
    limitWarning.style.display = 'none'
  } else {
    textEntry.style.border = '1px solid red'
    textEntry.style.boxShadow = '0px 0px 5px 1px red'
    limitWarning.style.display = 'flex'
    limitValue.innerHTML = characterLimit.value
  }
})

module.exports = {
  textEntryHandler,
  calculateCharacterCount,
  calculateSentenceCount,
  calculateWordCount,
  estimatedReadingTime
}
