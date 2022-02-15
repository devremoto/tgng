import { GluegunToolbox } from 'gluegun/build/types/domain/toolbox'
// import { GluegunParameters, GluegunToolbox } from 'gluegun'

export class Helper {
  /**
   *
   */
  constructor(private toolbox: GluegunToolbox) {}
  validate = () => {
    const { print, parameters } = this.toolbox
    const name = parameters.first
    print.info('start validade')

    if (!name) {
      print.error(
        `ClassName is missing!\nYou must provide a class name as the second parameter\nex:\ntgng ClassName`
      )
      return false
    }

    return true
  }

  toLower(input: string) {
    return input.toLowerCase()
  }
  toUnderscore(input: string) {
    const pattern = /([a-z])([A-Z]+)/gi
    const replacement = '$1_$2'
    const result = input.replace(pattern, replacement)
    return result
  }

  toDash(input: string) {
    const pattern = /([a-z])([A-Z]+)/g
    const replacement = '$1-$2'
    const result = input.replace(pattern, replacement)
    return result
  }

  toSpacedName(input: string) {
    const pattern = /([a-z])([A-Z]+)/g
    const replacement = '$1 $2'
    const result = input.replace(pattern, replacement)
    return result
  }

  ucFirst = (input: string) => {
    const pattern = /^[a-z]/g
    const result = input.replace(pattern, match => match.toUpperCase())
    return result
  }

  lcFirst = (input: string) => {
    const pattern = /^[A-Z]/g
    const result = input.replace(pattern, match => match.toLowerCase())
    return result
  }
}
