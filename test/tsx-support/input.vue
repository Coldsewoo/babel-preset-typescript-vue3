<script lang="tsx">
import { defineComponent, ref } from 'vue'

interface Props {
  title: string
  count?: number
}

export default defineComponent<Props>({
  name: 'TSXComponent',
  props: {
    title: String,
    count: Number
  },
  setup(props) {
    const localCount = ref(props.count || 0)
    
    const increment = (): void => {
      localCount.value++
    }

    return () => (
      <div>
        <h1>{props.title}</h1>
        <button onClick={increment}>
          Count: {localCount.value}
        </button>
      </div>
    )
  }
})
</script>
