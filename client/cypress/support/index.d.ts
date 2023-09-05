/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable<Subject = any> {
		getBySel(
			dataTestAttribute: string,
			args?: any
		): Chainable<JQuery<HTMLElement>>
		getBySelLike(
			dataTestPrefixAttribute: string,
			args?: any
		): Chainable<JQuery<HTMLElement>>
		login(password: string)
	}
}
