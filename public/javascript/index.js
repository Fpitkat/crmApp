

function formatPhoneNumber(event) {
	const input = event.target
	let formatted = input.value.replace(/\D/g, '') // Remove all non-numeric characters

	// Apply the format (123) 456-7890
	if (formatted.length > 3 && formatted.length <= 6) {
		formatted = `(${formatted.slice(0, 3)}) ${formatted.slice(3)}`
	} else if (formatted.length > 6) {
		formatted = `(${formatted.slice(0, 3)}) ${formatted.slice(3, 6)}-${formatted.slice(6, 10)}`
	}

	// Update the input value with the formatted version
	input.value = formatted
}

new Chart(openDeals, {
	type: 'bar',
	data: {
		labels: ['Brunswick', 'Jacksonville', 'Kingsland', 'Yulee', 'Waycross'],
		datasets: [
			{
				label: 'Open Deals',

				data: [12, 19, 7, 5, 2],
				backgroundColor: [
					'#3577EAbf',
					'#E4B05Bbf',
					'#9BA4B5bf',
					'#88C74Bbf',
					'#BC421Ebf'
				],
				borderWidth: 2,
				borderRadius: 8,
			},
		],
	},
	options: {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		responsive: true,
		maintainAspectRatio: true,
	},
})

new Chart(marketSegment, {
	type: 'bar',
	data: {
		labels: ['Body Shop', 'Auto Dealer', 'Tire Dealer', 'General Repair', 'Specialty'],
		datasets: [
			{
				label: 'Market Segment',
				data: [5, 6, 8, 2, 6],
				backgroundColor: [
					'#3577EABF',
					'#E4B05BBF',
					'#9BA4B5BF',
					'#88C74BBF',
					'#BC421EBF'
				],
				borderWidth: 2,
				borderRadius: 8,
			},
		],
	},
	options: {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		responsive: true,
		maintainAspectRatio: true,
	},
});




