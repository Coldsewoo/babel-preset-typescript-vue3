import { ref } from 'vue';

const count = ref(0);
const user = ref({ id: 1, name: 'John', email: 'john@example.com' });

function increment() {
  count.value++;
}

export { count, user, increment };
