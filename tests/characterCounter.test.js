const {
  calculateCharacterCount,
  calculateSentenceCount,
  calculateWordCount,
  estimatedReadingTime,
  updateCounters
} = require('../index')
const { beforeEach } = require('node:test')

describe('character count functionality', () => {
  test('character count should include spaces', () => {
    expect(calculateCharacterCount('hello world', false)).toBe(11)
  })
  test('character count should ignore spaces', () => {
    expect(calculateCharacterCount('hello world', true)).toBe(10)
  })
  test('character count should not count empty content', () => {
    expect(calculateCharacterCount('  ')).toBe(0)
  })
  test('character count should not count spaces before and after a sentence', () => {
    expect(calculateCharacterCount(' hello ')).toBe(5)
  })
  test('character count should count special characters', () => {
    expect(calculateCharacterCount('Hey!!!, what do you think you are doing?.')).toBe(41)
  })
})

//testing words count funtionality
test('count words in a string', () => {
  expect(calculateWordCount('hello world')).toBe(2)
})

//testing sentence count funtionality
test('count sentence in a string that ends with puntuation', () => {
  expect(calculateSentenceCount('hello world. Are you the person?')).toBe(2)
})

test('check estimated reading time is less than 2 minutes', () => {
  expect(
    estimatedReadingTime(
      ' Est amet do veniam laboris nulla culpa ad velit. Exercitation sunt laborum ea aliqua in dolore. Quis excepteur pariatur sint adipisicing reprehenderit sint sit aliqua Lorem. Est proident exercitation ipsum nisi esse laborum aute in. Officia nostrud veniam pariatur voluptate id ad aliquip sint eiusmod. Culpa fugiat occaecat dolore et sint dolor cillum duis minim fugiat quis dolor fugiat. Quis aute eiusmod ut dolore mollit Lorem amet commodo. Est nisi occaecat nisi qui eiusmod minim. Ex elit nostrud culpa labore cupidatat enim. Do in cillum Lorem non exercitation ut eiusmod. Sint non veniam consequat aute. Aliquip est laborum Lorem consectetur cillum enim eiusmod Lorem fugiat mollit aliqua adipisicing. Aliqua pariatur eu incididunt proident voluptate excepteur ex. Est amet do veniam laboris nulla culpa ad velit. Exercitation sunt laborum ea aliqua in dolore. Quis excepteur pariatur sint adipisicing reprehenderit sint sit aliqua Lorem. Est proident exercitation ipsum nisi esse laborum aute in. Officia nostrud veniam pariatur voluptate id ad aliquip sint eiusmod. Culpa fugiat occaecat dolore et sint dolor cillum duis minim fugiat quis dolor fugiat. Quis aute eiusmod ut dolore mollit Lorem amet commodo. Est nisi occaecat nisi qui eiusmod minim. Ex elit nostrud culpa labore cupidatat enim. Do in cillum Lorem non exercitation ut eiusmod. Sint non veniam consequat aute. Aliquip est laborum Lorem consectetur cillum enim eiusmod Lorem fugiat mollit aliqua adipisicing. Aliqua pariatur eu incididunt proident voluptate excepteur ex. Est amet do veniam laboris nulla culpa ad velit. Exercitation sunt laborum ea aliqua in dolore. Quis excepteur pariatur sint adipisicing reprehenderit sint sit aliqua Lorem. Est proident exercitation ipsum nisi esse laborum aute in. Officia nostrud veniam pariatur voluptate id ad aliquip sint eiusmod. Culpa fugiat occaecat dolore et sint dolor cillum duis minim fugiat quis dolor fugiat. Quis aute eiusmod ut dolore mollit Lorem amet commodo. Est nisi occaecat nisi qui eiusmod minim. Ex elit nostrud culpa labore cupidatat enim. Do in cillum Lorem non exercitation ut eiusmod. Sint non veniam consequat aute. Aliquip est laborum Lorem consectetur cillum enim eiusmod Lorem fugiat mollit aliqua adipisicing. Aliqua pariatur eu incididunt proident voluptate excepteur ex.'
    )
  ).toBe(2)
})

describe('textarea event handling', () => {
  let textArea, characterCount, wordCount, sentenceCount, readingTime
  beforeEach(() => {
    document.body.innerHTML = ''
  })
  textArea = document.createElement('textarea')
  characterCount = document.createElement('h2')
  wordCount = document.createElement('h2')
  sentenceCount = document.createElement('h2')
  readingTime = document.createElement('p')

  test('should update character counter dynamically as the user types', () => {
    textArea.value = 'Hello, this is a test case.'
    updateCounters(
      textArea,
      characterCount,
      wordCount,
      sentenceCount,
      readingTime
    )
    expect(characterCount.textContent).toBe('27')
    expect(wordCount.textContent).toBe('6')
    expect(sentenceCount.textContent).toBe('1')
    expect(readingTime.textContent).toBe('1')
  })

  test('should show zero count values for character count', () => {
    textArea.value = '          '
    updateCounters(
      textArea,
      characterCount,
      wordCount,
      sentenceCount,
      readingTime
    )
    expect(characterCount.textContent).toBe('0')
    expect(wordCount.textContent).toBe('0')
    expect(sentenceCount.textContent).toBe('0')
    expect(readingTime.textContent).toBe('0')
  })
})
