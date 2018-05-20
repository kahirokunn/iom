import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withReadme, withDocs, doc } from 'storybook-readme'
import SimpleStatusButton from '@/components/atoms/StatusButton.vue'
import StatusButton from '@/components/molecules/StatusButton.vue'
import NewStatusPicker from '@/components/organisms/NewStatusPicker.vue'
import MoleculesCatalog from '@/stories/molecules/catalog.md'
import '!style-loader!css-loader!~assets/stylesheet/style.scss'


storiesOf('Atoms', module)
  .add('catalog', () => ({
    components: { SimpleStatusButton },
    template: `
    <div style="display: flex;">
      <div style="width: 140px; height: 35px; margin-right: 20px;">
        <SimpleStatusButton>Sample</SimpleStatusButton>
      </div>
    </div>`,
  }))

storiesOf('Molecules', module)
  .addDecorator(withDocs(MoleculesCatalog))
  .add('catalog', () => ({
    components: { StatusButton },
    data() {
      return { size: 18 }
    },
    template: `
    <div style="display: flex;">
      <div style="width: 140px; height: 35px; margin-right: 20px;">
        <StatusButton/>
      </div>
      <div style="width: 140px; height: 35px; margin-right: 20px;">
        <StatusButton color="bisque" :size="size" continue>Sample</StatusButton>
      </div>
      <div style="width: 140px; height: 35px;">
        <StatusButton color="blue" :size="size">Long Text 1 2 3 4 5 6 7 8 9 0</StatusButton>
      </div>
    </div>`,
  }));
