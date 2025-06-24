<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">Count: {{ count }}</button>
    <UserProfile :user="user" @update="handleUpdate" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { User } from '@/types/user'
import UserProfile from '@/components/UserProfile.vue'

interface Props {
  initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialCount: 0
})

const emit = defineEmits<{
  countChanged: [count: number]
  userUpdated: [user: User]
}>()

const count = ref<number>(props.initialCount)
const title = ref<string>('TypeScript Vue 3 Component')

const user = ref<User>({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
})

const doubleCount = computed<number>(() => count.value * 2)

const increment = (): void => {
  count.value++
  emit('countChanged', count.value)
}

const handleUpdate = (updatedUser: User): void => {
  user.value = updatedUser
  emit('userUpdated', updatedUser)
}

onMounted(() => {
  console.log('Component mounted with TypeScript')
})
</script>
