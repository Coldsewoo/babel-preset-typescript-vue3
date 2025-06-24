<template>
  <div>Invalid syntax</div>
</template>

<script lang="ts">
// This has intentional TypeScript syntax errors
const invalidCode: string = 123; // Type error
function test(param: UnknownType): void { // Unknown type
  return "should be void"; // Return type mismatch
}
</script>
