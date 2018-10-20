# map-props-callbag
> Map callbag to your props (reactjs component)

Inspirated from mapProps from recompose.

This project is just a try out, but you can install the HoC with: `yarn add map-props-callbag` and feel free to open PR to discuss :)

## API
```js
import mapPropsCallbag from 'map-props-callbag'
import Component from './component' // your react component

export default mapPropsCallbag((props$) => {
  // props$  is a callbag
  // here you can write all your callbag behaviour

  // you should return a new callbag
  // parent props should be merge by yourself here if you want to keep them
  return pipe(
    props$,
    map(props => ({
      ...props,
      some: 'other prop',
    }))
  )
})(Component)
```
