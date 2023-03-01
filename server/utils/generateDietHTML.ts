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
					body{
						margin: 0;
					}
					.container {
						height: 100vh;
						width: 100vw;
					}
					.day-container{
						margin:auto;
						padding-bottom: 200px;
							
					}
					.diet-title{
							font-size: 3.5rem;
							margin-bottom:30px;
							text-align:center;
					}
					.diet-description{
						font-size: 2.5rem;
						text-align:center;
					}
					.day-name{
							font-size: 2.5rem;
							padding: 20px 0px;
							width: 50%;
							text-align: center;
							border-bottom: 0.2rem solid black;
							text-align:center;
					}
					.meal-name{
							font-size: 2rem;
							text-align:center;
					}
					.meal-description{
							font-size: 1.3rem;
							width: 50%;
							text-align: center;						
					}
					table{
							border-collapse: collapse;
							margin:auto;
					}
					.cell{
							border: 2px solid black;
							padding: 20px;
							text-align: center;						
					}
					th{
							background-color: #ffa500;
							color: #fff;
							text-align: center;						
					}
				</style>
			</head>
			<body>
				<div class="container">
					<div class="diet-title">
							${diet.title}
							</div>
							${diet.description && `<div >${diet.description}</div>`}
				</div>
				${diet.days.map(
					day => `
					<div class="day-container">
						<div class="day-name">${day.day}</div>
						${day.meals.map(
							meal => `
							<div class="meal-name">${meal.name}</div>
							${
								meal.description &&
								`<div class="meal-description">
								${meal.description}
							</div>`
							}
							<table>
								<thead>
									<tr>
											<th class="cell">Nazwa</th>
											<th class="cell">Kalorie</th>
											<th class="cell">Białka</th>
											<th class="cell">Tłuszcze</th>
											<th class="cell">Węglowodany</th>
											<th class="cell">Ilość</th>
											<th class="cell">Waga</th>
									</tr>
								</thead>
								${meal.products.map(
									(product: any) => `
										<tr>
											<td class="cell">${product.product.name}</td>
											<td class="cell">${product.product.calories}</td>
											<td class="cell">${product.product.proteins}</td>
											<td class="cell">${product.product.fats}</td>
											<td class="cell">${product.product.carbohydrates}</td>
											<td class="cell">${product.count}</td>
											<td class="cell">${product.grams}</td>
										</tr>
								`
								)}
							<tfoot>
								<tr>
										<th class="cell">Nazwa</th>
										<th class="cell">Kalorie</th>
										<th class="cell">Białka</th>
										<th class="cell">Tłuszcze</th>
										<th class="cell">Węglowodany</th>
										<th class="cell">Ilość</th>
										<th class="cell">Waga</th>
								</tr>
							</tfoot>
							</table>
						`
						)}
					</div>
				`
				)}
			</body>
	</html>
	`
}
