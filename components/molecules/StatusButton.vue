<template>
  <div
    class="c-a-status-button"
    :style="{ 'background-color': color }"
    @click="$emit('click', true)"
    @mouseenter="!isKeepOpen && enter()"
    @mouseleave="!isKeepOpen && leave()"
    v-click-outside="close"
  >
    <div
      @mouseenter="!isKeepOpen && focus()"
      @mouseleave="!isKeepOpen && blur()"
      @click="KeepOpen()"
    >
      <div class="c-a-status-button-add-note" :style="{ '--size': `${mySize}px` }"></div>
      <i class="fa fa-plus menu-dog-ear-color-0" :style="{ color }" v-show="isFocus"></i>

    </div>
    <div class="c-a-status-button-context"><slot/></div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'StatusButton',
  directives: { ClickOutside },
  props: {
    color: {
      type: String,
      default: 'rgb(196, 196, 196)',
    },
    size: {
      type: Number,
      default: 12,
    },
  },
  data() {
    return {
      mySize: 0,
      isFocus: false,
      open: false,
      isKeepOpen: false,
    }
  },
  watch: {
    size(val) { this.mySize = val },
  },
  methods: {
    enter() {
      this.mySize = this.size
    },
    KeepOpen() {
      this.isKeepOpen = true
    },
    close() {
      this.isKeepOpen = false
      this.leave()
    },
    focus() {
      this.mySize = this.size * 1.5
      this.isFocus = true
    },
    blur() {
      this.mySize = this.size
    },
    leave() {
      this.mySize = 0
      this.isFocus = false
    },
  },
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
  --height: 32px;

  position: relative;
  height: 100%;
  cursor: pointer;
  user-select: none;

  &:hover {
    transition: filter 0.3s ease;
    filter: opacity(70%);
  }

  .c-a-status-button-context {
    height: 100%;
    line-height: var(--height);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    padding: 0 5px;
    color: #fff;
    border-radius: 0;
    text-align: center;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: baseline;
  }
}
</style>
