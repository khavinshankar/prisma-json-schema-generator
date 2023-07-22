import { definitionsRootObject } from './helpers'

export const getInitialJSON = (definitionsRoot: string) => ({
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    ...(definitionsRootObject(definitionsRoot) as object),
})
