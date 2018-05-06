<template>
  <div class="c-a-status-button" :style="{ 'background-color': color }" @click="$emit('click', true)" @mouseenter="mySize = size" @mouseleave="mySize = 0">
    <div @mouseenter="focus()" @mouseleave="blur()" @click="isClicked = true">
      <div class="c-a-status-button-add-note" :style="{ '--size': `${mySize}px` }"></div>
      <i class="fa fa-plus menu-dog-ear-color-0" :style="{ color }" v-show="isFocus"></i>
    </div>
    <div class="c-a-status-button-context center"><slot/></div>
  </div>
</template>

<script>
export default {
  name: 'StatusButton',
  props: {
    color: {
      type: String,
      default: 'rgb(196, 196, 196)',
    },
    size: {
      type: Number,
      default: 12
    },
    continue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mySize: 0,
      isFocus: false,
      open: false
    }
  },
  watch: {
    size(val) { this.mySize = val },
    continue(val, oldVal) {
      // true => falseにスイッチされたら、focusを外す
      if (!val && oldVal !== val) this.isFocus = false
    }
  },
  methods: {
    focus() {
      this.mySize = this.size * 1.5;
      this.isFocus = true;
    },
    blur() {
      this.mySize = this.size;
      if (!this.continue) this.isFocus = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.c-a-status-button-add-note {
  --size: 12px;
  position: absolute;
  top: 0;
  right: 0;
  transition: border-width .3s ease;
  border-width: 0 var(--size) var(--size) 0;
  border-style: solid;
  border-color: rgba(0,0,0,.2) #fff;

  &+.fa-plus {
    position: absolute;
    top: 1px;
    right: 1px;
    font-size: 8px;
    z-index: 1;
  }
}

.c-a-status-button {
  position: relative;
  height: 100%;
  cursor: pointer;
  user-select: none;
}

.c-a-status-button-context {
  height: 100%;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding: 0 5px;
  color: #fff;
  border-radius: 0;
  text-align: center;
  font-size: 12px;
}
</style>
