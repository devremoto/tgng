import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

module.exports = {
  name: 'angular-page-ts',
  alias: ['ng-m'],
  description: 'Generates angular model ts',
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
      template: 'angular/model.ts.ejs',
      target: `models/${dashedName}.ts`,
      props: { name, toolbox, helper }
    })

    print.success(`=============ANGULAR MODEL====================`)
  }
}
