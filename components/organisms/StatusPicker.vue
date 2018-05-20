<template>
<div :style="{ width }" class="status-picker-wrapper">
  <div class="status-picker--colors">
    <div
      class="new-status-picker--color-option viewing"
      v-for="status in statusList"
      :key="status.id"
    >
      <StatusButton
        :color="status.color"
        :animation="animation"
        @click="$emit('submit', status)"
        class="new-status-picker--color-option"
      >
        <span>{{ status.name }}</span>
      </StatusButton>
    </div>
  </div>
  <div
    @click="$emit('click')"
    class="status-picker--edit-labels"
  >
    <i class="icon icon-dapulse-edit"></i> Add / Edit Labels
  </div>
</div>
</template>

<script>
import _ from 'lodash'
import StatusButton from '@/components/atoms/StatusButton.vue'

export default {
  name: 'StatusPicker',
  components: { StatusButton },
  props: {
    statuses: {
      type: Array,
      default: () => ([
        { id: 0, order: 2, name: 'Done', color: 'rgb(0, 200, 117)' },
        { id: 1, order: 3, name: 'Working on it', color: 'rgb(253, 171, 61)' },
        { id: 2, order: 1, name: 'Stuck', color: 'rgb(226, 68, 92)' },
        { id: 3, order: 4, name: 'Waiting for Approval', color: 'rgb(0, 200, 117)' },
        { id: 4, order: 5, name: '', color: 'rgb(196, 196, 196)' },
      ]),
    },
    animation: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    statusList() {
      return _.sortBy(this.statuses, status => status.order)
    },
    width() {
      const padding = 16
      const width = 120
      const maxRow = 4
      const marginRight = 8
      const itemNumber = this.statusList.length
      const columnNumber = Math.ceil(itemNumber / maxRow) || 1
      let addMargin = 0
      if (columnNumber > 1) addMargin = marginRight * (columnNumber - 1)
      return `${((columnNumber * width) + padding * 2) + addMargin}px`
    },
  },
}
</script>

<style lang="scss" scoped>
.status-picker-wrapper {
  height: 100%;
  position: relative;
  border: 1px solid #c4c4c4;
  background: #fff;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,.32);
  border-radius: 4px;
  font-size: 13px;
  transition: width .2s,height 2s;
  pointer-events: all;
}

.status-picker-wrapper:before {
  border-color: hsla(0, 0%, 88%, 0);
  border-bottom-color: #c4c4c4;
  border-width: 10px;
}

.status-picker-wrapper:after {
  border-color: hsla(0, 0%, 88%, 0);
  border-bottom-color: #fff;
  border-width: 8px;
}

.status-picker-wrapper:after,
.status-picker-wrapper:before {
  content: ' ';
  position: absolute;
  border-style: solid;
  bottom: 100%;
  height: 0;
  width: 0;
  right: 50%;
  transform: translateX(50%);
}

.status-picker-wrapper .status-picker--edit-labels {
  flex: 0 0 auto;
  height: 32px;
  line-height: 32px;
  background: #f1f1f1;
  color: #333;
  text-align: center;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
  transition: color .2s;
}

.status-picker-wrapper .status-picker--colors {
  flex: 1 0 auto;
  width: 100%;
  height: 192px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  max-height: 200px;
  overflow: hidden;
  min-width: 0;
}

.new-status-picker--color-option {
  flex: 0 0 32px;
  width: 120px;
  height: 32px;
  align-self: auto;
  line-height: 32px;
  text-align: center;
  margin-bottom: 8px;
  margin-right: 8px;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  transition: transform .1s ease-in-out,opacity .1s ease-in-out;
}

.new-status-picker--color-option:active {
  transform: scale(.95);
}
</style>
