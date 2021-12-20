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
        {{ response }}
      </a-col>
    </a-row>
  </div>
</template>

<script>
import FormModel from './components/FormModel.vue'
import service from '../../utils/request'

export default {
  components: { FormModel },

  data() {
    return {
      // spinning:false,
      form: {
        server_url: '127.0.0.1',
        server_port: '7799',
        server_path: '/service-t-k8s/api/v1/',
        host: [
          {
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
          }
        ],
        harbor_info: {
          host_ip: '192.168.0.0',
          host_ssh_port: '22',
          host_user: 'root',
          host_password: 'JKSTACKPB@sre1!',
          harbor_port: '7798',
          harbor_user: 'admin',
          harbor_password: 'Harbor12345'
        },
        network: {
          service_cluster_ip_range: '10.43.0.0/16',
          cluster_cidr: '10.42.0.0/16',
          cluster_dns_server: '10.43.0.10',
          up_stream_name_servers: ''
        },
        ntpdate_sever: 'ntp1.aliyun.com',
        server_user: 'jkstack',
        firewalld: true
      },
      response: {}
    }
  },

  methods: {
    handleSubmit() {
      // this.spinning = true
      // this.mock(this.form).then(res => {
      service({
        url: '/service-t-k8s/v1/version/build',
        method: 'get'
      }).then((res) => {
        this.response = res
      })
      // service.post('http://127.0.0.1:7799/service-t-k8s/v1/version/build', this.form).then((res) => {
      // this.response = res
      //   // this.spinning = false
      // })
      // })
    },

    // mock(params) {
    //   return new Promise(resolve => {
    //     resolve({ response: params })
    //   })
    // },

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
