<template>
  <div>
    <!-- <a-spin  :spinning="spinning"> -->
    <a-row :gutter="16" :style="{ width: '100vw' }">
      <a-col :span="12">
        <form-model
          :form="form"
          @submit="handleSubmit"
          @add="handleradd"
          @remove="handlerremove"
        />
      </a-col>

      <a-col :span="12">
        <p style="white-space:pre-wrap;">{{ response }}</p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import FormModel from './components/FormModel.vue'
import service from '../../utils/request'

export default {
  components: { FormModel },

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
    handleSubmit() {
      // this.spinning = true
      let res1 = ''
      let res2 = ''
      service({
        url: '/service-t-k8s/v1/config/load',
        method: 'post',
        data: this.form.server
      }).then(res => {
        res1 = JSON.stringify(res)
        service({
          url: '/service-t-k8s/v1/env/load',
          method: 'post',
          data: this.form
        }).then(result => {
          res2 = JSON.stringify(result)
          this.response = res1 + '\n' + '\n' + '\n' + res2
        })
      })

      // this.spinning = false
    },

    handleradd() {
      this.form.host.push({
        ip: '192.168.0.0',
        user: 'root',
        password: 'JKSTACKPB@sre1!',
        ssh_port: '22',
        size: {
          cpu_num: '4',
          memory_num: '4096',
          disk_num: '10240',
          disk_path: '/data'
        },
        role: []
      })
    },

    handlerremove(index) {
      this.form.host.splice(index, 1)
    }
  }
}
</script>
