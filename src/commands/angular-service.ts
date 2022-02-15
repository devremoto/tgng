import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

module.exports = {
  name: 'service',
  alias: ['ng-s'],
  description: 'Generates angular service',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print
    } = toolbox

    const helper = new Helper(toolbox)

    const name = helper.ucFirst(parameters.first)
    const dashedName = helper.toDash(parameters.first).toLowerCase()
    if (!helper.validate()) {
      return
    }

    await generate({
      template: 'angular/service.ts.ejs',
      target: `services/${dashedName}.service.ts`,
      props: { name, toolbox, helper }
    })

    print.success(`=============ANGULAR Service====================`)
  }
}
