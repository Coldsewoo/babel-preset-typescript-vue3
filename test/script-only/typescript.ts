import { ref } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

const count = ref<number>(0);
const user = ref<User>({ id: 1, name: 'John', email: 'john@example.com' });

function increment(): void {
  count.value++;
}

export { count, user, increment };
