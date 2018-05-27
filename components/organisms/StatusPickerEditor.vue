<template>
<div :style="{ width }" class="new-status-picker-wrapper">
  <draggable
    :list="myStatuses"
    :options="{ group: 'statuses', handle: '.status-picker--drag-handle' }"
    class="status-picker--colors switched"
    :move="() => { dragging = true }"
    v-model="myStatuses"
    @update="updateStatusesOrder()"
    @end="dragging = false"
  >
    <div
      v-for="status in myStatuses"
      :key="status.id"
      class="new-status-picker--color-option"
    >
      <InputStatus
        :color="status.color"
        v-model="status.name"
        @delete="remove(status)"
        @change="$emit('change', myStatuses)"
        :enable="status.canDelete"
        class="input-status"
        hasDelete
        :animation="!isAnimationFinished"
      />
    </div>
    <div v-if="myColors.length > 0 && !dragging">
      <div class="new-status-picker--color-option more-colors">
        <div
          :style="{ 'background-color': focusingColor }"
          class="more-colors-background"
        ></div>
      </div>
    </div>
  </draggable>

  <div
    v-if="myColors.length > 0"
    :class="{ animation }"
    class="status-picker--add-new-color"
  >
    <PlusCircleButton
      v-for="color in myColors"
      :key="color"
      :color="color"
      @click="addStatus(color)"
      @focus="focus(color)"
      @blur="blur()"
      class="status-picker--add-status-icon"
    />
  </div>

  <div
    @click="$emit('click')"
    class="status-picker--edit-labels"
  >Apply</div>
</div>
</template>

<script>
import StatusButton from '@/components/atoms/StatusButton.vue'
import InputStatus from '@/components/molecules/InputStatus.vue'
import PlusCircleButton from '@/components/atoms/PlusCircleButton.vue'
import draggable from 'vuedraggable'


export default {
  name: 'StatusPickerEditor',
  components: {
    StatusButton,
    PlusCircleButton,
    InputStatus,
    draggable,
  },
  props: {
    statuses: {
      type: Array,
      default: () => [],
    },
    colors: {
      type: Array,
      default: () => [],
    },
    animation: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    statuses(newStatus) { this.myStatuses = newStatus },
    colors(newColors) { this.myColors = newColors },
  },
  data() {
    return {
      focusingColor: '#fff',
      myColors: this.colors,
      dragging: false,
      isAnimationFinished: false,
      myStatuses: this.statuses,
    }
  },
  created() {
    setTimeout(() => {
      this.isAnimationFinished = true
    }, 700)
  },
  methods: {
    focus(color) {
      this.focusingColor = color
    },
    blur() {
      this.focusingColor = '#fff'
    },
    addStatus(targetColor) {
      const lastIndex = this.myStatuses.length - 1
      let order = 1
      if (lastIndex) order = this.myStatuses[lastIndex].order + 1

      const status = {
        order,
        name: '',
        color: targetColor,
        canDelete: true,
      }
      this.myStatuses.push(status)
      this.$emit('change', this.myStatuses)
      this.myColors = this.myColors.filter(color => color !== targetColor)
      this.blur()
    },
    updateStatusesOrder() {
      this.myStatuses = this.myStatuses.map((status, i) => ({
        ...status,
        order: i,
      }))
      this.$emit('change', this.myStatuses)
    },
    remove(targetStatus) {
      this.myStatuses = this.myStatuses
        .filter(status => !(status.id === targetStatus.id && status.color === targetStatus.color))

      this.$emit('delete', targetStatus)
    },
  },
  computed: {
    width() {
      const padding = 16
      const width = 120
      const maxRow = 4
      const marginRight = 8
      const addNewStatusNumber = this.myColors.length ? 1 : 0
      const itemNumber = this.myStatuses.length + addNewStatusNumber
      const columnNumber = Math.ceil(itemNumber / maxRow) || 1
      let addMargin = 0
      if (columnNumber > 1) addMargin = marginRight * (columnNumber - 1)
      return `${((columnNumber * width) + padding * 2) + addMargin}px`
    },
  },
}
</script>

<style lang="scss" scoped>
.input-status {
  width: 120px;
  height: 32px;
  &:hover {
    opacity: 1;

  }
}

.new-status-picker-wrapper {
  display: inline-block;
  position: relative;
  border: 1px solid #c4c4c4;
  background: #fff;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,.32);
  border-radius: 4px;
  font-size: 13px;
  pointer-events: all;
  transition: width 0.3s;

  &:before {
    border-color: hsla(0, 0%, 88%, 0);
    border-bottom-color: #c4c4c4;
    border-width: 10px;
  }

  &:after {
    border-color: hsla(0, 0%, 88%, 0);
    border-bottom-color: #fff;
    border-width: 8px;
  }

  &:after,
  &:before {
    content: ' ';
    position: absolute;
    border-style: solid;
    bottom: 100%;
    height: 0;
    width: 0;
    right: 50%;
    transform: translateX(50%);
  }
}

.status-picker--colors {
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
}

.status-picker--add-new-color {
  border-top: 1px solid #c4c4c4;
  padding: 16px 0 16px 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}

.status-picker--add-status-icon {
  font-size: 20px;
  padding-right: 5px;
  cursor: pointer;
}

.status-picker--edit-labels {
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

.new-status-picker--color-option {
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
}

.sortable-drag {
  opacity: 1;
}

.sortable-ghost {
  opacity: .12;
}

.more-colors {
  pointer-events: none;
}

.more-colors-background {
  transition: background-color .2s ease-in;
  border-radius: 2px;
  width: 104px;
  height: 32px;
  color: #c4c4c4;
  border: 1px dotted #c4c4c4;
}
</style>
