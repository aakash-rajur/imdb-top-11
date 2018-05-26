export default {
	'@global': {
		html: {
			height: '100vh',
			fontFamily: "'Open Sans', sans-serif;"
		},
		body: {
			margin: 0,
			height: '100%',
			overflow: 'hidden',
			'& #root': {
				height: '100%',
				position: 'relative'
			}
		},
		'::-webkit-scrollbar': {
			width: 0
		}
	}
};