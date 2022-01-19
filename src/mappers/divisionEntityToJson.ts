import { Division as DivisionEntity } from '../entity/Division'
import { Division as DivisionJson } from '../types/division'

export function divisionEntityToJson(division: DivisionEntity): DivisionJson {
  return {
    id: division.id,
    name: division.name,
  }
}
