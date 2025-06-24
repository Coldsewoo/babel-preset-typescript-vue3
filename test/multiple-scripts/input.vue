<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="clickHandler">Click me</button>
  </div>
</template>

<script>
// Regular script block with JavaScript
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MultipleScriptComponent',
  data() {
    return {
      message: 'Hello from regular script'
    }
  }
})
</script>

<script setup lang="ts">
// Setup script with TypeScript
import { ref } from 'vue'

const setupMessage = ref<string>('Hello from setup script')

const clickHandler = (): void => {
  console.log('Button clicked')
}
</script>
