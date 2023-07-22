import type { DMMF } from '@prisma/generator-helper'
import type { JSONSchema7Definition } from 'json-schema'
import { TransformOptions } from './types'
import { toCamelCase, definitionsRootObject } from './helpers'

import { getInitialJSON } from './jsonSchema'
import { getJSONSchemaModel } from './model'
import { JSONSchema7Extended } from './types'

function getPropertyDefinition({
    schemaId,
    definitionsRoot,
}: TransformOptions) {
    return (
        model: DMMF.Model,
    ): [name: string, reference: JSONSchema7Definition] => {
        const ref = `${definitionsRoot}${model.name}`
        return [
            toCamelCase(model.name),
            {
                $ref: schemaId ? `${schemaId}${ref}` : ref,
            },
        ]
    }
}

export function transformDMMF(
    dmmf: DMMF.Document,
    transformOptions: TransformOptions,
): JSONSchema7Extended {
    // TODO: Remove default values as soon as prisma version < 3.10.0 doesn't have to be supported anymore
    const { models = [], enums = [], types = [] } = dmmf.datamodel
    const initialJSON = getInitialJSON(transformOptions.definitionsRoot)
    const { schemaId } = transformOptions

    const modelDefinitionsMap = models.map(
        getJSONSchemaModel({ enums }, transformOptions),
    )

    const typeDefinitionsMap = types.map(
        getJSONSchemaModel({ enums }, transformOptions),
    )

    const modelPropertyDefinitionsMap = models.map(
        getPropertyDefinition(transformOptions),
    )
    const definitions = Object.fromEntries([
        ...modelDefinitionsMap,
        ...typeDefinitionsMap,
    ])

    const properties = Object.fromEntries(modelPropertyDefinitionsMap)

    return {
        ...(schemaId ? { $id: schemaId } : null),
        ...initialJSON,
        ...(definitionsRootObject(
            transformOptions.definitionsRoot,
            definitions,
        ) as object),
        properties,
    } as JSONSchema7Extended
}
