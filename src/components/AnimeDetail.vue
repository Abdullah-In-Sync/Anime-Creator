<template>
  <div>
    <!-- Paragraph Section -->
    <div class="flex justify-center sm:mx-5">
      <div class="space-y-3 my-3 mx-4 sm:my-12 text-gray-600 sm:text-lg mb-10 w-full lg:w-[60%]">
        <p v-html="para1" />
        <p v-html="para2" />
        <p v-html="para3" />
        <img
          :src="content.mainImage"
          alt=""
          class="block lg:hidden rounded-xl w-full sm:h-[38rem] object-cover"
        />
        <p v-html="para4" />
      </div>
      <img
        :src="content.mainImage"
        alt=""
        class="hidden lg:block rounded-xl w-[40%] sm:my-12 h-[38rem] object-cover"
      />
    </div>
    <!-- Logo Section -->
    <div
      class="w-full flex flex-col sm:flex-row justify-center sm:items-start items-center bg-gray-200 py-6"
    >
      <img
        :src="content.logo"
        alt=""
        class="w-16 h-16 sm:h-44 sm:w-44 object-cover rounded-2xl mb-2"
      />
      <div class="sm:ml-5">
        <div class="mb-6">
          <h1 class="text-sm sm:text-lg text-center sm:text-left font-semibold">
            {{ content.title }}
          </h1>
          <p class="text-xs sm:text-base text-center text-gray-500">{{ content.subTitle }}</p>
        </div>
        <div class="flex justify-center flex-col sm:block">
          <button
            @click="refreshCharacter"
            class="rounded-2xl bg-gray-300 font-bold text-blue-500 hover:text-white hover:bg-blue-500 px-4 pt-1 pb-2 text-sm text-center"
          >
            Refresh
          </button>
          <p class="text-xs text-center sm:text-start">In-App Purchase</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useAnimeStore } from '../stores/anime'

const animeStore = useAnimeStore()

// Anime Content for anime detail page
const { para1, para2, para3, para4 } = animeStore.getParagraphs

/** Computed Property to get the anime data */
const content = computed(() => animeStore.getContent)

/**
 * Fetch new data on refresh
 */
async function refreshCharacter() {
  await animeStore.generateTokenAndFetchContent()
}
</script>
