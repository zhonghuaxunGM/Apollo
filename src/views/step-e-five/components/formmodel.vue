<template>
  <div>
    <a-row :gutter="16" :style="{ width: '100vw' }">
      <a-col :span="12">
        <a-form-model-item>
          <a-button @click="launch">launch</a-button>
        </a-form-model-item>
      </a-col>

      <a-col :span="12">
        <p style="white-space: pre-wrap">{{ response }}</p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {}
  }
}
</script>
