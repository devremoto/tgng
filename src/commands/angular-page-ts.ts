import { GluegunToolbox } from 'gluegun'
import { Helper } from '../../models/helper'

module.exports = {
  name: 'angular-page-ts',
  alias: ['ng-p-t'],
  description: 'Generates angular page ts',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      patching,
      print
    } = toolbox

    const helper = new Helper(toolbox)

    const className = helper.ucFirst(parameters.first)
    const dashedName = helper.toDash(parameters.first).toLowerCase()
    const spacedName = helper.toSpacedName(helper.ucFirst(parameters.first))
    const lower = parameters.first.toLowerCase()
    if (!helper.validate()) {
      return
    }

    await generate({
      template: 'angular/page-ts.ts.ejs',
      target: `pages/${dashedName}/${dashedName}.component.ts`,
      props: { name: className, toolbox, helper }
    })

    let module = `\nimport { ${className}Component } from './${dashedName}/${dashedName}.component';`
    await patching.patch('pages/pages-routing.module.ts', {
      insert: module,
      after: `from '@angular/core';`
    })

    module = `\n  { path: '${lower}', component: ${className}Component, data: { title: '${spacedName}' } },`
    await patching.patch('pages/pages-routing.module.ts', {
      insert: module,
      after: `const routes: Routes = [`
    })

    module = `\nimport { ${className}Component } from './${dashedName}/${dashedName}.component';`
    await patching.patch('pages/pages.module.ts', {
      insert: module,
      after: `from '@angular/core';`
    })

    module = `\n    ${className}Component,`
    await patching.patch('pages/pages.module.ts', {
      insert: module,
      after: `declarations: [`
    })

    module = `\n        { name: '${className}', icon: 'fi-database', route: '${lower}', isNew: false },`
    await patching.patch('layout/side-menu/side-menu.component.ts', {
      insert: module,
      after: `name: '{ name: 'Clientes', icon: 'fi-users', route: 'client', isNew: false },`
    })
    print.success(`=============ANGULAR TS====================`)
    print.info(
      `import { ${className}Component } from './${dashedName}/${dashedName}.component';`
    )

    print.info(
      `{ path: '${lower}', component: ${className}Component, data: { title: '${className}' } },`
    )
  }
}
