import { DMMF } from '@prisma/generator-helper'
import { JSONSchema7, JSONSchema7Definition } from 'json-schema'

export type JSONSchema7DefinitionExtended =
    | JSONSchema7Definition
    | {
          [key: string]: JSONSchema7DefinitionExtended
      }

export type JSONSchema7Extended =
    | JSONSchema7
    | {
          [key: string]: JSONSchema7DefinitionExtended | undefined
      }

export interface PropertyMetaData {
    required: boolean
    hasDefaultValue: boolean
    isScalar: boolean
}

export interface ModelMetaData {
    enums: DMMF.DatamodelEnum[]
}

export type DefinitionMap = [name: string, definition: JSONSchema7Definition]
export type PropertyMap = [...DefinitionMap, PropertyMetaData]

export interface TransformOptions {
    keepRelationScalarFields?: 'true' | 'false'
    schemaId?: string
    includeRequiredFields?: 'true' | 'false'
    persistOriginalType?: 'true' | 'false'
    toYaml?: 'true' | 'false'
    definitionsRoot: string
}
