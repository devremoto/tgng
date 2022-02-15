import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

const html = require('./angular-page-html')
const css = require('./angular-page-css')
const ts = require('./angular-page-ts')
const model = require('./angular-model')

module.exports = {
  name: 'angular-page-all',
  alias: ['ng-p'],
  description: 'Generates angular page css',
  run: async (toolbox: GluegunToolbox) => {
    const { print } = toolbox

    const helper = new Helper(toolbox)

    if (!helper.validate()) {
      return
    }

    html.run(toolbox)
    css.run(toolbox)
    ts.run(toolbox)
    model.run(toolbox)
    print.success(`=============ANGULAR ALL PAGE====================`)
  }
}
