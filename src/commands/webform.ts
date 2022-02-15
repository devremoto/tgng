import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

module.exports = {
  name: 'webform',
  alias: ['wf'],
  description: 'Generates all layers',
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
      template: '.netframework/aspx.ts.ejs',
      target: `${name}.aspx`,
      props: { name, toolbox, helper }
    })

    // await generate({
    //   template: '.netframework/model.ts.ejs',
    //   target: `../Data/Entities/t${name}.cs`,
    //   props: { name, toolbox, helper },
    // })
    // await generate({
    //   template: '.netframework/map.ts.ejs',
    //   target: `../Data/Mapping/t${name}Map.cs`,
    //   props: { name, toolbox, helper },
    // })

    await generate({
      template: '.netframework/aspx.cs.ts.ejs',
      target: `${name}.aspx.cs`,
      props: { name, toolbox, helper }
    })

    await generate({
      template: '.netframework/aspx.designer.cs.ts.ejs',
      target: `${name}.aspx.designer.cs`,
      props: { name, toolbox, helper }
    })

    print.success(`=============DBSET ${name} ====================`)
    print.info(`#region DbSet<${name}> Map`)
    print.info(`public virtual DbSet<mcp.t${name}> t${name} { get; set; }`)
    print.info(`#endregion\n\n`)

    print.success(`=============ORM MAP====================`)
    print.info(`#region ${name} Map`)
    print.info(`modelBuilder.ApplyConfiguration(new mcp.t${name}Map());`)
    print.info(`#endregion\n\n`)
  }
}
