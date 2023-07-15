import { AppError } from "@errors/AppError"
import { InMemoryCategoriesRepository } from "@modules/cars/repositories/in-memory/InMemoryCategoriesRepository"

import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let imMemoryCategoriesRepository: InMemoryCategoriesRepository
let sut: CreateCategoryUseCase

describe("Create Category", () => {
  beforeEach(() => {
    imMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(imMemoryCategoriesRepository)
  })

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test"
    }

    await sut.execute(category)

    const createdCategory = await imMemoryCategoriesRepository.findByName(category.name)

    expect(createdCategory).toHaveProperty("id")
  })

  it("Should not be able to create a new category with existent name.", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test"
    }

    expect(async () => {
      await sut.execute(category)
      await sut.execute(category)

      await imMemoryCategoriesRepository.findByName(category.name)
    }).rejects.toBeInstanceOf(AppError)

  })
})