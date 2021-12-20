<template>
  <div class="app-layout">
    <a-steps :current="step - 1" :style="{ padding: '24px' }">
      <a-step title="声明配置" />
      <a-step title="预检" />
      <a-step title="初始化环境" />
      <a-step title="部署集群" />
      <a-step title="创建资源" />
      <a-step title="上传物料" />
      <a-step title="部署应用" />
    </a-steps>

    <div :style="{ flex: 1, overflow: 'auto' }">
      <component :is="componentsMap[step]" :form="form" />
    </div>

    <div class="app-footer">
      <a-button :style="{ marginRight: '100px' }" @click="previous">
        previous
      </a-button>
      <a-button type="primary" @click="next">next</a-button>
    </div>
  </div>
</template>

<script>
import StepOne from './views/step-a-one'
import StepTwo from './views/step-b-two'
import StepThree from './views/step-c-three'
import StepFour from './views/step-d-four'
import StepFive from './views/step-e-five'
import StepSix from './views/step-f-six'
import StepSeven from './views/step-g-seven'

const componentsMap = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
  4: StepFour,
  5: StepFive,
  6: StepSix,
  7: StepSeven
}

export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive,
    StepSix,
    StepSeven
  },

  data() {
    return {
      form: {
        server: {
          server_url: '127.0.0.1',
          server_port: '7799',
          server_path: '/service-t-k8s/api/v1/'
        },
        host: [
          {
            ip: '192.168.0.0',
            user: 'root',
            password: 'JKSTACKPB@sre1!',
            ssh_port: '22',
            size: {
              cpu_num: '4',
              memory_num: '10240',
              disk_num: '102400',
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
          up_stream_name_servers: ['']
        },
        ntpdate_sever: 'ntp1.aliyun.com',
        server_user: 'jkstack',
        firewalld: {
          status: true,
          k8s_master_ports: ['80/tcp', '443/tcp', '2376/tcp', '6443/tcp', '8472/udp', '9099/tcp', '10250/tcp', '10254/tcp', '30000-32767/tcp', '30000-32767/udp'],
          k8s_etcd_ports: ['2376/tcp', '2379-2380/tcp', '8472/udp', '9099/tcp', '10250/tcp'],
          k8s_worker_ports: ['22/tcp', '80/tcp', '443/tcp', '2376/tcp', '8472/udp', '9099/tcp', '10250/tcp', '10254/tcp', '30000-32767/tcp', '30000-32767/udp']
        }
      },
      step: 1,
      componentsMap
    }
  },

  methods: {
    previous() {
      if (this.step > 1) {
        this.step = this.step - 1
      }
    },

    next() {
      if (this.step < Object.keys(componentsMap).length) {
        this.step = this.step + 1
      }
    }
  }
}
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}

.app-layout {
  display: flex;
  flex-flow: column;
  background: #fafafa;
  height: 100vh;
  box-sizing: border-box;

  .app-footer {
    padding: 16px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
