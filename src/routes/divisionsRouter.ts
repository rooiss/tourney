import { Router } from 'express'
import { divisionEntityToJson } from '../mappers/divisionEntityToJson'
import { getAllDivisions } from '../stores/divisions'
import asyncHandler from '../utils/asyncHandler'

const router = Router()

router.get(
  '/',
  asyncHandler(async (req: any, res) => {
    let response
    try {
      const divisions = await getAllDivisions()
      response = {
        success: true,
        divisions: divisions.map(divisionEntityToJson),
      }
    } catch (e) {
      console.error(
        `divisionRoouter: an error occured while fetching divisions`,
        e,
      )
      response = {
        success: false,
        error: 'Failed to fetch divisions',
      }
    }
    res.json(response)
  }),
)

export default router
