import { createSystem, defaultConfig } from '@chakra-ui/react';

export const customStyles = createSystem(defaultConfig, {
	theme: {
		tokens: {
			fonts: {
				body: { value: `'Montserrat', sans-serif` },
				heading: { value: `'Montserrat', sans-serif` },
			},
			// fontWeights: {
			// 	extralight: { value: '100' }, 
			// 	lighter: { value: '200' }, 
			// 	light: { value: '300' }, 
			// 	normal: { value: '400' },
			// 	medium: { value: '500' }, 
			// 	bold: { value: '600' }, 
			// 	bolder: { value: '700' }, 
			// 	extrabold: { value: '800' }, 
			// 	black: { value: '900' }, 
			// },
			colors: {
				yellow: {
					50: { value: '#fff9e6' },
					200: { value: '#ffe28d' },
					300: { value: '#ffd559' },
					400: { value: '#ffcd39' },
					500: { value: '#ffc107' },
					700: { value: '#b58905' },
				},
				green: {
					50: { value: '#f1fbf7' },
					200: { value: '#bfecd9' },
					300: { value: '#a2e4c8' },
					400: { value: '#90debd' },
					500: { value: '#74d6ad' },
					700: { value: '#52987b' }
				},
				blue: {
					50: { value: '#e7e9eb' },
					200: { value: '#9298a1' },
					300: { value: '#606976' },
					400: { value: '#414c5c' },
					500: { value: '#121f33' },
					700: { value: '#0d1624' }
				},
				black: {
					light: { value: '#e6e6e6' },
					lightHover: { value: '#d9d9d9' },
					lightActive: { value: '#b0b0b0' },
					normal: { value: '#000000' },
					normalHover: { value: '#000000' },
					normalActive: { value: '#000000' }
				},
				stock: {
					low: { value: '#f23030' },
					medium: { value: '#f86b40' },
					good: { value: '#2ce281' },
				},
			},
		},
	}
})