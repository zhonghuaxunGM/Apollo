<template>
  <a-form-model-item>
    <a-button @click="$emit('precheck')">precheck</a-button>
  </a-form-model-item>
</template>

<script>
import service from '../../utils/request'

export default {
  methods: {
    precheck() {
      service({
        url: '/service-t-k8s/v1/env/pre-check',
        method: 'post',
        data: this.form
      }).then((res) => {
        this.response = res
      })
    }
  }
}
</script>
