<template>
  <div>
    <h1>{{ title }}</h1>
    <slot :data="data" :loading="loading" />
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed } from 'vue'

interface Props<T> {
  title: string
  data: T[]
  filterFn?: (item: T) => boolean
}

const props = defineProps<Props<T>>()

const emit = defineEmits<{
  select: [item: T]
  filter: [items: T[]]
}>()

const loading = ref<boolean>(false)

const filteredData = computed<T[]>(() => {
  if (!props.filterFn) return props.data
  return props.data.filter(props.filterFn)
})

const selectItem = (item: T): void => {
  emit('select', item)
}

defineExpose({
  filteredData,
  selectItem
})
</script>
