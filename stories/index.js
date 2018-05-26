import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withReadme, withDocs, doc } from 'storybook-readme'
import SimpleStatusButton from '@/components/atoms/StatusButton.vue'
import PlusCircleButton from '@/components/atoms/PlusCircleButton.vue'
import StatusButton from '@/components/molecules/StatusButton.vue'
import InputStatus from '@/components/molecules/InputStatus.vue'
import StatusPicker from '@/components/organisms/StatusPicker.vue'
import StatusPickerEditer from '@/components/organisms/StatusPickerEditer.vue'
import MoleculesCatalog from '@/stories/molecules/catalog.md'
import '!style-loader!css-loader!~assets/stylesheet/style.scss'


storiesOf('Atoms', module)
  .add('catalog', () => ({
    components: { SimpleStatusButton, PlusCircleButton },
    template: `
    <div style="display: flex;">
      <div style="width: 140px; height: 35px; margin-right: 20px;">
        <SimpleStatusButton>Sample</SimpleStatusButton>
      </div>
      <div style="display: inline-block; margin-right: 10px;">
        <PlusCircleButton/>
      </div>
      <div style="display: inline-block; margin-right: 10px;">
        <PlusCircleButton color="red"/>
      </div>
    </div>`,
  }))

storiesOf('Molecules', module)
  .addDecorator(withDocs(MoleculesCatalog))
  .add('catalog', () => ({
    components: { StatusButton, InputStatus },
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
      <div style="width: 140px; height: 35px; margin-right: 20px;">
        <StatusButton color="blue" :size="size">Long Text 1 2 3 4 5 6 7 8 9 0</StatusButton>
      </div>
      <div style="width: 140px; height: 35px;">
        <InputStatus color="blue"/>
      </div>
    </div>`,
  }))

storiesOf('Organisms', module)
  .add('catalog', () => ({
    components: { StatusPicker, StatusPickerEditer },
    data: () => ({
      statuses: [
        { id: 0, order: 2, name: 'Done', color: 'rgb(0, 200, 117)', canDelete: true },
        { id: 1, order: 3, name: 'Working on it', color: 'rgb(253, 171, 61)', canDelete: true },
      ],
      colors: [
        'rgb(226, 68, 93)',
        'rgb(253, 171, 61)',
        'rgb(0, 200, 117)',
        'rgb(0, 134, 192)',
        'rgb(3, 127, 76)',
        'rgb(202, 182, 65)',
        'rgb(255, 203, 0)',
        'rgb(51, 51, 51)',
        'rgb(87, 155, 252)',
        'rgb(162, 93, 220)',
        'rgb(187, 51, 84)',
        'rgb(255, 21, 138)',
        'rgb(255, 90, 196)',
        'rgb(120, 75, 209)',
        'rgb(156, 211, 38)',
        'rgb(102, 204, 255)',
        'rgb(128, 128, 128)',
        'rgb(127, 83, 71)',
        'rgb(255, 100, 46)',
        'rgb(196, 196, 196)',
      ],
    }),
    template: `
    <div>
      <StatusPicker style="margin-top: 30px;" animation/>
      <hr style="margin: 20px 0">
      <StatusPickerEditer :statuses="statuses" :colors="colors"/>
    </div>`,
  }))
