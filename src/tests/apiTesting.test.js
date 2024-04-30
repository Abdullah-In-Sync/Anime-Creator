import { describe, expect, test } from 'vitest'
let token
describe("Test Cases for 'Generate Token' API", async () => {
  try {
    const email = 'abdullah.raghib.official@gmail.com'
    const response = await fetch(
      'https://swsut62sse.execute-api.ap-south-1.amazonaws.com/prod/generateToken',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      }
    )
    token = (await response.json()).token

    test('API call should return a status code of 200', () => {
      expect(response.status).toBe(200)
    })
  } catch (error) {
    expect(error.message).toBe('Network Error')
  }
})

describe("Test Cases for 'Generate Token' API", async () => {
  const keys = ['id', 'text', 'mainImage', 'thumbNailImage', 'title', 'subTitle', 'userName']
  try {
    const response = await fetch(
      'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = (await response.json()).content

    test('API call should return a status code of 201', () => {
      expect(response.status).toBe(201)
    })
    test('API call should return a valid response', () => {
      
        // Validating keys are available or not in our response
      keys.forEach((key) => {
        expect(data).toHaveProperty(key)
      })
    })
  } catch (error) {
    expect(error.message).toBe('Network Error')
  }
})
