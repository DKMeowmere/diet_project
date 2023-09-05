import { product } from "../fixtures/product"

describe("Product create", () => {
	before(() => {
		cy.login(Cypress.env("appPassword"))
	})
	beforeEach(() => {
		cy.visit("/product/create")
	})
	it("should create product", () => {
		cy.getBySel("product-name-input").type(product.name)
		cy.getBySel("product-calories-input")
			.clear()
			.type(product.calories.toString())
		cy.getBySel("product-carbohydrates-input").type(
			product.carbohydrates.toString()
		)
		cy.getBySel("product-fats-input").clear().type(product.fats.toString())
		cy.getBySel("product-proteins-input")
			.clear()
			.type(product.proteins.toString())
		cy.getBySel("product-proteins-input")
			.clear()
			.type(product.proteins.toString())

		cy.getBySel("product-submit-btn").click()
	})
})
