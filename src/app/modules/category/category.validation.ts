import { z } from "zod";

const createCategorySchemaValidation = z.object({
  body:z.object({
    name:z.string({required_error:"Name is Required!"})
  })
})
const updateCategorySchemaValidation = z.object({
  body:z.object({
    name:z.string({required_error:"Name is Required!"}).optional()
  })
})

export const categoryValidation ={
  createCategorySchemaValidation,
  updateCategorySchemaValidation
}