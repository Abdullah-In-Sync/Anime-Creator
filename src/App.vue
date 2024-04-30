<template>
  <Suspense>
    <template #default>
        <AnimeMain />
    </template>
    <template #fallback>
      <!-- Loader -->
      <div
      class="absolute left-1/2 top-1/2 translate-x-[60%] sm:-translate-x-1/2 sm:-translate-y-2/3 -translate-y-[52%]
       h-full flex flex-col justify-center items-center gap-x-3 gap-y-6 "
    >
      <div class="animate-wiggle rounded-full w-3 h-3 block box-border -z-10" />
    </div>
    </template>
</Suspense>
</template>

<script setup>
import AnimeMain from './components/AnimeMain.vue'
</script>
