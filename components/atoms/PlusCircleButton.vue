<template>
<div>
  <i
    @mouseenter="focus()"
    @mouseleave="blur()"
    @click="$emit('click', $event)"
    :style="{ color }"
    :class="{ 'fa-plus-circle': isFocus, 'fa-circle': !isFocus }"
    class="fas"
  ></i>
</div>
</template>

<script>
export default {
  name: 'PlusCircleButton',
  props: {
    color: {
      type: String,
      default: 'black',
    },
  },
  data() {
    return {
      isFocus: false,
    };
  },
  methods: {
    focus() {
      this.isFocus = true
      this.$emit('focus')
    },
    blur() {
      this.isFocus = false
      this.$emit('blur')
    },
  },
}
</script>

<style lang="scss" scoped>
.fas {
  display: block;
  border-radius: 50%;
  cursor: pointer;
}
</style>
