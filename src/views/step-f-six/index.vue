<template>
  <div>
    <a-row :gutter="16" :style="{ width: '100vw' }">
      <a-col :span="12">
        <a-form-model
          :model="form2"
        >
          <a-form-model-item label="name">
            <a-input v-model="form2.name" />
          </a-form-model-item>

          <a-form-model-item label="chart location">
            <a-input v-model="form2.chart" />
          </a-form-model-item>

          <a-form-model-item label="values location">
            <a-input v-model="form2.values" />
          </a-form-model-item>

          <a-form-model-item label="namespace">
            <a-input v-model="form2.namespace" />
          </a-form-model-item>
        </a-form-model>
        <a-form-model-item>
          <a-button @click="deployhandler">deploy</a-button>
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
      form2: {
        name:'',
        chart:'',
        values:'',
        namespace:''
      },
      response: {}
    }
  },
  methods: {
    deployhandler() {
      service({
        url: '/service-t-k8s/v1/jkclient/deploy',
        method: 'post',
        data: this.form2
      }).then((res) => {
        this.response = res
      })
    }
  }
}
</script>
