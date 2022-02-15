import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

module.exports = {
  name: 'controller',
  alias: ['c'],
  description: 'Generates controllers',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate }
    } = toolbox

    const helper = new Helper(toolbox)

    const name = helper.ucFirst(parameters.first)
    if (!helper.validate()) {
      return
    }

    await generate({
      template: 'controller.ts.ejs',
      target: `Api/Controllers/${name}Controller.cs`,
      props: { name, toolbox, helper }
    })
  }
}
