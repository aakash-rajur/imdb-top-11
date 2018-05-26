function getFraction(total, fraction) {
	return (total * fraction) | 0;
}

export default screenWidth => {
	return {
		desktop: {
			height: '100%',
			display: 'grid',
			gridTemplate: '80%/85%',
			justifyContent: 'center',
			alignContent: 'center'
		},
		blurredBackground: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			top: 0,
			left: 0
		},
		blur: {
			filter: 'blur(8px) saturate(2) grayscale(100%)'
		},
		panel: {
			display: 'grid',
			gridTemplate: '15% 2fr 6% 20%/40% 1fr 1fr',
			gridGap: '8px',
			padding: 16,
			color: 'white',
			zIndex: 2
		},
		poster: {
			gridRow: '1/span 4',
			borderRadius: 4,
			background: 'lightgray'
		},
		posterImage: {
			borderRadius: 4,
			boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
		},
		title: {
			gridColumn: '2/span 2',
			textAlign: 'start',
			margin: 0,
			fontSize: '2em',
			textTransform:'uppercase'
		},
		ratingWrapper: {
			justifySelf: 'center',
			display: 'grid',
			gridTemplate: '1fr auto/10% 1fr',
			gridGap: '8px',
			height: '100%',
		},
		ratingPosition: {
			gridRow: '1',
			gridColumn: '1/span 2',
			justifySelf: 'center',
			zIndex: 3,
			alignSelf: 'start'
		},
		rating: {
			extend: 'ratingPosition',
			alignSelf: 'center',
			height: '100%'
		},
		ratingText: {
			extend: 'ratingPosition',
			fontSize: '3em',
			fontWeight: 'bold',
			color: 'white',
			marginTop: 'calc(50% - 1em)'
		},
		ratingPercent: {
			extend: 'ratingPosition',
			margin: 'calc(50% - 2.4em) 0 0 66px'
		},
		ratingSub: {
			extend: 'ratingPosition',
			marginTop: 'calc(50% + 1em)',
			fontSize: '1em',
			textTransform: 'uppercase'
		},
		ratingLegend: {
			display: 'flex',
			fontSize: '70%',
		},
		legendDot: {
			width: '90%',
			height: '90%',
			borderRadius: '100%',
			zIndex: 2
		},
		legendText: {
			fontSize: '0.8em'
		},
		plotTitle: {
			gridColumn: '2/span 2',
			fontWeight: 'bold',
			padding: 4,
			alignSelf: 'end',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textTransform: 'uppercase',
			fontSize: '1em'
		},
		plotContent: {
			gridColumn: '2/span 2',
			fontSize: '1em'
		},
		[`@media (max-width: ${getFraction(screenWidth, 0.67)}px)`]: {
			desktop: {
				gridTemplate: `75%/${getFraction(screenWidth, 0.55)}px`
			}
		},
		[`@media (max-width: ${getFraction(screenWidth, 0.55)}px)`]: {
			desktop: {
				gridTemplate: '75%/1fr'
			}
		}
	}
		;
};