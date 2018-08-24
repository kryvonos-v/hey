import { schema, normalize } from 'normalizr'

export function normalizeArray (array: object[]) {
  const arrayItem = new schema.Entity('map')

  return normalize({ array }, { array: [arrayItem] })
}
