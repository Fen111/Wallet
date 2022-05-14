import React, { useEffect, useState } from 'react'
import Spinner from 'Spinner'
import styled from 'styled-components'
import fetchCourse from 'servises/fetchCourse'
import { animation, vars } from 'stylesheet'

// import { sprite } from 'assets'
import currency_mob from 'assets/images/currency/currency_mob.svg'
import currency_tab from 'assets/images/currency/currency_tab.svg'
import currency_desk from 'assets/images/currency/currency_desk.svg'

const Currenc = styled.div`
	position: relative;
	max-width: 280px;
	height: 174px;
	margin: 0 auto;
	margin-top: 30px;
	border-radius: ${vars.borderRadius.seconary};
	color: ${vars.color.background.primary};
	background-color: ${vars.color.background.card};
	background-image: url(${currency_mob});
	background-repeat: no-repeat;
	background-position: right bottom;

	table {
		width: 100%;
		text-align: center;
		border-collapse: collapse;
		font-family: Circe, sans-serif;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 24px;
		border-spacing: 0;
		margin: 0;
		padding: 0;
	}

	thead {
		font-size: 18px;
		font-weight: bold;
		height: 50px;
	}

	thead td {
		padding: 11px 0 12px;
	}

	thead td:nth-child(1) {
		border-top-left-radius: ${vars.borderRadius.seconary};
		background-color: ${vars.color.background.currency};
	}

	thead td:nth-child(2) {
		background-color: ${vars.color.background.currency};
	}

	thead td:nth-child(3) {
		border-top-right-radius: ${vars.borderRadius.seconary};
		background-color: ${vars.color.background.currency};
	}

	td {
		padding-top: 10px;
	}

	Spinner {
		position: relative;
		top: 50%;
		left: 50%;
		display: flex;
		justify-content: center;
		transform: translate(-50%, -50%);

		@media (min-width: 768px) {
			top: 50%;
		}
	}

	@media (min-width: 768px) {
		max-width: 336px;
		height: 182px;
		background-image: url(${currency_tab});

		currencyShow {
			animation: ${animation.show.currency};
		}
	}

	@media (min-width: 1280px) {
		max-width: 393px;
		height: 347px;
		background-image: url(${currency_desk});
		margin-top: 0;

		thead {
			height: 60px;
		}
		thead td {
			padding: 17px 0 16px;
		}
		td {
			padding-top: 23px;
		}
	}
	@keyframes ${animation.keyframes.currencyShow};
`

export const Currency = () => {
	const [currency, setCurrency] = useState([])
	useEffect(() => {
		const fetchCurrency = async () => {
			const data = await fetchCourse()
			const filteredCurrencies = []
			const currencies = ['USD', 'EUR', 'RUR']
			currencies.forEach((currency) => {
				data.forEach((element) => {
					parseInt(element.buy).toFixed(2)
					if (element.ccy === currency) {
						filteredCurrencies.push({
							ccy: element.ccy,
							buy: Number(element.buy).toFixed(2),
							sale: Number(element.sale).toFixed(2),
						})
					}
				})
			})
			setCurrency(filteredCurrencies)
			localStorage.setItem('currency', JSON.stringify(filteredCurrencies))
			localStorage.setItem('currencyTime', Date.now())
		}
		let currencyLS = JSON.parse(localStorage.getItem('currency'))
		let currencyTime = JSON.parse(localStorage.getItem('currencyTime'))
		if (!currencyLS) {
			fetchCurrency()
		}
		if (Date.now() - currencyTime > 3600000) {
			fetchCurrency()
		} else {
			setCurrency(currencyLS)
		}
	}, [])

	return (
		<Currenc>
			{currency.length === 0 ? (
				<Spinner />
			) : (
				<table>
					<thead>
						<tr>
							<td>Currency</td>
							<td>Buy</td>
							<td>Sell</td>
						</tr>
					</thead>
					<tbody>
						{currency.map((item) => {
							return (
								<tr key={item.ccy}>
									<td>{item.ccy}</td>
									<td>{item.buy}</td>
									<td>{item.sale}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			)}
		</Currenc>
	)
}