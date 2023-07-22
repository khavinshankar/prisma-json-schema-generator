import type { DMMF } from '@prisma/generator-helper'

import { JSONSchema7DefinitionExtended, JSONSchema7Extended } from './types'

export type PrismaPrimitive =
    | 'String'
    | 'BigInt'
    | 'Bytes'
    | 'Decimal'
    | 'Boolean'
    | 'Int'
    | 'Float'
    | 'Json'
    | 'DateTime'

type ScalarField = DMMF.Field & { type: PrismaPrimitive }

export function isScalarType(field: DMMF.Field): field is ScalarField {
    return field['kind'] === 'scalar'
}

export function isEnumType(field: DMMF.Field): boolean {
    return field['kind'] === 'enum'
}

export function isDefined<T>(value: T | undefined | null): value is T {
    return value !== undefined && value !== null
}

export function assertNever(value: never): never {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    )
}

export function toCamelCase(name: string): string {
    return name.substring(0, 1).toLowerCase() + name.substring(1)
}

export function definitionsRootObject(
    path: string,
    value: JSONSchema7DefinitionExtended = {},
): JSONSchema7DefinitionExtended {
    return path
        .replace(/^#\/(.+)\/$/, '$1')
        .split('/')
        .reduceRight(
            (obj, key) => ({
                [key]: obj,
            }),
            value,
        )
}
