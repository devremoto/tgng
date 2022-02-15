import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

module.exports = {
  name: 'service',
  alias: ['s'],
  description: 'Generates backend services',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print
    } = toolbox

    const helper = new Helper(toolbox)

    const name = helper.ucFirst(parameters.first)
    if (!helper.validate()) {
      return
    }

    await generate({
      template: 'service.ts.ejs',
      target: `Services/${name}Service.cs`,
      props: { name, toolbox, helper }
    })

    print.success(`=============Service====================`)
    print.info(`#region ${name} Service`)
    print.info(`services.AddTransient<I${name}Service, ${name}Service>();`)
    print.info(`#endregion\n\n`)
  }
}
