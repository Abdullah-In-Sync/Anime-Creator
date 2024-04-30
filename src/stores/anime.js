import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAnimeStore = defineStore('anime', () => {
  const content = ref(null)
  const title = ref('')
  const paragraphs = ref({})
  const token = ref('')

  /** Get the content state */
  const getContent = computed(() => content.value)

  /** Get the Title */
  const getTitle = computed(() => title.value)

  /** Get extracted paragraph from html */
  const getParagraphs = computed(() => paragraphs.value)

  /**
   * Generate token with the help of email
   * 
   * @param email- Email address for generating token
   * @return - Return user token
   */
  async function generateToken(email) {
    try {
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
      if (!response.ok) {
        throw new Error('API Error')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to generate token:', error)
      throw error // Rethrow the error to handle it in the calling function
    }
  }

  /**
   * Fetch anime data from API and stored in the state
   * 
   * @param - token - User token returned from the generateToken API
   * @return - return the anime data
   */
  async function getAnimeContent(token) {
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
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to fetch anime content:', error)
      throw error // Rethrow the error to handle it in the calling function
    }
  }

  /**
   * Function to generate token and fetch anime content
   */
  async function generateTokenAndFetchContent() {
    try {
      if (!token.value) {
        const tokenResponse = await generateToken('abdullah.raghib.official@gmail.com')
        token.value = tokenResponse.token
      }
      const contentResponse = await getAnimeContent(token.value)
      content.value = contentResponse.content
      extractTitleAndPara(content.value.text)
    } catch (error) {
      console.error('Failed to fetch content:', error)
    }
  }

  /**
   * Function to Extract paragraph data and save it into an object
   * 
   * @param- text - Html string
   */
  function extractTitleAndPara(text) {
    const tempElement = document.createElement('div')
    tempElement.innerHTML = text

    // Extracting title
    title.value = tempElement.querySelector('title').innerText

    // Extracting paragraphs content
    tempElement.querySelectorAll('p').forEach((paragraph, index) => {
      const words = paragraph.innerText.split(' ');
      const boldedWords = words.slice(0, 3).join(' ');
      const remainingWords = words.slice(3).join(' ');
      paragraphs.value['para' + (index + 1)] = `<b class="text-black">${boldedWords}</b> ${remainingWords}`;
    })
  }

  return { generateTokenAndFetchContent, getContent, getTitle, getParagraphs }
})
