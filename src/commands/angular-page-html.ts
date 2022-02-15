import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

module.exports = {
  name: 'angular-page-html',
  alias: ['ng-p-h'],
  description: 'Generates angular page html',
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
      template: 'angular/page-html.ts.ejs',
      target: `pages/${dashedName}/${dashedName}.component.html`,
      props: { name, toolbox, helper }
    })

    print.success(`=============ANGULAR HTML====================`)
  }
}
