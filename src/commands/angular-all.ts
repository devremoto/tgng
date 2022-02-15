import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

const html = require('./angular-page-html')
const css = require('./angular-page-css')
const ts = require('./angular-page-ts')
const service = require('./angular-service')
const model = require('./angular-model')

module.exports = {
  name: 'angular',
  alias: ['ng'],
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
    service.run(toolbox)
    model.run(toolbox)
    print.success(`=============ANGULAR ALL PAGE====================`)
  }
}
