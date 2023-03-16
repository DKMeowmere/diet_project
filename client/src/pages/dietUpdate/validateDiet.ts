import { Diet } from "../../types/diet"

export function validate(diet: Diet) {
	const days = diet.days

	if (!diet.days.length) {
		throw new Error("Musisz podać przynajmniej 1 dzień")
	}

	days.forEach(day => {
		if (!day.meals.length) {
			throw new Error(`Musisz podać przynajmniej 1 posiłek do dnia: ${day.day}`)
		}

		if (!day.day) {
			throw new Error(`Musisz podać nazwe dnia`)
		}

		day.meals.forEach(meal => {
			if (!meal.name) {
				throw new Error(`Musisz podać nazwe posiłku`)
			}

			if (!meal.products.length && !meal.dishes.length) {
				throw new Error(
					`Musisz podać przynajmniej 1 produkt lub potrawe do posiłku: ${meal.name}`
				)
			}

			meal.products.forEach(product => {
				if (isNaN(+product.count)) {
					throw new Error(
						`Ilość produktu: ${product.product.name} w posiłku: ${meal.name} w dniu: ${day.day} to nie liczba`
					)
				}

				if (isNaN(+product.grams)) {
					throw new Error(
						`Gramy produktu: ${product.product.name} w posiłku: ${meal.name} w dniu: ${day.day} to nie liczba`
					)
				}
			})

			meal.dishes.forEach(dish => {
				if (isNaN(+dish.count)) {
					throw new Error(
						`Ilość potrawy: ${dish.dishDetails.name} w posiłku: ${meal.name} w dniu: ${day.day} to nie liczba`
					)
				}

				if (isNaN(+dish.grams)) {
					throw new Error(
						`Gramy potrawy: ${dish.dishDetails.name} w posiłku: ${meal.name} w dniu: ${day.day} to nie liczba`
					)
				}
			})
		})
	})
}
