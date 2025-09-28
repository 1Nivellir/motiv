<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import getLocation from '@/utils/get-location'
onMounted(async () => {
  const location = await getLocation()
  console.log(location)
})
</script>
