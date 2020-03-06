import replacer from 'webpack-theme-color-replacer/client'

// change theme colors at runtime.
export function changeColor (newColor) {
  var options = {
    newColors: [newColor, newColor] // new colors array, one-to-one corresponde with `matchColors`
    // changeUrl(cssUrl) {
    //   return `/${cssUrl}`; // while router is not `hash` mode, it needs absolute path
    // },
  }

  replacer.changer.changeColor(options, Promise).then(() => {
    console.log('Theme colors changed!')
  })
}
