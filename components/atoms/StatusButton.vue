<template>
  <div
    @click="$emit('click', true)"
    :style="{ 'background-color': color }"
    :class="{ animation }"
    class="c-a-status-button"
  >
    <div
      :class="{ animation }"
      class="c-a-status-button-context">
      <slot/>
    </div>
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
      default: 12,
    },
    animation: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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

.c-a-status-button.animation {
  animation: show .3s;
}

@keyframes show {
  0% {
    flex: 0 0 16px;
    width: 16px;
  }
  100% {
    width: 100%;
    flex: 0 0 120px;
  }
}
</style>
