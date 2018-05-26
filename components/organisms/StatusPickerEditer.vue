<template>
<div :style="{ width }" class="new-status-picker-wrapper">
  <div class="status-picker--colors switched">
    <div
      class="new-status-picker--color-option"
      v-for="button in buttonList"
      :key="button.id || button.color"
    >
      <InputStatus
        :color="button.color"
        v-model="button.name"
        class="input-status"
        @delete="$emit('delete', button.id)"
        :enable="button.canDelete"
        hasDelete
      />
    </div>
  </div>

  <div
    v-if="myColors.length > 0"
    class="status-picker--add-new-color"
  >
    <PlusCircleButton
      v-for="color in colors"
      @click="$emit('add', color)"
      :key="color"
      :color="color"
      class="status-picker--add-status-icon"
    />
  </div>

  <div
    @click="$emit('submit')"
    class="status-picker--edit-labels"
  >Apply</div>
</div>
</template>

<script>
import _ from 'lodash'
import StatusButton from '@/components/atoms/StatusButton.vue'
import InputStatus from '@/components/molecules/InputStatus.vue'
import PlusCircleButton from '@/components/atoms/PlusCircleButton.vue'


export default {
  name: 'StatusPicker',
  components: { StatusButton, PlusCircleButton, InputStatus },
  props: {
    buttons: {
      type: Array,
      default: () => ([]),
    },
    colors: {
      type: Array,
      default: () => ([]),
    },
  },
  watch: {
    buttons(newButtons) { this.myButtons = newButtons },
    colors(newColors) { this.myColors = newColors },
  },
  data() {
    return {
      isFocus: false,
      myButtons: this.buttons,
      myColors: this.colors,
    }
  },
  methods: {
    focus() {
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
    },
  },
  computed: {
    buttonList() {
      return [...this.myButtons].sort(button => button.order)
    },
    width() {
      const width = 120;
      const maxRow = 4;
      const padding = 16;
      if (this.buttonList.length < maxRow) return `${width}px`
      return `${Math.ceil(this.buttonList.length / 4) * width + padding * 2}px`
    },
  },
}
</script>

<style lang="scss" scoped>
.input-status {
  width: 120px;
  height: 32px;
}

.new-status-picker-wrapper {
  display: inline-block;
  position: relative;
  border: 1px solid #c4c4c4;
  background: #fff;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,.32);
  border-radius: 4px;
  font-size: 13px;
  transition: width .2s,height 2s;
  pointer-events: all;

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
  transition: transform .1s ease-in-out,opacity .1s ease-in-out;

  &:hover {
    opacity: 1;
    transform: none;
  }
}
</style>
