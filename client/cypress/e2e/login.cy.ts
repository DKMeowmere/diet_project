context("login", () => {
	it("should login correctly", () => {
		cy.visit("/")
		cy.getBySel("password-input").type(Cypress.env("appPassword"))
		cy.getBySel("password-submit")
			.click()
			.then(() => {
				cy.wait(500)
				cy.getCookie("token").should("exist")
			})
	})
	it("should not  login correctly", () => {
		cy.visit("/")
		cy.getBySel("password-input").type("WRONG PASSWORD")
		cy.getBySel("password-submit")
			.click()
			.then(() => {
				cy.wait(500)
				cy.getCookie("token").should("not.exist")
			})
	})
})
