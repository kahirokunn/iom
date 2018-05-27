import '!style-loader!css-loader!~assets/stylesheet/style.scss'
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
import StatusPickerEditor from '@/components/organisms/StatusPickerEditor.vue'
import StatusPickerPrincipal from '@/components/organisms/StatusPickerPrincipal.vue'
import MoleculesCatalog from '@/stories/molecules/catalog.md'
import config from '@/constants/config'


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
        <InputStatus color="blue" animation/>
      </div>
    </div>`,
  }))

storiesOf('Organisms', module)
  .add('catalog', () => ({
    components: {
      StatusPicker,
      StatusPickerEditor,
      StatusPickerPrincipal,
    },
    data: () => ({
      statuses: [
        { id: 0, order: 2, canDelete: true, name: 'Done', color: 'rgb(0, 200, 117)' },
        { id: 1, order: 3, canDelete: true, name: 'Working on it', color: 'rgb(253, 171, 61)' },
        { id: 2, order: 1, canDelete: true, name: 'Stuck', color: 'rgb(226, 68, 92)' },
        { id: 3, order: 4, canDelete: true, name: 'Waiting for Approval', color: 'rgb(0, 200, 117)' },
        { id: 4, order: 5, canDelete: true, name: '', color: 'rgb(196, 196, 196)' },
      ],
      colors: config.colors,
    }),
    template: `
    <div>
      <div class="center" style="margin-top: 30px;">
        <StatusPickerPrincipal :statuses="statuses"/>
      </div>

      <hr style="margin: 20px 0">
      <div class="center">
        <StatusPicker animation/>
      </div>

      <hr style="margin: 20px 0">
      <div class="center">
        <StatusPickerEditor
          :statuses="statuses"
          :colors="colors"
        />
      </div>
    </div>`,
  }))
