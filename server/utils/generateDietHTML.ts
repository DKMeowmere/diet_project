import { Diet } from "../types/diet.js"

export default function generateDietHTML(diet: Diet) {
	return `
	<!DOCTYPE html >
		<html lang="pl">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>${diet.title}</title>
				<style>
				</style>
			</head>
			<body>
				<h1>${diet.title}</h1>
				${diet.description && `<p>${diet.description}</p>`}
				<ul>
				${diet.days.map(
					day => `
					<li>
						<h2>${day.day}</h2>
						${day.meals.map(
							meal => `
							<h2>${meal.name}</h2>
							${meal.description && `<p>${meal.description}</p>`}
							${meal.products.map(
								(product: any) => `
									<h3>${product.product.name}</h3>
									<ul>
										<li>Ilość:${product.count}</li>
										<li>Gramy:${product.grams}</li>
										<li>Kalorie:${product.product.calories}</li>
										<li>Białka:${product.product.proteins}</li>
										<li>Węglowodany:${product.product.carbohydrates}</li>
										<li>Tłuszcze:${product.product.fats}</li>
									</ul>
							`
							)}
						`
						)}
					</li>
				`
				)}
				</ul>
			</body>
	</html>
	`
}
