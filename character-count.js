//calculate word count
function calculateWordCount(sentence) {
  const wordsArray = sentence.split(' ')
  const filteredWords = wordsArray.filter((word) => word.trim() !== '')
  return filteredWords.length
}

//calculate estimated reading time
function estimatedReadingTime(sentence) {
  if (sentence.length === 0) {
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
function calculateSentenceCount(sentence) {
  return sentence.split(/[.!?}]+/).length - 1
}

// calculate character count
function calculateCharacterCount(sentence, ignoreSpace) {
  let textContent = sentence.trim()

  if (ignoreSpace) {
    textContent = sentence.replace(/\s+/g, '').trim()
  }

  return textContent.length
}

function updateCounters(
  textArea,
  characterCount,
  wordCount,
  sentenceCount,
  estimatedTime
) {
  let text = textArea.value
  characterCount.textContent = calculateCharacterCount(text)
  wordCount.textContent = calculateWordCount(text)
  sentenceCount.textContent = calculateSentenceCount(text)
  estimatedTime.textContent = estimatedReadingTime(text)
}

module.exports = {
  estimatedReadingTime,
  calculateCharacterCount,
  calculateSentenceCount,
  calculateWordCount,
  estimatedReadingTime,
  updateCounters
}
