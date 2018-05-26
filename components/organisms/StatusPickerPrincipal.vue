<template>
<StatusPickerEditer
  v-if="isEditing"
  :statuses="myStatuses"
  :colors="myColors"
  @click="toggle()"
  @change="changeStatus"
  @submit="selectStatus"
  :animation="animation"
/>
<StatusPicker
  v-else
  :statuses="myStatuses"
  @click="toggle()"
  @submit="status => { $emit('submit', status) }"
  :animation="animation"
/>
</template>

<script>
import StatusPicker from '@/components/organisms/StatusPicker.vue'
import StatusPickerEditer from '@/components/organisms/StatusPickerEditer.vue'
import { colors } from '@/constants/config'

export default {
  name: 'StatusPickerPrincipal',
  components: { StatusPicker, StatusPickerEditer },
  props: {
    statuses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      animation: false,
      isEditing: false,
      myColors: colors,
      myStatuses: this.statuses,
    }
  },
  methods: {
    changeStatus(status) {
      this.myColors = [...this.myColors].filter(color => color !== status.color)
    },
    selectStatus(id) {
      this.$emit('select', id)
    },
    toggle() {
      this.animation = true
      this.isEditing = !this.isEditing
    }
  },
}
</script>
