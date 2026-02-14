<script setup>
  import { ref, defineExpose } from 'vue'

  const dialog = ref(false)

  const openModal = () => {
    dialog.value = true
  }
  const closeModal = () => {
    dialog.value = false
  }

  defineExpose({ openModal, closeModal })
</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    persistent
    scrollable
  >
    <slot />
  </v-dialog>
</template>
