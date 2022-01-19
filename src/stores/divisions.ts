import { promises as fs } from 'fs'
import { resolve } from 'path'
import { Division as DivisionJson } from '../types/division'
import { getManager } from 'typeorm'
import { Division } from '../entity/Division'

export async function upsertDefaultDivisions() {
  const entityManager = getManager()
  const defaultDivisionsFile = await fs.readFile(
    resolve(__dirname, '../default-divisions.json'),
    'utf-8',
  )
  const defaultDivisions: DivisionJson[] = JSON.parse(defaultDivisionsFile)
  await Promise.all(
    defaultDivisions.map(async (division) => {
      const divisionEntity = await entityManager.findOne(Division, {
        where: {
          name: division.name,
        },
      })
      if (!divisionEntity) {
        await entityManager.insert(Division, {
          id: division.id,
          name: division.name,
        })
      }
    }),
  )
}

export async function getAllDivisions() {
  const entityManager = getManager()
  return entityManager.find(Division, { select: ['name'] })
}
