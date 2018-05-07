import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withReadme, withDocs, doc } from 'storybook-readme';
import StatusButton from '@/components/molecules/StatusButton.vue'
import MoleculesCatalog from '@/stories/molecules/catalog.md'
import '!style-loader!css-loader!~/assets/main.scss'


storiesOf('Molecules', module)
  .addDecorator(withDocs(MoleculesCatalog))
  .add('catalog', () => ({
    components: { StatusButton },
    data() {
      return { size: 18, continue: true }
    },
    template: `
    <div style="display: flex;">
      <div style="width: 140px; height: 35px; margin-right: 20px;">
        <StatusButton/>
      </div>
      <div style="width: 140px; height: 35px;">
        <StatusButton color="bisque" :size="size">Sample</StatusButton>
      </div>
    </div>`,
  }));
