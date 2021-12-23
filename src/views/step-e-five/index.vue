<template>
  <div>
    <a-row :gutter="16" :style="{ width: '100vw' }">
      <a-col :span="12">
        <a-form-model-item label="namespace">
          <a-input v-model="ns" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="addns">addns</a-button>
        </a-form-model-item>
        <a-form-model-item label="image_path">
          <a-input v-model="imagepath" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="addimage">addimage</a-button>
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
      ns: '',
      imagepath: '',
      response: {}
    }
  },
  methods: {
    addns() {
      service({
        url: '/service-t-k8s/v1/create/namespace',
        method: 'get',
        params: { ns: this.ns }
        // data: this.form
      }).then((res) => {
        this.response = res
      })
    },
    addimage() {
      service({
        url: '/service-t-k8s/v1/add/image',
        method: 'post',
        params: { image_path: this.imagepath },
        data: this.form
      }).then((res) => {
        this.response = res
      })
    }
  }
}
</script>
