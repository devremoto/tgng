import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

const appService = require('./app-service')
const controller = require('./controller')
const domain = require('./domain')
const repository = require('./repository')
const service = require('./service')

module.exports = {
  name: 'all',
  alias: ['a'],
  description: 'Generates all layers',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, patching } = toolbox

    const helper = new Helper(toolbox)

    const name = helper.ucFirst(parameters.first)
    if (!helper.validate()) {
      return
    }
    appService.run(toolbox)
    controller.run(toolbox)
    domain.run(toolbox)
    repository.run(toolbox)
    service.run(toolbox)

    let map = `\n\n            #region ${name}\n`
    await patching.patch('CrossCutting.Ioc/BootStrapper.cs', {
      insert: map,
      before: '#endregion CrudServices'
    })
    map = `            services.AddTransient<I${name}AppService, ${name}AppService>();\n`
    await patching.patch('CrossCutting.Ioc/BootStrapper.cs', {
      insert: map,
      before: '#endregion CrudServices'
    })
    map = `            services.AddTransient<I${name}Service, ${name}Service>();\n`
    await patching.patch('CrossCutting.Ioc/BootStrapper.cs', {
      insert: map,
      before: '#endregion CrudServices'
    })
    map = `            services.AddTransient<I${name}Repository, ${name}Repository>();\n`
    await patching.patch('CrossCutting.Ioc/BootStrapper.cs', {
      insert: map,
      before: '#endregion CrudServices'
    })
    map = `            #endregion ${name}\n\n\n            `
    await patching.patch('CrossCutting.Ioc/BootStrapper.cs', {
      insert: map,
      before: '#endregion CrudServices'
    })

    print.success(`=============CRUD SERVICES====================`)
    print.info(map)
    print.success(`Generated All layers for ${name}`)
  }
}
