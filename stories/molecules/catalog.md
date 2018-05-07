# Molecules Catalog

## StatusButton

```js
import StatusButton from '@/components/molecules/StatusButton.vue';
```

<!-- STORY -->

### Status Button の利用例

デフォルトケース

```js
{
  components: { StatusButton },
  template: '<StatusButton/>'
}
```

カスタマイズ

```js
{
  components: { StatusButton },
  data() {
    return { size: 18 }
  },
  template: '<StatusButton color="bisque" :size="size">Sample</StatusButton>'
}
```
