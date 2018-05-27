<template>
<div class="status-picker--color-option editing" style="position: relative;">
  <div
    :class="{ animation }"
    class="status-picker--drag-handle filter"
  >
    <div
      class="color-option-box fas fa-ellipsis-v center"
      :style="{ 'background-color': color }"
    ></div>
  </div>
  <div class="status-picker--drag-handle"></div>
  <input
    type="text"
    class="color-option-input"
    v-model="myValue"
    @input="$emit('input', myValue)"
    @change="$emit('change', myValue)"
    :placeholder="placeholder"
  >
  <span class="center" v-if="hasDelete">
    <i
      @click="enable && $emit('delete')"
      :class="{ 'is-enabled': enable }"
      class="color-delete-button fas fa-times-circle"
    ></i>
  </span>
</div>
</template>

<script>
import StatusButton from '@/components/atoms/StatusButton.vue'
import PlusCircleButton from '@/components/atoms/PlusCircleButton.vue'


export default {
  name: 'InputStatus',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'gray',
    },
    placeholder: {
      type: String,
      default: 'Add Label',
    },
    hasDelete: {
      type: Boolean,
      default: false,
    },
    enable: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(newValue) {
      this.myValue = this.value;
    },
  },
  data() {
    return {
      myValue: this.value,
    };
  },
}
</script>

<style lang="scss" scoped>
.status-picker--color-option {
  height: 100%;
  align-self: auto;
  text-align: center;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  transition: all .1s ease-in-out;

  &.editing {
    display: inline-flex;
    cursor: auto;
    user-select: none;
    position: relative;

    &:hover {
      opacity: 1;
      transform: none;
    }
  }
}

.status-picker--drag-handle {
  height: 100%;
  display: flex;
  cursor: move;
  height: 100%;
  width: 16px;
  border-radius: 2px 0 0 2px;
}

.status-picker--drag-handle.filter {
  position: absolute;
}

.status-picker--drag-handle.animation {
  animation: show .55s;
}

@keyframes show {
  0% {
    width: 100%;
    flex: 0 0 120px;
    width: 120px;
  }
  10% {
    width: 100%;
    flex: 0 0 120px;
    width: 120px;
  }
  55% {
    flex: 0 0 12.8px;
    width: 12.8px;
  }
  100% {
    flex: 0 0 16px;
    width: 16px;
  }
}

.color-option-input {
  flex: 0 0 88px px;
  width: 88px;
  height: 100%;
  color: #333;
  outline: none;
  padding-left: 8px;
  padding-right: 4px;
  border-radius: 0 2px 2px 0;
  border: 1px solid #c4c4c4;
  border-left: none;
  min-width: 0;
  font-weight: 100;
}

.color-option-box {
  width: 100%;
}

.color-delete-button {
  width: 100%;
  color: #d8d8d8;
  padding-left: 4px;
  font-size: 12px;
  cursor: not-allowed;

  &.is-enabled {
    color: #333;
    cursor: pointer;
  }
}
</style>
