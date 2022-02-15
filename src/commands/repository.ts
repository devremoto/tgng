import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

module.exports = {
  name: 'repository',
  alias: ['r'],
  description: 'Generates repository layer',
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
      template: 'map.ts.ejs',
      target: `Data/Map/${name}Map.cs`,
      props: { name, toolbox, helper }
    })

    await generate({
      template: 'repository.ts.ejs',
      target: `Data/Repository/${name}Repository.cs`,
      props: { name, toolbox, helper }
    })

    print.success(`=============Repository====================`)
    print.info(`#region ${name} Repository`)
    print.info(
      `services.AddTransient<I${name}Repository, ${name}Repository>();`
    )
    print.info(`#endregion\n\n`)

    const dbset = `\tpublic DbSet<${name}> ${name} { get; set; }\n`
    await patching.patch('Data/Context/AppDbContext.cs', {
      insert: dbset,
      before: '#endregion DbSet'
    })

    const map = `modelBuilder.ApplyConfiguration(new ${name}Map());\n`

    await patching.patch('Data/Context/AppDbContext.cs', {
      insert: map,
      before: '#endregion MAP'
    })
    print.success(`=============DB SET====================`)
    print.info(dbset)

    print.success(`=============ORM MAP====================`)

    print.info(
      `Add-Migration 'Add ${name}' -s Api -p Data -context AppDbContext`
    )
    print.info(`Update-Database -s Api -p Data -context AppDbContext`)
    print.info(`Remove-Migration -s Api -p Data -context AppDbContext`)
  }
}
