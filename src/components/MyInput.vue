<template>
  <q-input
    filled
    v-model="model"
    label="label"
    square
    color="white"
    label-color="white"
  >
  </q-input>
</template>

<script>

export default {
  name: 'MyInput',
  props: {
    label: {
      type: String,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
  },
  setup () {
    return {}
  }
}
</script>
