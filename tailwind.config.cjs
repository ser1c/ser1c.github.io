import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			'prose': '80ch', // prose
			'md': '640px',   // tablet
			'lg': '1024px',  // computer
			'xl': '1280px',  // large computer
		},
		extend: {
			maxWidth: {
				'md': '640px',  
				'lg': '1024px', 
				'xl': '1280px', 
				'prose': '80ch', // max-w-prose
			},
			fontFamily: {
        serif: ['Libertine', ...defaultTheme.fontFamily.serif], 
				mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
			},
			// Fluid type sizes
			fontSize: {
				'base': '1rem',
				'size--2': 'var(--size--2)',
				'size--1': 'var(--size--1)',
				'size-0':  'var(--size-0)',
				'size-1':  'var(--size-1)',
				'size-2':  'var(--size-2)',
				'size-3':  'var(--size-3)',
				'size-4':  'var(--size-4)',
				'size-5':  'var(--size-5)',
			},
			// Fluid spacing sizes
			spacing: {
				'size-3xs':     'var(--size-3xs)',
				'size-2xs':     'var(--size-2xs)',
				'size-xs':      'var(--size-xs)',
				'size-sm':      'var(--size-sm)',
				'size-md':      'var(--size-md)',
				'size-lg':      'var(--size-lg)',
				'size-xl':      'var(--size-xl)',
				'size-2xl':     'var(--size-2xl)',
				'size-3xl':     'var(--size-3xl)',
				'size-3xs-2xs': 'var(--size-3xs-2xs)',
				'size-2xs-xs':  'var(--size-2xs-xs)',
				'size-xs-sm':   'var(--size-xs-sm)',
				'size-sm-md':   'var(--size-sm-md)',
				'size-md-lg':   'var(--size-md-lg)',
				'size-lg-xl':   'var(--size-lg-xl)',
				'size-xl-2xl':  'var(--size-xl-2xl)',
				'size-2xl-3xl': 'var(--size-2xl-3xl)',
			},
			// colors
			colors: {
				// Original colors still available
				aquamarine: {
					50: "#f4fffd",
					100: "#e9fffb",
					200: "#c7fff4",
					300: "#a5ffee",
					400: "#62ffe1",
					500: "#1EFFD4",
					600: "#1be6bf",
					700: "#17bf9f",
					800: "#12997f",
					900: "#0f7d68",
				},
				daisy: {
					50: "#fefcf6",
					100: "#fdfaec",
					200: "#faf2d0",
					300: "#f7e9b4",
					400: "#f1d97c",
					500: "#EBC944",
					600: "#d4b53d",
					700: "#b09733",
					800: "#8d7929",
					900: "#736221",
				},
				ruby: {
					50: "#faf4f3",
					100: "#f5e9e8",
					200: "#e6c9c5",
					300: "#d7a8a1",
					400: "#b8665b",
					500: "#9A2515",
					600: "#8b2113",
					700: "#741c10",
					800: "#5c160d",
					900: "#4b120a",
				},
				alice: {
					50: "#f3f8fa",
					100: "#e7f2f4",
					200: "#c3dde5",
					300: "#9fc9d5",
					400: "#58a1b5",
					500: "#107895",
					600: "#0e6c86",
					700: "#0c5a70",
					800: "#0a4859",
					900: "#083b49",
				},
				coral: {
					50: "#fef8f4",
					100: "#fef0e9",
					200: "#fcdbc8",
					300: "#fac5a6",
					400: "#f69964",
					500: "#F26D21",
					600: "#da621e",
					700: "#b65219",
					800: "#914114",
					900: "#773510",
				},
				kelly: {
					50: "#f9faf7",
					100: "#f3f4ee",
					200: "#e0e4d5",
					300: "#cdd4bb",
					400: "#a8b389",
					500: "#829356",
					600: "#75844d",
					700: "#626e41",
					800: "#4e5834",
					900: "#40482a",
				},
				// Nepal-inspired Mountain Colors
				mountain: {
					50: "#f8fafc",  // Snow White
					100: "#e2e8f0",
					200: "#cbd5e1", 
					300: "#94a3b8",
					400: "#64748b",
					500: "#475569",  // Mountain Slate
					600: "#334155",  // Mountain Shadow
					700: "#1e293b",
					800: "#0f172a",
					900: "#020617",
				},
				// Nepal-inspired Dhaka Colors
				dhaka: {
					red: "#b91c1c",
					maroon: "#7f1d1d",
					yellow: "#ca8a04",
					blue: "#1e40af",
					gold: "#eab308",
					green: "#14532d"
				},
			},
			backgroundImage: {
				'dhaka-pattern': 'repeating-linear-gradient(-45deg, #b91c1c 0, #b91c1c 1px, transparent 0, transparent 10px), repeating-linear-gradient(45deg, #ca8a04 0, #ca8a04 1px, transparent 0, transparent 10px)',
				'dhaka-border': 'linear-gradient(90deg, #b91c1c 0%, #b91c1c 20%, #ca8a04 20%, #ca8a04 40%, #1e40af 40%, #1e40af 60%, #7f1d1d 60%, #7f1d1d 80%, #eab308 80%, #eab308 100%)',
				'mountain-header': 'linear-gradient(180deg, rgba(248,250,252,0.1) 0%, rgba(203,213,225,0.05) 100%)',
			},
		},
	}
}