import { configure } from '@storybook/vue';

import Vue from 'vue';
// import Vuex from 'vuex'; // Vue plugins


function loadStories() {
  require('@/stories')
}

configure(loadStories, module);
