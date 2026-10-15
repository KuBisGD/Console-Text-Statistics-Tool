import base from '@lnu/eslint-config'
import jsdoc from '@lnu/eslint-config/jsdoc'
import node from '@lnu/eslint-config/node'

export default [...base, ...node, ...jsdoc]