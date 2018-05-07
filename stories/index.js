import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withReadme, withDocs }  from 'storybook-readme';
import StatusButton from '@/components/molecules/StatusButton.vue'
import '!style-loader!css-loader!~/assets/main.scss'


storiesOf('Molecules', module)
  .add('catalog', () => ({
    components: { StatusButton },
    data() {
      return { size: 18 }
    },
    template: `
    <div style="display: flex; width: 300px; justify-content: space-between;">
      <div style="width: 140px; height: 35px;">
        <StatusButton>Sample</StatusButton>
      </div>
      <div style="width: 140px; height: 35px;">
        <StatusButton color="bisque" :size="size">Sample</StatusButton>
      </div>
    </div>`,
  }));
