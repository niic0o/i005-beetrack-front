import { createSystem, defaultConfig } from '@chakra-ui/react';

export const customStyles = createSystem(defaultConfig, {
	theme: {
		tokens: {
			fonts: {
				body: { value: `'Montserrat', sans-serif` },
				heading: { value: `'Montserrat', sans-serif` },
			},
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
				background:{
					white: { value: '#ffffff' },
					25: { value: '#f7f9fc' },
					50: { value: '#e7e9eb' },
					100: { value: '#b6bac0' },
					200: { value: '#9298A1' },
					300: { value: '#606976' },
				}
			},
			shadows: {
				soft: { value: '0 2px 4px rgba(0, 0, 0, 0.05)' },
				softer: { value: '0 4px 8px rgba(0, 0, 0, 0.04)' },
				ultraSoft: { value: '0 8px 24px rgba(0, 0, 0, 0.03)' },
			  },
		},
	}
})