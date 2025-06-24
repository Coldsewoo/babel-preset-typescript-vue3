<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  initialCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['countChanged'])

const count = ref(props.initialCount)
const title = ref('JavaScript Vue 3 Component')

const doubleCount = computed(() => count.value * 2)

const increment = () => {
  count.value++
  emit('countChanged', count.value)
}

onMounted(() => {
  console.log('Component mounted with JavaScript')
})
</script>
