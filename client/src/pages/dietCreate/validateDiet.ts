import { Diet } from "../../types/diet"

export function validate(diet: Diet) {
	const days = diet.days

	if (!diet.days.length) {
		throw new Error("Musisz podać przynajmniej 1 dzień")
	}

	if (!diet.caloricGoal) {
		throw new Error("Musisz podać cel kaloryczny")
	}

	if (isNaN(+diet.caloricGoal)) {
		throw new Error("Cel kaloryczny to nie liczba")
	}

	if (
		!diet.macronutrientsDivision.proteins ||
		!diet.macronutrientsDivision.fats ||
		!diet.macronutrientsDivision.carbohydrates
	) {
		throw new Error("Musisz podać wszystkie proporcje makroelementów ")
	}

	if (
		isNaN(+diet.macronutrientsDivision.proteins) ||
		isNaN(+diet.macronutrientsDivision.fats) ||
		isNaN(+diet.macronutrientsDivision.carbohydrates)
	) {
		throw new Error("Proporcje makroelemtów to nie liczba")
	}

	if (
		+diet.macronutrientsDivision.proteins +
			+diet.macronutrientsDivision.fats +
			+diet.macronutrientsDivision.carbohydrates !==
		100
	) {
		throw new Error("Proporcje makroelemtów to nie muszą być równe 100")
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

			if (!meal.products.length) {
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
		})
	})
}
