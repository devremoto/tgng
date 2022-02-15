import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

module.exports = {
  name: 'angular-page-css',
  alias: ['ng-p-c'],
  description: 'Generates angular page css',
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
      template: 'angular/page-css.ts.ejs',
      target: `pages/${dashedName}/${dashedName}.component.css`,
      props: { name, toolbox, helper }
    })

    print.success(`=============ANGULAR CSS====================`)
  }
}
