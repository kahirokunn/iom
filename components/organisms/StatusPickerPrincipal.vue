<template>
<StatusPickerEditor
  v-if="isEditing"
  :statuses="statusList"
  :colors="myColors"
  @click="toggle()"
  @change="changeStatus"
  @submit="selectStatus"
  @delete="remove"
  :animation="animation"
/>
<StatusPicker
  v-else
  :statuses="statusList"
  @click="toggle()"
  @submit="$emit('submit')"
  :animation="animation"
/>
</template>

<script>
import _ from 'lodash'
import StatusPicker from '@/components/organisms/StatusPicker.vue'
import StatusPickerEditor from '@/components/organisms/StatusPickerEditor.vue'
import config from '@/constants/config'

export default {
  name: 'StatusPickerPrincipal',
  components: { StatusPicker, StatusPickerEditor },
  model: {
    prop: 'statuses',
    event: 'change',
  },
  props: {
    statuses: {
      type: Array,
      default: () => [],
    },
    colors: {
      type: Array,
      default: () => config.colors,
    },
  },
  data() {
    return {
      animation: false,
      isEditing: false,
      myStatuses: this.statuses,
    }
  },
  computed: {
    myColors() {
      const colorList = this.myStatuses.map(status => status.color)
      return this.colors.filter(color => !colorList.includes(color))
    },
    statusList() {
      return _.sortBy(this.myStatuses, status => status.order)
    },
  },
  methods: {
    remove(targetStatus) {
      this.myStatuses = this.myStatuses
        .filter(status => !(status.id === targetStatus.id &&status.color === targetStatus.color))
      this.$emit('change', this.myStatuses)
    },
    changeStatus(statuses) {
      this.myStatuses = statuses
      this.$emit('change', this.myStatuses)
    },
    selectStatus(id) {
      this.$emit('select', id)
    },
    toggle() {
      this.animation = true
      this.isEditing = !this.isEditing
    },
  },
}
</script>
