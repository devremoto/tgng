import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

module.exports = {
  name: 'app-service',
  alias: ['aps'],
  description: 'Generates Application layer',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      patching,
      print
    } = toolbox

    const helper = new Helper(toolbox)

    const name = helper.ucFirst(parameters.first)
    if (!helper.validate()) {
      return
    }

    await generate({
      template: 'view-model.ts.ejs',
      target: `Application/ViewModels/${name}ViewModel.cs`,
      props: { name, toolbox, helper }
    })

    await generate({
      template: 'app-service.ts.ejs',
      target: `Application/Services/${name}AppService.cs`,
      props: { name, toolbox, helper }
    })

    await generate({
      template: 'i-app-service.ts.ejs',
      target: `Application/Interfaces/I${name}AppService.cs`,
      props: { name, toolbox, helper }
    })

    const map = `#region ${name}\nCreateMap<${name}, ${name}ViewModel>().ReverseMap();\n#endregion\n\n`

    await patching.patch('Application/AutoMapper/ModelToViewModel.cs', {
      insert: map,
      before: '#endregion AutoMapper'
    })

    print.success(`=============AppService====================`)
    print.info(`#region ${name} AppService`)
    print.info(
      `services.AddTransient<I${name}AppService, ${name}AppService>();`
    )
    print.info(`#endregion\n\n`)

    print.info(`#region ${name}`)
    print.info(`CreateMap<${name}, ${name}ViewModel>().ReverseMap();`)
    print.info(`CreateMap<${name}ViewModel, ${name}>().ReverseMap();`)
    print.info(`#endregion\n\n`)
  }
}
