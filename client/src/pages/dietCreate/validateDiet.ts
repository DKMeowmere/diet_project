import { Diet } from "../../types/diet"

export function validate(diet: Diet) {
	const days = diet.days

	if (!diet.days.length) {
		throw new Error("Musisz podać przynajmniej 1 dzień")
	}

	days.forEach(day => {
		if (!day.meals.length) {
			throw new Error(
				`Musisz podać przynajmniej 1 posiłek do dnia: ${day.day}`
			)
		}

		if (!day.day) {
			throw new Error(`Musisz podać nazwe dnia`)
		}

		day.meals.forEach(meal => {
			if (!meal.name) {
				throw new Error(`Musisz podać nazwe posiłku`)
			}

			if (!meal.products.length) {
				throw new Error(
					`Musisz podać przynajmniej 1 produkt do posiłku: ${meal.name}`
				)
			}

			meal.products.forEach(product => {
				if (isNaN(+product.count)) {
					throw new Error(
						`Ilość produktu: ${product.product.name} w posiłku: ${meal.name} w dniu: ${day.day} to nie liczba`
					)
				}

				if ((isNaN(+product.grams))) {
					throw new Error(
						`Gramy produktu: ${product.product.name} w posiłku: ${meal.name} w dniu: ${day.day} to nie liczba`
					)
				}
			})
		})
	})
}

