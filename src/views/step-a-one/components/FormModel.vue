<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item>
      <a-button @click="$emit('submit')">submit</a-button>
    </a-form-model-item>

    <a-divider>ControlPlane Config</a-divider>

    <div>
      <a-form-model-item label="server_url">
        <a-input v-model="form.server.server_url" />
      </a-form-model-item>

      <a-form-model-item label="server_port">
        <a-input v-model="form.server.server_port" />
      </a-form-model-item>

      <a-form-model-item label="server_path">
        <a-input v-model="form.server.server_path" />
      </a-form-model-item>
    </div>

    <a-divider>Cluster Config</a-divider>

    <div>
      <a-collapse v-model="activeKey" accordion>
        <a-collapse-panel
          v-for="(item, index) in form.host"
          :key="index"
          :header="item.ip"
        >
          <a-form-model-item v-show="form.host.length > 1">
            <a-button @click="$emit('remove', index)">remove</a-button>
          </a-form-model-item>

          <a-form-model-item label="host_ip">
            <a-input v-model="item.ip" />
          </a-form-model-item>

          <a-form-model-item label="host_user">
            <a-input v-model="item.user" />
          </a-form-model-item>

          <a-form-model-item label="host_password">
            <a-input v-model="item.password" />
          </a-form-model-item>

          <a-form-model-item label="ssh_port">
            <a-input v-model="item.ssh_port" />
          </a-form-model-item>

          <a-form-model-item label="size_cpu_num">
            <a-input v-model="item.size.cpu_num" />
          </a-form-model-item>

          <a-form-model-item label="size_memory_num">
            <a-input v-model="item.size.memory_num" />
          </a-form-model-item>

          <a-form-model-item label="size_disk_num">
            <a-input v-model="item.size.disk_num" />
          </a-form-model-item>

          <a-form-model-item label="size_disk_path">
            <a-input v-model="item.size.disk_path" />
          </a-form-model-item>

          <a-form-model-item label="role">
            <a-checkbox-group v-model="item.role">
              <a-checkbox value="master" name="type"> master </a-checkbox>
              <a-checkbox value="node" name="type"> node </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
        </a-collapse-panel>
      </a-collapse>
    </div>

    <a-form-model-item>
      <a-button @click="$emit('add')">add</a-button>
    </a-form-model-item>

    <a-divider>harbor info</a-divider>

    <div>
      <a-form-model-item label="harbor_host_ip">
        <a-input v-model="form.harbor_info.host_ip" />
      </a-form-model-item>

      <a-form-model-item label="harbor_host_ssh_port">
        <a-input v-model="form.harbor_info.host_ssh_port" />
      </a-form-model-item>

      <a-form-model-item label="harbor_host_user">
        <a-input v-model="form.harbor_info.host_user" />
      </a-form-model-item>

      <a-form-model-item label="harbor_host_password">
        <a-input v-model="form.harbor_info.host_password" />
      </a-form-model-item>

      <a-form-model-item label="harbor_harbor_port">
        <a-input v-model="form.harbor_info.harbor_port" />
      </a-form-model-item>

      <a-form-model-item label="harbor_harbor_user">
        <a-input v-model="form.harbor_info.harbor_user" />
      </a-form-model-item>

      <a-form-model-item label="harbor_harbor_password">
        <a-input v-model="form.harbor_info.harbor_password" />
      </a-form-model-item>
    </div>

    <a-divider>network</a-divider>

    <div>
      <a-form-model-item label="network_service_cluster_ip_range">
        <a-input v-model="form.network.service_cluster_ip_range" />
      </a-form-model-item>

      <a-form-model-item label="network_cluster_cidr">
        <a-input v-model="form.network.cluster_cidr" />
      </a-form-model-item>

      <a-form-model-item label="network_cluster_dns_server">
        <a-input v-model="form.network.cluster_dns_server" />
      </a-form-model-item>

      <!-- <a-form-model-item label="network_up_stream_name_servers"> -->
      <!-- <a-input v-model="form.network.up_stream_name_servers" /> -->
      <!-- </a-form-model-item> -->
    </div>

    <a-divider>others</a-divider>

    <div>
      <a-form-model-item label="ntpdate_sever">
        <a-input v-model="form.ntpdate_sever" />
      </a-form-model-item>
      <a-form-model-item label="server_user">
        <a-input v-model="form.server_user" />
      </a-form-model-item>
    </div>

    <a-divider>firewalld</a-divider>

    <a-form-model-item label="firewalld">
      <a-switch v-model="form.firewalld.status" />
    </a-form-model-item>

    <div v-show="form.firewalld.status">
      <a-table :columns="columns" :data-source="data" :pagination="false">
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
      <!-- <a-divider>custom_ports</a-divider> -->
    </div>

    <a-form-model-item>
      <a-button @click="$emit('submit')">submit</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
const columns = [
  {
    title: 'k8s_master_ports',
    dataIndex: 'k8s_master_ports',
    key: 'k8s_master_ports',
    width: 80
  },
  {
    title: 'k8s_etcd_ports',
    dataIndex: 'k8s_etcd_ports',
    key: 'k8s_etcd_ports',
    width: 80
  },
  {
    title: 'k8s_worker_ports',
    dataIndex: 'k8s_worker_ports',
    key: 'k8s_worker_ports',
    width: 80
  }
]

const data = [
  {
    key: '1',
    k8s_master_ports: '80/tcp',
    k8s_etcd_ports: '2376/tcp',
    k8s_worker_ports: '22/tcp'
  },
  {
    key: '2',
    k8s_master_ports: '443/tcp',
    k8s_etcd_ports: ' 2379-2380/tcp',
    k8s_worker_ports: '80/tcp'
  },
  {
    key: '3',
    k8s_master_ports: '2376/tcp',
    k8s_etcd_ports: '8472/udp',
    k8s_worker_ports: '443/tcp'
  },
  {
    key: '4',
    k8s_master_ports: '6443/tcp',
    k8s_etcd_ports: '8472/udp',
    k8s_worker_ports: '2376/tcp'
  },
  {
    key: '5',
    k8s_master_ports: '8472/udp',
    k8s_etcd_ports: '8472/udp',
    k8s_worker_ports: '8472/udp'
  },
  {
    key: '6',
    k8s_master_ports: '9099/tcp',
    k8s_etcd_ports: '',
    k8s_worker_ports: '9099/tcp'
  },
  {
    key: '7',
    k8s_master_ports: '10250/tcp',
    k8s_etcd_ports: '',
    k8s_worker_ports: '10250/tcp'
  },
  {
    key: '8',
    k8s_master_ports: '10254/tcp',
    k8s_etcd_ports: '',
    k8s_worker_ports: '10254/tcp'
  },
  {
    key: '9',
    k8s_master_ports: '30000-32767/tcp',
    k8s_etcd_ports: '',
    k8s_worker_ports: '30000-32767/tcp'
  },
  {
    key: '10',
    k8s_master_ports: '30000-32767/udp',
    k8s_etcd_ports: '',
    k8s_worker_ports: '30000-32767/udp'
  }
]

export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      columns,
      data,
      activeKey: '',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  }
}
</script>
