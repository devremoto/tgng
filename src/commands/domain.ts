import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

module.exports = {
  name: 'domain',
  alias: ['d'],
  description: 'Generates domain layer',
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
      template: 'model.ts.ejs',
      target: `Domain/Entities/${name}.cs`,
      props: { name, toolbox, helper }
    })

    await generate({
      template: 'i-repository.ts.ejs',
      target: `Domain/Interfaces/Repository/I${name}Repository.cs`,
      props: { name, toolbox, helper }
    })

    await generate({
      template: 'i-service.ts.ejs',
      target: `Domain/Interfaces/Services/I${name}Service.cs`,
      props: { name, toolbox, helper }
    })

    print.success(`=============Repository====================`)
    print.info(`#region ${name} Repository`)
    print.info(
      `services.AddTransient<I${name}Repository, ${name}Repository>();`
    )
    print.info(`#endregion\n\n`)

    print.success(`=============Service====================`)
    print.info(`#region ${name} Service`)
    print.info(`services.AddTransient<I${name}Service, ${name}Service>();`)
    print.info(`#endregion\n\n`)

    print.success(`=============Auto Mapper====================`)

    print.info(`#region ${name}`)
    print.info(`CreateMap<${name}, ${name}ViewModel>().ReverseMap();`)
    print.info(`CreateMap<${name}ViewModel, ${name}>().ReverseMap();`)
    print.info(`#endregion\n\n`)
  }
}
