<template>
  <div
    :class="isAnimeDetailPage ? '' : 'mx-4 h-[95vh]'"
    class="relative sm:mx-0 flex flex-col items-center"
  >
    <!-- Close Button -->
    <button
      v-if="isAnimeDetailPage"
      @click="isAnimeDetailPage = false"
      class="fixed z-10 top-2 right-2 w-8 h-8 rounded-full sm:hidden flex items-center justify-center bg-gray-300 text-gray-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
    <!-- Header Section on Thumbnail Page in mobile view -->
    <div v-if="!isAnimeDetailPage" class="w-full sm:hidden block my-4">
      <!-- Date -->
      <h3 class="font-bold text-gray-500 mt-5">
        {{ currentDate }}
      </h3>
      <div class="flex justify-between items-center">
        <h1 class="font-bold text-4xl">Today</h1>
        <div class="flex justify-center bg-gray-300 items-center w-10 h-10 rounded-full">
          <h2 class="font-bold text-xl text-center">VS</h2>
        </div>
      </div>
    </div>
    <div v-if="isAnimeDetailPage" class="absolute top-5 left-3 z-10 ml-6 max-w-[80%]">
      <!-- Sub Title -->
      <p class="font-bold text-sm text-white">MAJOR UPDATE</p>
      <h1 class="lg:font-extrabold font-bold lg:text-4xl text-3xl text-white">Only I can Call My dream Stupid!</h1>
    </div>
    <!-- Image Container -->
    <div
      class="w-full sm:rounded-none overflow-hidden"
      :class="
        isAnimeDetailPage
          ? 'border-b border-gray-400 h-[34rem] sm:h-auto'
          : 'rounded-3xl shadow-xl h-[70%]'
      "
    >
      <img
        :src="content.thumbNailImage"
        @click="isAnimeDetailPage = true"
        alt="Thumbnail Image"
        class="object-cover w-full h-[80%] sm:h-[25rem] transition duration-500 ease-in-out transform"
      />
      <!-- Logo Section -->
      <div
        class="w-full h-[20%] sm:h-auto flex items-center sm:items-start px-2 py-4 sm:px-5 lg:px-10"
      >
        <img
          :src="content.logo"
          alt=""
          class="w-16 sm:w-44 h-16 sm:h-44 object-cover rounded-2xl"
        />
        <!-- Title  -->
        <div class="w-[58%] flex-grow mx-2 sm:ml-4">
          <h1 class="text-sm font-semibold sm:font-bold sm:text-2xl">{{ content.title }}</h1>
          <p class="text-xs text-gray-500 sm:text-lg">{{ content.subTitle }}</p>
        </div>
        <!-- Refresh Button -->
        <div class="flex flex-col h-44 justify-center items-center">
          <button
            @click="refreshCharacter"
            class="rounded-2xl bg-gray-300 font-bold text-blue-500 hover:text-white hover:bg-blue-500 px-4 sm:px-8 pt-1 sm:py-2 pb-2 text-sm sm:text-lg text-center"
          >
            Refresh
          </button>
          <p class="text-[10px] md:text-xs mt-1 md:mt-2">In-App Purchase</p>
        </div>
      </div>
    </div>
    <AnimeDetail v-if="isAnimeDetailPage" />
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useAnimeStore } from '../stores/anime'
import AnimeDetail from '../components/AnimeDetail.vue'
import { useWindowSize } from '@vueuse/core'

// Window width
const { width } = useWindowSize()

const animeStore = useAnimeStore()
const currentDate = ref('')
const isAnimeDetailPage = ref(false)

/** Anime data */
const content = computed(() => animeStore.getContent)

/**
 * Function to get the current date in the mention format
 */
function getCurrentDate() {
  // Get the current date object
  const today = new Date()

  // Array of weekdays (Sunday = 0, Monday = 1, etc.)
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // Get the current day of the week (0-6)
  const currentDay = today.getDay()

  // Get the date of the month (1-31)
  const dayOfMonth = today.getDate().toString().padStart(2, '0') // Add leading zero if needed

  // Get the month (0-11) and convert it to a human-readable format (November)
  const month = today.toLocaleDateString('en-US', { month: 'long' }) // Adjust locale if needed

  // Format the output string
  const formattedDate = `${daysOfWeek[currentDay]} ${dayOfMonth} ${month}`

  currentDate.value = formattedDate.toUpperCase()
  return currentDate.value
}

/**
 * Function to handle the refresh button action
 */
async function refreshCharacter() {
  await animeStore.generateTokenAndFetchContent()
}

// Watch on window width change to automatically active the detail page in desktop view
watch(width, (val) => {
  if (val > 640) isAnimeDetailPage.value = true
  else isAnimeDetailPage.value = false
}, { immediate: true });

onMounted(async () => {
  console.log(content.value)
  getCurrentDate()
});

// Fetching the anime data from api
await animeStore.generateTokenAndFetchContent();
</script>
