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
import service from '../../utils/request'

export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // spinning:false,
      response: {}
    }
  },
  methods: {
    launch() {
      service({
        url: '/service-t-k8s/v1/env/startwithoutcli',
        method: 'post',
        data: this.form
      }).then((res) => {
        this.response = res
      })
    }
  }
}
</script>
