import { describe, expect, it } from 'vitest'
import { TextCounter, TextStatistics } from 'glyphalyze'

describe('glyphalyze TextCounter', () => {
  it('counts characters, including spaces', () => {
    expect(new TextCounter('cat dog cat. Hi all!').countCharacters()).toBe(20)
  })

  it('counts emoji as a single character', () => {
    expect(new TextCounter('Hi 👍🏽').countCharacters()).toBe(4)
  })

  it('counts words while ignoring punctuation', () => {
    expect(new TextCounter('cat dog cat. Hi all!').countWords()).toBe(5)
  })

  it('counts sentences', () => {
    expect(new TextCounter('cat dog cat. Hi all!').countSentences()).toBe(2)
  })

  it('returns case-insensitive word frequencies', () => {
    expect(new TextCounter('Cat dog cat. Hi all!').wordFrequency()).toEqual({
      cat: 2,
      dog: 1,
      hi: 1,
      all: 1
    })
  })
})

describe('glyphalyze TextStatistics', () => {
  it('calculates average word length', () => {
    expect(new TextStatistics('cat dog cat. Hi all!').avgWordLength()).toBe(2.8)
  })

  it('calculates average words per sentence', () => {
    expect(new TextStatistics('cat dog cat. Hi all!').avgSentenceLength()).toBe(2.5)
  })

  it('returns zero for average lengths when there are no words', () => {
    const statistics = new TextStatistics('')

    expect(statistics.avgWordLength()).toBe(0)
    expect(statistics.avgSentenceLength()).toBe(0)
  })

  it('calculates reading time in seconds for the given words per minute', () => {
    expect(new TextStatistics('cat dog cat. Hi all!').readingTime(200)).toBe(1.5)
  })
})
