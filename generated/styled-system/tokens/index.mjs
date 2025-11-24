const tokens = {
  "aspectRatios.square": {
    "value": "1 / 1",
    "variable": "var(--aspect-ratios-square)"
  },
  "aspectRatios.landscape": {
    "value": "4 / 3",
    "variable": "var(--aspect-ratios-landscape)"
  },
  "aspectRatios.portrait": {
    "value": "3 / 4",
    "variable": "var(--aspect-ratios-portrait)"
  },
  "aspectRatios.wide": {
    "value": "16 / 9",
    "variable": "var(--aspect-ratios-wide)"
  },
  "aspectRatios.ultrawide": {
    "value": "18 / 5",
    "variable": "var(--aspect-ratios-ultrawide)"
  },
  "aspectRatios.golden": {
    "value": "1.618 / 1",
    "variable": "var(--aspect-ratios-golden)"
  },
  "borders.none": {
    "value": "none",
    "variable": "var(--borders-none)"
  },
  "easings.default": {
    "value": "cubic-bezier(0.4, 0, 0.2, 1)",
    "variable": "var(--easings-default)"
  },
  "easings.linear": {
    "value": "linear",
    "variable": "var(--easings-linear)"
  },
  "easings.in": {
    "value": "cubic-bezier(0.4, 0, 1, 1)",
    "variable": "var(--easings-in)"
  },
  "easings.out": {
    "value": "cubic-bezier(0, 0, 0.2, 1)",
    "variable": "var(--easings-out)"
  },
  "easings.in-out": {
    "value": "cubic-bezier(0.4, 0, 0.2, 1)",
    "variable": "var(--easings-in-out)"
  },
  "radii.xs": {
    "value": "0.125rem",
    "variable": "var(--radii-xs)"
  },
  "radii.sm": {
    "value": "0.25rem",
    "variable": "var(--radii-sm)"
  },
  "radii.md": {
    "value": "0.375rem",
    "variable": "var(--radii-md)"
  },
  "radii.lg": {
    "value": "0.5rem",
    "variable": "var(--radii-lg)"
  },
  "radii.xl": {
    "value": "0.75rem",
    "variable": "var(--radii-xl)"
  },
  "radii.2xl": {
    "value": "1rem",
    "variable": "var(--radii-2xl)"
  },
  "radii.3xl": {
    "value": "1.5rem",
    "variable": "var(--radii-3xl)"
  },
  "radii.4xl": {
    "value": "2rem",
    "variable": "var(--radii-4xl)"
  },
  "radii.full": {
    "value": "9999px",
    "variable": "var(--radii-full)"
  },
  "fontWeights.thin": {
    "value": "100",
    "variable": "var(--font-weights-thin)"
  },
  "fontWeights.extralight": {
    "value": "200",
    "variable": "var(--font-weights-extralight)"
  },
  "fontWeights.light": {
    "value": "300",
    "variable": "var(--font-weights-light)"
  },
  "fontWeights.normal": {
    "value": "400",
    "variable": "var(--font-weights-normal)"
  },
  "fontWeights.medium": {
    "value": "500",
    "variable": "var(--font-weights-medium)"
  },
  "fontWeights.semibold": {
    "value": "600",
    "variable": "var(--font-weights-semibold)"
  },
  "fontWeights.bold": {
    "value": "700",
    "variable": "var(--font-weights-bold)"
  },
  "fontWeights.extrabold": {
    "value": "800",
    "variable": "var(--font-weights-extrabold)"
  },
  "fontWeights.black": {
    "value": "900",
    "variable": "var(--font-weights-black)"
  },
  "lineHeights.none": {
    "value": "1",
    "variable": "var(--line-heights-none)"
  },
  "lineHeights.tight": {
    "value": "1.25",
    "variable": "var(--line-heights-tight)"
  },
  "lineHeights.snug": {
    "value": "1.375",
    "variable": "var(--line-heights-snug)"
  },
  "lineHeights.normal": {
    "value": "1.5",
    "variable": "var(--line-heights-normal)"
  },
  "lineHeights.relaxed": {
    "value": "1.625",
    "variable": "var(--line-heights-relaxed)"
  },
  "lineHeights.loose": {
    "value": "2",
    "variable": "var(--line-heights-loose)"
  },
  "letterSpacings.tighter": {
    "value": "-0.05em",
    "variable": "var(--letter-spacings-tighter)"
  },
  "letterSpacings.tight": {
    "value": "-0.025em",
    "variable": "var(--letter-spacings-tight)"
  },
  "letterSpacings.normal": {
    "value": "0em",
    "variable": "var(--letter-spacings-normal)"
  },
  "letterSpacings.wide": {
    "value": "0.025em",
    "variable": "var(--letter-spacings-wide)"
  },
  "letterSpacings.wider": {
    "value": "0.05em",
    "variable": "var(--letter-spacings-wider)"
  },
  "letterSpacings.widest": {
    "value": "0.1em",
    "variable": "var(--letter-spacings-widest)"
  },
  "fontSizes.2xs": {
    "value": "0.5rem",
    "variable": "var(--font-sizes-2xs)"
  },
  "fontSizes.xs": {
    "value": "0.75rem",
    "variable": "var(--font-sizes-xs)"
  },
  "fontSizes.sm": {
    "value": "0.875rem",
    "variable": "var(--font-sizes-sm)"
  },
  "fontSizes.md": {
    "value": "1rem",
    "variable": "var(--font-sizes-md)"
  },
  "fontSizes.lg": {
    "value": "1.125rem",
    "variable": "var(--font-sizes-lg)"
  },
  "fontSizes.xl": {
    "value": "1.25rem",
    "variable": "var(--font-sizes-xl)"
  },
  "fontSizes.2xl": {
    "value": "1.5rem",
    "variable": "var(--font-sizes-2xl)"
  },
  "fontSizes.3xl": {
    "value": "1.875rem",
    "variable": "var(--font-sizes-3xl)"
  },
  "fontSizes.4xl": {
    "value": "2.25rem",
    "variable": "var(--font-sizes-4xl)"
  },
  "fontSizes.5xl": {
    "value": "3rem",
    "variable": "var(--font-sizes-5xl)"
  },
  "fontSizes.6xl": {
    "value": "3.75rem",
    "variable": "var(--font-sizes-6xl)"
  },
  "fontSizes.7xl": {
    "value": "4.5rem",
    "variable": "var(--font-sizes-7xl)"
  },
  "fontSizes.8xl": {
    "value": "6rem",
    "variable": "var(--font-sizes-8xl)"
  },
  "fontSizes.9xl": {
    "value": "8rem",
    "variable": "var(--font-sizes-9xl)"
  },
  "shadows.2xs": {
    "value": "0 1px rgb(0 0 0 / 0.05)",
    "variable": "var(--shadows-2xs)"
  },
  "shadows.xs": {
    "value": "var(--shadows-xs)",
    "variable": "var(--shadows-xs)"
  },
  "shadows.sm": {
    "value": "var(--shadows-sm)",
    "variable": "var(--shadows-sm)"
  },
  "shadows.md": {
    "value": "var(--shadows-md)",
    "variable": "var(--shadows-md)"
  },
  "shadows.lg": {
    "value": "var(--shadows-lg)",
    "variable": "var(--shadows-lg)"
  },
  "shadows.xl": {
    "value": "var(--shadows-xl)",
    "variable": "var(--shadows-xl)"
  },
  "shadows.2xl": {
    "value": "var(--shadows-2xl)",
    "variable": "var(--shadows-2xl)"
  },
  "shadows.inset-2xs": {
    "value": "inset 0 1px rgb(0 0 0 / 0.05)",
    "variable": "var(--shadows-inset-2xs)"
  },
  "shadows.inset-xs": {
    "value": "inset 0 1px 1px rgb(0 0 0 / 0.05)",
    "variable": "var(--shadows-inset-xs)"
  },
  "shadows.inset-sm": {
    "value": "inset 0 2px 4px rgb(0 0 0 / 0.05)",
    "variable": "var(--shadows-inset-sm)"
  },
  "blurs.xs": {
    "value": "4px",
    "variable": "var(--blurs-xs)"
  },
  "blurs.sm": {
    "value": "8px",
    "variable": "var(--blurs-sm)"
  },
  "blurs.md": {
    "value": "12px",
    "variable": "var(--blurs-md)"
  },
  "blurs.lg": {
    "value": "16px",
    "variable": "var(--blurs-lg)"
  },
  "blurs.xl": {
    "value": "24px",
    "variable": "var(--blurs-xl)"
  },
  "blurs.2xl": {
    "value": "40px",
    "variable": "var(--blurs-2xl)"
  },
  "blurs.3xl": {
    "value": "64px",
    "variable": "var(--blurs-3xl)"
  },
  "spacing.0": {
    "value": "0rem",
    "variable": "var(--spacing-0)"
  },
  "spacing.1": {
    "value": "0.25rem",
    "variable": "var(--spacing-1)"
  },
  "spacing.2": {
    "value": "0.5rem",
    "variable": "var(--spacing-2)"
  },
  "spacing.3": {
    "value": "0.75rem",
    "variable": "var(--spacing-3)"
  },
  "spacing.4": {
    "value": "1rem",
    "variable": "var(--spacing-4)"
  },
  "spacing.5": {
    "value": "1.25rem",
    "variable": "var(--spacing-5)"
  },
  "spacing.6": {
    "value": "1.5rem",
    "variable": "var(--spacing-6)"
  },
  "spacing.7": {
    "value": "1.75rem",
    "variable": "var(--spacing-7)"
  },
  "spacing.8": {
    "value": "2rem",
    "variable": "var(--spacing-8)"
  },
  "spacing.9": {
    "value": "2.25rem",
    "variable": "var(--spacing-9)"
  },
  "spacing.10": {
    "value": "2.5rem",
    "variable": "var(--spacing-10)"
  },
  "spacing.11": {
    "value": "2.75rem",
    "variable": "var(--spacing-11)"
  },
  "spacing.12": {
    "value": "3rem",
    "variable": "var(--spacing-12)"
  },
  "spacing.14": {
    "value": "3.5rem",
    "variable": "var(--spacing-14)"
  },
  "spacing.16": {
    "value": "4rem",
    "variable": "var(--spacing-16)"
  },
  "spacing.20": {
    "value": "5rem",
    "variable": "var(--spacing-20)"
  },
  "spacing.24": {
    "value": "6rem",
    "variable": "var(--spacing-24)"
  },
  "spacing.28": {
    "value": "7rem",
    "variable": "var(--spacing-28)"
  },
  "spacing.32": {
    "value": "8rem",
    "variable": "var(--spacing-32)"
  },
  "spacing.36": {
    "value": "9rem",
    "variable": "var(--spacing-36)"
  },
  "spacing.40": {
    "value": "10rem",
    "variable": "var(--spacing-40)"
  },
  "spacing.44": {
    "value": "11rem",
    "variable": "var(--spacing-44)"
  },
  "spacing.48": {
    "value": "12rem",
    "variable": "var(--spacing-48)"
  },
  "spacing.52": {
    "value": "13rem",
    "variable": "var(--spacing-52)"
  },
  "spacing.56": {
    "value": "14rem",
    "variable": "var(--spacing-56)"
  },
  "spacing.60": {
    "value": "15rem",
    "variable": "var(--spacing-60)"
  },
  "spacing.64": {
    "value": "16rem",
    "variable": "var(--spacing-64)"
  },
  "spacing.72": {
    "value": "18rem",
    "variable": "var(--spacing-72)"
  },
  "spacing.80": {
    "value": "20rem",
    "variable": "var(--spacing-80)"
  },
  "spacing.96": {
    "value": "24rem",
    "variable": "var(--spacing-96)"
  },
  "spacing.0.5": {
    "value": "0.125rem",
    "variable": "var(--spacing-0\\.5)"
  },
  "spacing.1.5": {
    "value": "0.375rem",
    "variable": "var(--spacing-1\\.5)"
  },
  "spacing.2.5": {
    "value": "0.625rem",
    "variable": "var(--spacing-2\\.5)"
  },
  "spacing.3.5": {
    "value": "0.875rem",
    "variable": "var(--spacing-3\\.5)"
  },
  "spacing.4.5": {
    "value": "1.125rem",
    "variable": "var(--spacing-4\\.5)"
  },
  "spacing.5.5": {
    "value": "1.375rem",
    "variable": "var(--spacing-5\\.5)"
  },
  "sizes.0": {
    "value": "0rem",
    "variable": "var(--sizes-0)"
  },
  "sizes.1": {
    "value": "0.25rem",
    "variable": "var(--sizes-1)"
  },
  "sizes.2": {
    "value": "0.5rem",
    "variable": "var(--sizes-2)"
  },
  "sizes.3": {
    "value": "0.75rem",
    "variable": "var(--sizes-3)"
  },
  "sizes.4": {
    "value": "1rem",
    "variable": "var(--sizes-4)"
  },
  "sizes.5": {
    "value": "1.25rem",
    "variable": "var(--sizes-5)"
  },
  "sizes.6": {
    "value": "1.5rem",
    "variable": "var(--sizes-6)"
  },
  "sizes.7": {
    "value": "1.75rem",
    "variable": "var(--sizes-7)"
  },
  "sizes.8": {
    "value": "2rem",
    "variable": "var(--sizes-8)"
  },
  "sizes.9": {
    "value": "2.25rem",
    "variable": "var(--sizes-9)"
  },
  "sizes.10": {
    "value": "2.5rem",
    "variable": "var(--sizes-10)"
  },
  "sizes.11": {
    "value": "2.75rem",
    "variable": "var(--sizes-11)"
  },
  "sizes.12": {
    "value": "3rem",
    "variable": "var(--sizes-12)"
  },
  "sizes.14": {
    "value": "3.5rem",
    "variable": "var(--sizes-14)"
  },
  "sizes.16": {
    "value": "4rem",
    "variable": "var(--sizes-16)"
  },
  "sizes.20": {
    "value": "5rem",
    "variable": "var(--sizes-20)"
  },
  "sizes.24": {
    "value": "6rem",
    "variable": "var(--sizes-24)"
  },
  "sizes.28": {
    "value": "7rem",
    "variable": "var(--sizes-28)"
  },
  "sizes.32": {
    "value": "8rem",
    "variable": "var(--sizes-32)"
  },
  "sizes.36": {
    "value": "9rem",
    "variable": "var(--sizes-36)"
  },
  "sizes.40": {
    "value": "10rem",
    "variable": "var(--sizes-40)"
  },
  "sizes.44": {
    "value": "11rem",
    "variable": "var(--sizes-44)"
  },
  "sizes.48": {
    "value": "12rem",
    "variable": "var(--sizes-48)"
  },
  "sizes.52": {
    "value": "13rem",
    "variable": "var(--sizes-52)"
  },
  "sizes.56": {
    "value": "14rem",
    "variable": "var(--sizes-56)"
  },
  "sizes.60": {
    "value": "15rem",
    "variable": "var(--sizes-60)"
  },
  "sizes.64": {
    "value": "16rem",
    "variable": "var(--sizes-64)"
  },
  "sizes.72": {
    "value": "18rem",
    "variable": "var(--sizes-72)"
  },
  "sizes.80": {
    "value": "20rem",
    "variable": "var(--sizes-80)"
  },
  "sizes.96": {
    "value": "24rem",
    "variable": "var(--sizes-96)"
  },
  "sizes.0.5": {
    "value": "0.125rem",
    "variable": "var(--sizes-0\\.5)"
  },
  "sizes.1.5": {
    "value": "0.375rem",
    "variable": "var(--sizes-1\\.5)"
  },
  "sizes.2.5": {
    "value": "0.625rem",
    "variable": "var(--sizes-2\\.5)"
  },
  "sizes.3.5": {
    "value": "0.875rem",
    "variable": "var(--sizes-3\\.5)"
  },
  "sizes.4.5": {
    "value": "1.125rem",
    "variable": "var(--sizes-4\\.5)"
  },
  "sizes.5.5": {
    "value": "1.375rem",
    "variable": "var(--sizes-5\\.5)"
  },
  "sizes.xs": {
    "value": "20rem",
    "variable": "var(--sizes-xs)"
  },
  "sizes.sm": {
    "value": "24rem",
    "variable": "var(--sizes-sm)"
  },
  "sizes.md": {
    "value": "28rem",
    "variable": "var(--sizes-md)"
  },
  "sizes.lg": {
    "value": "32rem",
    "variable": "var(--sizes-lg)"
  },
  "sizes.xl": {
    "value": "36rem",
    "variable": "var(--sizes-xl)"
  },
  "sizes.2xl": {
    "value": "42rem",
    "variable": "var(--sizes-2xl)"
  },
  "sizes.3xl": {
    "value": "48rem",
    "variable": "var(--sizes-3xl)"
  },
  "sizes.4xl": {
    "value": "56rem",
    "variable": "var(--sizes-4xl)"
  },
  "sizes.5xl": {
    "value": "64rem",
    "variable": "var(--sizes-5xl)"
  },
  "sizes.6xl": {
    "value": "72rem",
    "variable": "var(--sizes-6xl)"
  },
  "sizes.7xl": {
    "value": "80rem",
    "variable": "var(--sizes-7xl)"
  },
  "sizes.8xl": {
    "value": "90rem",
    "variable": "var(--sizes-8xl)"
  },
  "sizes.prose": {
    "value": "65ch",
    "variable": "var(--sizes-prose)"
  },
  "sizes.full": {
    "value": "100%",
    "variable": "var(--sizes-full)"
  },
  "sizes.min": {
    "value": "min-content",
    "variable": "var(--sizes-min)"
  },
  "sizes.max": {
    "value": "max-content",
    "variable": "var(--sizes-max)"
  },
  "sizes.fit": {
    "value": "fit-content",
    "variable": "var(--sizes-fit)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  },
  "animations.spin": {
    "value": "spin 1s linear infinite",
    "variable": "var(--animations-spin)"
  },
  "animations.ping": {
    "value": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    "variable": "var(--animations-ping)"
  },
  "animations.pulse": {
    "value": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    "variable": "var(--animations-pulse)"
  },
  "animations.bounce": {
    "value": "bounce 1s infinite",
    "variable": "var(--animations-bounce)"
  },
  "fonts.rader": {
    "value": "'Rader', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"",
    "variable": "var(--fonts-rader)"
  },
  "fonts.sentinel": {
    "value": "'Sentinel', ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif",
    "variable": "var(--fonts-sentinel)"
  },
  "fonts.gotham": {
    "value": "'Montserrat', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"",
    "variable": "var(--fonts-gotham)"
  },
  "fonts.mono": {
    "value": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace, 'Red Hat Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
    "variable": "var(--fonts-mono)"
  },
  "fonts.sans": {
    "value": "var(--fonts-gotham)",
    "variable": "var(--fonts-sans)"
  },
  "fonts.serif": {
    "value": "var(--fonts-sentinel)",
    "variable": "var(--fonts-serif)"
  },
  "colors.sc.green": {
    "value": "#28b67e",
    "variable": "var(--colors-sc-green)"
  },
  "colors.sc.darkBlue": {
    "value": "#1d3638",
    "variable": "var(--colors-sc-dark-blue)"
  },
  "colors.sc.natural": {
    "value": "#f7f1e7",
    "variable": "var(--colors-sc-natural)"
  },
  "colors.sc.stone": {
    "value": "#cdc3b0",
    "variable": "var(--colors-sc-stone)"
  },
  "colors.sc.white": {
    "value": "#ffffff",
    "variable": "var(--colors-sc-white)"
  },
  "colors.sc.lightGray": {
    "value": "#ebebec",
    "variable": "var(--colors-sc-light-gray)"
  },
  "colors.sc.darkGray": {
    "value": "#636466",
    "variable": "var(--colors-sc-dark-gray)"
  },
  "colors.sc.black": {
    "value": "#323232",
    "variable": "var(--colors-sc-black)"
  },
  "colors.sc.sea": {
    "value": "#03424b",
    "variable": "var(--colors-sc-sea)"
  },
  "colors.sc.gold": {
    "value": "#b68b55",
    "variable": "var(--colors-sc-gold)"
  },
  "colors.sc.sand": {
    "value": "#d4bc9d",
    "variable": "var(--colors-sc-sand)"
  },
  "colors.sc.forest": {
    "value": "#41452b",
    "variable": "var(--colors-sc-forest)"
  },
  "colors.sc.terracotta": {
    "value": "#a8654c",
    "variable": "var(--colors-sc-terracotta)"
  },
  "colors.sc.granite": {
    "value": "#c1b1a8",
    "variable": "var(--colors-sc-granite)"
  },
  "colors.sc.burnt": {
    "value": "#812f13",
    "variable": "var(--colors-sc-burnt)"
  },
  "colors.sc.sun": {
    "value": "#e35c2a",
    "variable": "var(--colors-sc-sun)"
  },
  "colors.sc.desert": {
    "value": "#f7ae6c",
    "variable": "var(--colors-sc-desert)"
  },
  "colors.sc.shadow": {
    "value": "#5c3d34",
    "variable": "var(--colors-sc-shadow)"
  },
  "colors.sc.dusk": {
    "value": "#c08863",
    "variable": "var(--colors-sc-dusk)"
  },
  "colors.sc.dawn": {
    "value": "#d2cfaf",
    "variable": "var(--colors-sc-dawn)"
  },
  "colors.sc.depth": {
    "value": "#414e46",
    "variable": "var(--colors-sc-depth)"
  },
  "colors.sc.coral": {
    "value": "#e96c50",
    "variable": "var(--colors-sc-coral)"
  },
  "colors.sc.peach": {
    "value": "#f8ae85",
    "variable": "var(--colors-sc-peach)"
  },
  "colors.black": {
    "value": "#000000",
    "variable": "var(--colors-black)"
  },
  "colors.black.a1": {
    "value": "rgba(0, 0, 0, 0.05)",
    "variable": "var(--colors-black-a1)"
  },
  "colors.black.a2": {
    "value": "rgba(0, 0, 0, 0.1)",
    "variable": "var(--colors-black-a2)"
  },
  "colors.black.a3": {
    "value": "rgba(0, 0, 0, 0.15)",
    "variable": "var(--colors-black-a3)"
  },
  "colors.black.a4": {
    "value": "rgba(0, 0, 0, 0.2)",
    "variable": "var(--colors-black-a4)"
  },
  "colors.black.a5": {
    "value": "rgba(0, 0, 0, 0.3)",
    "variable": "var(--colors-black-a5)"
  },
  "colors.black.a6": {
    "value": "rgba(0, 0, 0, 0.4)",
    "variable": "var(--colors-black-a6)"
  },
  "colors.black.a7": {
    "value": "rgba(0, 0, 0, 0.5)",
    "variable": "var(--colors-black-a7)"
  },
  "colors.black.a8": {
    "value": "rgba(0, 0, 0, 0.6)",
    "variable": "var(--colors-black-a8)"
  },
  "colors.black.a9": {
    "value": "rgba(0, 0, 0, 0.7)",
    "variable": "var(--colors-black-a9)"
  },
  "colors.black.a10": {
    "value": "rgba(0, 0, 0, 0.8)",
    "variable": "var(--colors-black-a10)"
  },
  "colors.black.a11": {
    "value": "rgba(0, 0, 0, 0.9)",
    "variable": "var(--colors-black-a11)"
  },
  "colors.black.a12": {
    "value": "rgba(0, 0, 0, 0.95)",
    "variable": "var(--colors-black-a12)"
  },
  "colors.white": {
    "value": "#ffffff",
    "variable": "var(--colors-white)"
  },
  "colors.white.a1": {
    "value": "rgba(255, 255, 255, 0.05)",
    "variable": "var(--colors-white-a1)"
  },
  "colors.white.a2": {
    "value": "rgba(255, 255, 255, 0.1)",
    "variable": "var(--colors-white-a2)"
  },
  "colors.white.a3": {
    "value": "rgba(255, 255, 255, 0.15)",
    "variable": "var(--colors-white-a3)"
  },
  "colors.white.a4": {
    "value": "rgba(255, 255, 255, 0.2)",
    "variable": "var(--colors-white-a4)"
  },
  "colors.white.a5": {
    "value": "rgba(255, 255, 255, 0.3)",
    "variable": "var(--colors-white-a5)"
  },
  "colors.white.a6": {
    "value": "rgba(255, 255, 255, 0.4)",
    "variable": "var(--colors-white-a6)"
  },
  "colors.white.a7": {
    "value": "rgba(255, 255, 255, 0.5)",
    "variable": "var(--colors-white-a7)"
  },
  "colors.white.a8": {
    "value": "rgba(255, 255, 255, 0.6)",
    "variable": "var(--colors-white-a8)"
  },
  "colors.white.a9": {
    "value": "rgba(255, 255, 255, 0.7)",
    "variable": "var(--colors-white-a9)"
  },
  "colors.white.a10": {
    "value": "rgba(255, 255, 255, 0.8)",
    "variable": "var(--colors-white-a10)"
  },
  "colors.white.a11": {
    "value": "rgba(255, 255, 255, 0.9)",
    "variable": "var(--colors-white-a11)"
  },
  "colors.white.a12": {
    "value": "rgba(255, 255, 255, 0.95)",
    "variable": "var(--colors-white-a12)"
  },
  "colors.inherit": {
    "value": "inherit",
    "variable": "var(--colors-inherit)"
  },
  "colors.current": {
    "value": "currentColor",
    "variable": "var(--colors-current)"
  },
  "colors.transparent": {
    "value": "rgb(0 0 0 / 0)",
    "variable": "var(--colors-transparent)"
  },
  "durations.fastest": {
    "value": "50ms",
    "variable": "var(--durations-fastest)"
  },
  "durations.faster": {
    "value": "100ms",
    "variable": "var(--durations-faster)"
  },
  "durations.fast": {
    "value": "150ms",
    "variable": "var(--durations-fast)"
  },
  "durations.normal": {
    "value": "200ms",
    "variable": "var(--durations-normal)"
  },
  "durations.slow": {
    "value": "250ms",
    "variable": "var(--durations-slow)"
  },
  "durations.slower": {
    "value": "300ms",
    "variable": "var(--durations-slower)"
  },
  "durations.slowest": {
    "value": "400ms",
    "variable": "var(--durations-slowest)"
  },
  "zIndex.hide": {
    "value": -1,
    "variable": "var(--z-index-hide)"
  },
  "zIndex.base": {
    "value": 0,
    "variable": "var(--z-index-base)"
  },
  "zIndex.docked": {
    "value": 10,
    "variable": "var(--z-index-docked)"
  },
  "zIndex.dropdown": {
    "value": 1000,
    "variable": "var(--z-index-dropdown)"
  },
  "zIndex.sticky": {
    "value": 1100,
    "variable": "var(--z-index-sticky)"
  },
  "zIndex.banner": {
    "value": 1200,
    "variable": "var(--z-index-banner)"
  },
  "zIndex.overlay": {
    "value": 1300,
    "variable": "var(--z-index-overlay)"
  },
  "zIndex.modal": {
    "value": 1400,
    "variable": "var(--z-index-modal)"
  },
  "zIndex.popover": {
    "value": 1500,
    "variable": "var(--z-index-popover)"
  },
  "zIndex.skipLink": {
    "value": 1600,
    "variable": "var(--z-index-skip-link)"
  },
  "zIndex.toast": {
    "value": 1700,
    "variable": "var(--z-index-toast)"
  },
  "zIndex.tooltip": {
    "value": 1800,
    "variable": "var(--z-index-tooltip)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "colors.fg.default": {
    "value": "var(--colors-gray-12)",
    "variable": "var(--colors-fg-default)"
  },
  "colors.fg.muted": {
    "value": "var(--colors-gray-11)",
    "variable": "var(--colors-fg-muted)"
  },
  "colors.fg.subtle": {
    "value": "var(--colors-gray-10)",
    "variable": "var(--colors-fg-subtle)"
  },
  "colors.border": {
    "value": "var(--colors-gray-6)",
    "variable": "var(--colors-border)"
  },
  "colors.primary.solid.fg": {
    "value": "#fff",
    "variable": "var(--colors-primary-solid-fg)"
  },
  "colors.secondary.solid.fg": {
    "value": "#fff",
    "variable": "var(--colors-secondary-solid-fg)"
  },
  "radii.l1": {
    "value": "var(--radii-xs)",
    "variable": "var(--radii-l1)"
  },
  "radii.l2": {
    "value": "var(--radii-sm)",
    "variable": "var(--radii-l2)"
  },
  "radii.l3": {
    "value": "var(--radii-md)",
    "variable": "var(--radii-l3)"
  },
  "radii.l4": {
    "value": "var(--radii-lg)",
    "variable": "var(--radii-l4)"
  },
  "spacing.-1": {
    "value": "calc(var(--spacing-1) * -1)",
    "variable": "var(--spacing-1)"
  },
  "spacing.-2": {
    "value": "calc(var(--spacing-2) * -1)",
    "variable": "var(--spacing-2)"
  },
  "spacing.-3": {
    "value": "calc(var(--spacing-3) * -1)",
    "variable": "var(--spacing-3)"
  },
  "spacing.-4": {
    "value": "calc(var(--spacing-4) * -1)",
    "variable": "var(--spacing-4)"
  },
  "spacing.-5": {
    "value": "calc(var(--spacing-5) * -1)",
    "variable": "var(--spacing-5)"
  },
  "spacing.-6": {
    "value": "calc(var(--spacing-6) * -1)",
    "variable": "var(--spacing-6)"
  },
  "spacing.-7": {
    "value": "calc(var(--spacing-7) * -1)",
    "variable": "var(--spacing-7)"
  },
  "spacing.-8": {
    "value": "calc(var(--spacing-8) * -1)",
    "variable": "var(--spacing-8)"
  },
  "spacing.-9": {
    "value": "calc(var(--spacing-9) * -1)",
    "variable": "var(--spacing-9)"
  },
  "spacing.-10": {
    "value": "calc(var(--spacing-10) * -1)",
    "variable": "var(--spacing-10)"
  },
  "spacing.-11": {
    "value": "calc(var(--spacing-11) * -1)",
    "variable": "var(--spacing-11)"
  },
  "spacing.-12": {
    "value": "calc(var(--spacing-12) * -1)",
    "variable": "var(--spacing-12)"
  },
  "spacing.-14": {
    "value": "calc(var(--spacing-14) * -1)",
    "variable": "var(--spacing-14)"
  },
  "spacing.-16": {
    "value": "calc(var(--spacing-16) * -1)",
    "variable": "var(--spacing-16)"
  },
  "spacing.-20": {
    "value": "calc(var(--spacing-20) * -1)",
    "variable": "var(--spacing-20)"
  },
  "spacing.-24": {
    "value": "calc(var(--spacing-24) * -1)",
    "variable": "var(--spacing-24)"
  },
  "spacing.-28": {
    "value": "calc(var(--spacing-28) * -1)",
    "variable": "var(--spacing-28)"
  },
  "spacing.-32": {
    "value": "calc(var(--spacing-32) * -1)",
    "variable": "var(--spacing-32)"
  },
  "spacing.-36": {
    "value": "calc(var(--spacing-36) * -1)",
    "variable": "var(--spacing-36)"
  },
  "spacing.-40": {
    "value": "calc(var(--spacing-40) * -1)",
    "variable": "var(--spacing-40)"
  },
  "spacing.-44": {
    "value": "calc(var(--spacing-44) * -1)",
    "variable": "var(--spacing-44)"
  },
  "spacing.-48": {
    "value": "calc(var(--spacing-48) * -1)",
    "variable": "var(--spacing-48)"
  },
  "spacing.-52": {
    "value": "calc(var(--spacing-52) * -1)",
    "variable": "var(--spacing-52)"
  },
  "spacing.-56": {
    "value": "calc(var(--spacing-56) * -1)",
    "variable": "var(--spacing-56)"
  },
  "spacing.-60": {
    "value": "calc(var(--spacing-60) * -1)",
    "variable": "var(--spacing-60)"
  },
  "spacing.-64": {
    "value": "calc(var(--spacing-64) * -1)",
    "variable": "var(--spacing-64)"
  },
  "spacing.-72": {
    "value": "calc(var(--spacing-72) * -1)",
    "variable": "var(--spacing-72)"
  },
  "spacing.-80": {
    "value": "calc(var(--spacing-80) * -1)",
    "variable": "var(--spacing-80)"
  },
  "spacing.-96": {
    "value": "calc(var(--spacing-96) * -1)",
    "variable": "var(--spacing-96)"
  },
  "spacing.-0.5": {
    "value": "calc(var(--spacing-0\\.5) * -1)",
    "variable": "var(--spacing-0\\.5)"
  },
  "spacing.-1.5": {
    "value": "calc(var(--spacing-1\\.5) * -1)",
    "variable": "var(--spacing-1\\.5)"
  },
  "spacing.-2.5": {
    "value": "calc(var(--spacing-2\\.5) * -1)",
    "variable": "var(--spacing-2\\.5)"
  },
  "spacing.-3.5": {
    "value": "calc(var(--spacing-3\\.5) * -1)",
    "variable": "var(--spacing-3\\.5)"
  },
  "spacing.-4.5": {
    "value": "calc(var(--spacing-4\\.5) * -1)",
    "variable": "var(--spacing-4\\.5)"
  },
  "spacing.-5.5": {
    "value": "calc(var(--spacing-5\\.5) * -1)",
    "variable": "var(--spacing-5\\.5)"
  },
  "colors.error": {
    "value": "var(--colors-error)",
    "variable": "var(--colors-error)"
  },
  "colors.primary.1": {
    "value": "var(--colors-primary-1)",
    "variable": "var(--colors-primary-1)"
  },
  "colors.primary.2": {
    "value": "var(--colors-primary-2)",
    "variable": "var(--colors-primary-2)"
  },
  "colors.primary.3": {
    "value": "var(--colors-primary-3)",
    "variable": "var(--colors-primary-3)"
  },
  "colors.primary.4": {
    "value": "var(--colors-primary-4)",
    "variable": "var(--colors-primary-4)"
  },
  "colors.primary.5": {
    "value": "var(--colors-primary-5)",
    "variable": "var(--colors-primary-5)"
  },
  "colors.primary.6": {
    "value": "var(--colors-primary-6)",
    "variable": "var(--colors-primary-6)"
  },
  "colors.primary.7": {
    "value": "var(--colors-primary-7)",
    "variable": "var(--colors-primary-7)"
  },
  "colors.primary.8": {
    "value": "var(--colors-primary-8)",
    "variable": "var(--colors-primary-8)"
  },
  "colors.primary.9": {
    "value": "var(--colors-primary-9)",
    "variable": "var(--colors-primary-9)"
  },
  "colors.primary.10": {
    "value": "var(--colors-primary-10)",
    "variable": "var(--colors-primary-10)"
  },
  "colors.primary.11": {
    "value": "var(--colors-primary-11)",
    "variable": "var(--colors-primary-11)"
  },
  "colors.primary.12": {
    "value": "var(--colors-primary-12)",
    "variable": "var(--colors-primary-12)"
  },
  "colors.primary.solid.bg": {
    "value": "var(--colors-primary-solid-bg)",
    "variable": "var(--colors-primary-solid-bg)"
  },
  "colors.primary.solid.bg.hover": {
    "value": "var(--colors-primary-solid-bg-hover)",
    "variable": "var(--colors-primary-solid-bg-hover)"
  },
  "colors.primary.subtle.bg": {
    "value": "var(--colors-primary-subtle-bg)",
    "variable": "var(--colors-primary-subtle-bg)"
  },
  "colors.primary.subtle.bg.hover": {
    "value": "var(--colors-primary-subtle-bg-hover)",
    "variable": "var(--colors-primary-subtle-bg-hover)"
  },
  "colors.primary.subtle.bg.active": {
    "value": "var(--colors-primary-subtle-bg-active)",
    "variable": "var(--colors-primary-subtle-bg-active)"
  },
  "colors.primary.subtle.fg": {
    "value": "var(--colors-primary-subtle-fg)",
    "variable": "var(--colors-primary-subtle-fg)"
  },
  "colors.primary.surface.bg": {
    "value": "var(--colors-primary-surface-bg)",
    "variable": "var(--colors-primary-surface-bg)"
  },
  "colors.primary.surface.bg.active": {
    "value": "var(--colors-primary-surface-bg-active)",
    "variable": "var(--colors-primary-surface-bg-active)"
  },
  "colors.primary.surface.border": {
    "value": "var(--colors-primary-surface-border)",
    "variable": "var(--colors-primary-surface-border)"
  },
  "colors.primary.surface.border.hover": {
    "value": "var(--colors-primary-surface-border-hover)",
    "variable": "var(--colors-primary-surface-border-hover)"
  },
  "colors.primary.surface.fg": {
    "value": "var(--colors-primary-surface-fg)",
    "variable": "var(--colors-primary-surface-fg)"
  },
  "colors.primary.outline.bg.hover": {
    "value": "var(--colors-primary-outline-bg-hover)",
    "variable": "var(--colors-primary-outline-bg-hover)"
  },
  "colors.primary.outline.bg.active": {
    "value": "var(--colors-primary-outline-bg-active)",
    "variable": "var(--colors-primary-outline-bg-active)"
  },
  "colors.primary.outline.border": {
    "value": "var(--colors-primary-outline-border)",
    "variable": "var(--colors-primary-outline-border)"
  },
  "colors.primary.outline.fg": {
    "value": "var(--colors-primary-outline-fg)",
    "variable": "var(--colors-primary-outline-fg)"
  },
  "colors.primary.plain.bg.hover": {
    "value": "var(--colors-primary-plain-bg-hover)",
    "variable": "var(--colors-primary-plain-bg-hover)"
  },
  "colors.primary.plain.bg.active": {
    "value": "var(--colors-primary-plain-bg-active)",
    "variable": "var(--colors-primary-plain-bg-active)"
  },
  "colors.primary.plain.fg": {
    "value": "var(--colors-primary-plain-fg)",
    "variable": "var(--colors-primary-plain-fg)"
  },
  "colors.primary.a1": {
    "value": "var(--colors-primary-a1)",
    "variable": "var(--colors-primary-a1)"
  },
  "colors.primary.a2": {
    "value": "var(--colors-primary-a2)",
    "variable": "var(--colors-primary-a2)"
  },
  "colors.primary.a3": {
    "value": "var(--colors-primary-a3)",
    "variable": "var(--colors-primary-a3)"
  },
  "colors.primary.a4": {
    "value": "var(--colors-primary-a4)",
    "variable": "var(--colors-primary-a4)"
  },
  "colors.primary.a5": {
    "value": "var(--colors-primary-a5)",
    "variable": "var(--colors-primary-a5)"
  },
  "colors.primary.a6": {
    "value": "var(--colors-primary-a6)",
    "variable": "var(--colors-primary-a6)"
  },
  "colors.primary.a7": {
    "value": "var(--colors-primary-a7)",
    "variable": "var(--colors-primary-a7)"
  },
  "colors.primary.a8": {
    "value": "var(--colors-primary-a8)",
    "variable": "var(--colors-primary-a8)"
  },
  "colors.primary.a9": {
    "value": "var(--colors-primary-a9)",
    "variable": "var(--colors-primary-a9)"
  },
  "colors.primary.a10": {
    "value": "var(--colors-primary-a10)",
    "variable": "var(--colors-primary-a10)"
  },
  "colors.primary.a11": {
    "value": "var(--colors-primary-a11)",
    "variable": "var(--colors-primary-a11)"
  },
  "colors.primary.a12": {
    "value": "var(--colors-primary-a12)",
    "variable": "var(--colors-primary-a12)"
  },
  "colors.secondary.1": {
    "value": "var(--colors-secondary-1)",
    "variable": "var(--colors-secondary-1)"
  },
  "colors.secondary.2": {
    "value": "var(--colors-secondary-2)",
    "variable": "var(--colors-secondary-2)"
  },
  "colors.secondary.3": {
    "value": "var(--colors-secondary-3)",
    "variable": "var(--colors-secondary-3)"
  },
  "colors.secondary.4": {
    "value": "var(--colors-secondary-4)",
    "variable": "var(--colors-secondary-4)"
  },
  "colors.secondary.5": {
    "value": "var(--colors-secondary-5)",
    "variable": "var(--colors-secondary-5)"
  },
  "colors.secondary.6": {
    "value": "var(--colors-secondary-6)",
    "variable": "var(--colors-secondary-6)"
  },
  "colors.secondary.7": {
    "value": "var(--colors-secondary-7)",
    "variable": "var(--colors-secondary-7)"
  },
  "colors.secondary.8": {
    "value": "var(--colors-secondary-8)",
    "variable": "var(--colors-secondary-8)"
  },
  "colors.secondary.9": {
    "value": "var(--colors-secondary-9)",
    "variable": "var(--colors-secondary-9)"
  },
  "colors.secondary.10": {
    "value": "var(--colors-secondary-10)",
    "variable": "var(--colors-secondary-10)"
  },
  "colors.secondary.11": {
    "value": "var(--colors-secondary-11)",
    "variable": "var(--colors-secondary-11)"
  },
  "colors.secondary.12": {
    "value": "var(--colors-secondary-12)",
    "variable": "var(--colors-secondary-12)"
  },
  "colors.secondary.solid.bg": {
    "value": "var(--colors-secondary-solid-bg)",
    "variable": "var(--colors-secondary-solid-bg)"
  },
  "colors.secondary.solid.bg.hover": {
    "value": "var(--colors-secondary-solid-bg-hover)",
    "variable": "var(--colors-secondary-solid-bg-hover)"
  },
  "colors.secondary.subtle.bg": {
    "value": "var(--colors-secondary-subtle-bg)",
    "variable": "var(--colors-secondary-subtle-bg)"
  },
  "colors.secondary.subtle.bg.hover": {
    "value": "var(--colors-secondary-subtle-bg-hover)",
    "variable": "var(--colors-secondary-subtle-bg-hover)"
  },
  "colors.secondary.subtle.bg.active": {
    "value": "var(--colors-secondary-subtle-bg-active)",
    "variable": "var(--colors-secondary-subtle-bg-active)"
  },
  "colors.secondary.subtle.fg": {
    "value": "var(--colors-secondary-subtle-fg)",
    "variable": "var(--colors-secondary-subtle-fg)"
  },
  "colors.secondary.surface.bg": {
    "value": "var(--colors-secondary-surface-bg)",
    "variable": "var(--colors-secondary-surface-bg)"
  },
  "colors.secondary.surface.bg.active": {
    "value": "var(--colors-secondary-surface-bg-active)",
    "variable": "var(--colors-secondary-surface-bg-active)"
  },
  "colors.secondary.surface.border": {
    "value": "var(--colors-secondary-surface-border)",
    "variable": "var(--colors-secondary-surface-border)"
  },
  "colors.secondary.surface.border.hover": {
    "value": "var(--colors-secondary-surface-border-hover)",
    "variable": "var(--colors-secondary-surface-border-hover)"
  },
  "colors.secondary.surface.fg": {
    "value": "var(--colors-secondary-surface-fg)",
    "variable": "var(--colors-secondary-surface-fg)"
  },
  "colors.secondary.outline.bg.hover": {
    "value": "var(--colors-secondary-outline-bg-hover)",
    "variable": "var(--colors-secondary-outline-bg-hover)"
  },
  "colors.secondary.outline.bg.active": {
    "value": "var(--colors-secondary-outline-bg-active)",
    "variable": "var(--colors-secondary-outline-bg-active)"
  },
  "colors.secondary.outline.border": {
    "value": "var(--colors-secondary-outline-border)",
    "variable": "var(--colors-secondary-outline-border)"
  },
  "colors.secondary.outline.fg": {
    "value": "var(--colors-secondary-outline-fg)",
    "variable": "var(--colors-secondary-outline-fg)"
  },
  "colors.secondary.plain.bg.hover": {
    "value": "var(--colors-secondary-plain-bg-hover)",
    "variable": "var(--colors-secondary-plain-bg-hover)"
  },
  "colors.secondary.plain.bg.active": {
    "value": "var(--colors-secondary-plain-bg-active)",
    "variable": "var(--colors-secondary-plain-bg-active)"
  },
  "colors.secondary.plain.fg": {
    "value": "var(--colors-secondary-plain-fg)",
    "variable": "var(--colors-secondary-plain-fg)"
  },
  "colors.secondary.a1": {
    "value": "var(--colors-secondary-a1)",
    "variable": "var(--colors-secondary-a1)"
  },
  "colors.secondary.a2": {
    "value": "var(--colors-secondary-a2)",
    "variable": "var(--colors-secondary-a2)"
  },
  "colors.secondary.a3": {
    "value": "var(--colors-secondary-a3)",
    "variable": "var(--colors-secondary-a3)"
  },
  "colors.secondary.a4": {
    "value": "var(--colors-secondary-a4)",
    "variable": "var(--colors-secondary-a4)"
  },
  "colors.secondary.a5": {
    "value": "var(--colors-secondary-a5)",
    "variable": "var(--colors-secondary-a5)"
  },
  "colors.secondary.a6": {
    "value": "var(--colors-secondary-a6)",
    "variable": "var(--colors-secondary-a6)"
  },
  "colors.secondary.a7": {
    "value": "var(--colors-secondary-a7)",
    "variable": "var(--colors-secondary-a7)"
  },
  "colors.secondary.a8": {
    "value": "var(--colors-secondary-a8)",
    "variable": "var(--colors-secondary-a8)"
  },
  "colors.secondary.a9": {
    "value": "var(--colors-secondary-a9)",
    "variable": "var(--colors-secondary-a9)"
  },
  "colors.secondary.a10": {
    "value": "var(--colors-secondary-a10)",
    "variable": "var(--colors-secondary-a10)"
  },
  "colors.secondary.a11": {
    "value": "var(--colors-secondary-a11)",
    "variable": "var(--colors-secondary-a11)"
  },
  "colors.secondary.a12": {
    "value": "var(--colors-secondary-a12)",
    "variable": "var(--colors-secondary-a12)"
  },
  "colors.gray.1": {
    "value": "var(--colors-gray-1)",
    "variable": "var(--colors-gray-1)"
  },
  "colors.gray.2": {
    "value": "var(--colors-gray-2)",
    "variable": "var(--colors-gray-2)"
  },
  "colors.gray.3": {
    "value": "var(--colors-gray-3)",
    "variable": "var(--colors-gray-3)"
  },
  "colors.gray.4": {
    "value": "var(--colors-gray-4)",
    "variable": "var(--colors-gray-4)"
  },
  "colors.gray.5": {
    "value": "var(--colors-gray-5)",
    "variable": "var(--colors-gray-5)"
  },
  "colors.gray.6": {
    "value": "var(--colors-gray-6)",
    "variable": "var(--colors-gray-6)"
  },
  "colors.gray.7": {
    "value": "var(--colors-gray-7)",
    "variable": "var(--colors-gray-7)"
  },
  "colors.gray.8": {
    "value": "var(--colors-gray-8)",
    "variable": "var(--colors-gray-8)"
  },
  "colors.gray.9": {
    "value": "var(--colors-gray-9)",
    "variable": "var(--colors-gray-9)"
  },
  "colors.gray.10": {
    "value": "var(--colors-gray-10)",
    "variable": "var(--colors-gray-10)"
  },
  "colors.gray.11": {
    "value": "var(--colors-gray-11)",
    "variable": "var(--colors-gray-11)"
  },
  "colors.gray.12": {
    "value": "var(--colors-gray-12)",
    "variable": "var(--colors-gray-12)"
  },
  "colors.gray.a1": {
    "value": "var(--colors-gray-a1)",
    "variable": "var(--colors-gray-a1)"
  },
  "colors.gray.a2": {
    "value": "var(--colors-gray-a2)",
    "variable": "var(--colors-gray-a2)"
  },
  "colors.gray.a3": {
    "value": "var(--colors-gray-a3)",
    "variable": "var(--colors-gray-a3)"
  },
  "colors.gray.a4": {
    "value": "var(--colors-gray-a4)",
    "variable": "var(--colors-gray-a4)"
  },
  "colors.gray.a5": {
    "value": "var(--colors-gray-a5)",
    "variable": "var(--colors-gray-a5)"
  },
  "colors.gray.a6": {
    "value": "var(--colors-gray-a6)",
    "variable": "var(--colors-gray-a6)"
  },
  "colors.gray.a7": {
    "value": "var(--colors-gray-a7)",
    "variable": "var(--colors-gray-a7)"
  },
  "colors.gray.a8": {
    "value": "var(--colors-gray-a8)",
    "variable": "var(--colors-gray-a8)"
  },
  "colors.gray.a9": {
    "value": "var(--colors-gray-a9)",
    "variable": "var(--colors-gray-a9)"
  },
  "colors.gray.a10": {
    "value": "var(--colors-gray-a10)",
    "variable": "var(--colors-gray-a10)"
  },
  "colors.gray.a11": {
    "value": "var(--colors-gray-a11)",
    "variable": "var(--colors-gray-a11)"
  },
  "colors.gray.a12": {
    "value": "var(--colors-gray-a12)",
    "variable": "var(--colors-gray-a12)"
  },
  "colors.gray.solid.bg": {
    "value": "var(--colors-gray-solid-bg)",
    "variable": "var(--colors-gray-solid-bg)"
  },
  "colors.gray.solid.bg.hover": {
    "value": "var(--colors-gray-solid-bg-hover)",
    "variable": "var(--colors-gray-solid-bg-hover)"
  },
  "colors.gray.solid.fg": {
    "value": "var(--colors-gray-solid-fg)",
    "variable": "var(--colors-gray-solid-fg)"
  },
  "colors.gray.subtle.bg": {
    "value": "var(--colors-gray-subtle-bg)",
    "variable": "var(--colors-gray-subtle-bg)"
  },
  "colors.gray.subtle.bg.hover": {
    "value": "var(--colors-gray-subtle-bg-hover)",
    "variable": "var(--colors-gray-subtle-bg-hover)"
  },
  "colors.gray.subtle.bg.active": {
    "value": "var(--colors-gray-subtle-bg-active)",
    "variable": "var(--colors-gray-subtle-bg-active)"
  },
  "colors.gray.subtle.fg": {
    "value": "var(--colors-gray-subtle-fg)",
    "variable": "var(--colors-gray-subtle-fg)"
  },
  "colors.gray.surface.bg": {
    "value": "var(--colors-gray-surface-bg)",
    "variable": "var(--colors-gray-surface-bg)"
  },
  "colors.gray.surface.bg.hover": {
    "value": "var(--colors-gray-surface-bg-hover)",
    "variable": "var(--colors-gray-surface-bg-hover)"
  },
  "colors.gray.surface.bg.active": {
    "value": "var(--colors-gray-surface-bg-active)",
    "variable": "var(--colors-gray-surface-bg-active)"
  },
  "colors.gray.surface.border": {
    "value": "var(--colors-gray-surface-border)",
    "variable": "var(--colors-gray-surface-border)"
  },
  "colors.gray.surface.border.hover": {
    "value": "var(--colors-gray-surface-border-hover)",
    "variable": "var(--colors-gray-surface-border-hover)"
  },
  "colors.gray.surface.fg": {
    "value": "var(--colors-gray-surface-fg)",
    "variable": "var(--colors-gray-surface-fg)"
  },
  "colors.gray.outline.bg.hover": {
    "value": "var(--colors-gray-outline-bg-hover)",
    "variable": "var(--colors-gray-outline-bg-hover)"
  },
  "colors.gray.outline.bg.active": {
    "value": "var(--colors-gray-outline-bg-active)",
    "variable": "var(--colors-gray-outline-bg-active)"
  },
  "colors.gray.outline.border": {
    "value": "var(--colors-gray-outline-border)",
    "variable": "var(--colors-gray-outline-border)"
  },
  "colors.gray.outline.fg": {
    "value": "var(--colors-gray-outline-fg)",
    "variable": "var(--colors-gray-outline-fg)"
  },
  "colors.gray.plain.bg.hover": {
    "value": "var(--colors-gray-plain-bg-hover)",
    "variable": "var(--colors-gray-plain-bg-hover)"
  },
  "colors.gray.plain.bg.active": {
    "value": "var(--colors-gray-plain-bg-active)",
    "variable": "var(--colors-gray-plain-bg-active)"
  },
  "colors.gray.plain.fg": {
    "value": "var(--colors-gray-plain-fg)",
    "variable": "var(--colors-gray-plain-fg)"
  },
  "colors.colorPalette.green": {
    "value": "var(--colors-color-palette-green)",
    "variable": "var(--colors-color-palette-green)"
  },
  "colors.colorPalette.darkBlue": {
    "value": "var(--colors-color-palette-dark-blue)",
    "variable": "var(--colors-color-palette-dark-blue)"
  },
  "colors.colorPalette.natural": {
    "value": "var(--colors-color-palette-natural)",
    "variable": "var(--colors-color-palette-natural)"
  },
  "colors.colorPalette.stone": {
    "value": "var(--colors-color-palette-stone)",
    "variable": "var(--colors-color-palette-stone)"
  },
  "colors.colorPalette.white": {
    "value": "var(--colors-color-palette-white)",
    "variable": "var(--colors-color-palette-white)"
  },
  "colors.colorPalette.lightGray": {
    "value": "var(--colors-color-palette-light-gray)",
    "variable": "var(--colors-color-palette-light-gray)"
  },
  "colors.colorPalette.darkGray": {
    "value": "var(--colors-color-palette-dark-gray)",
    "variable": "var(--colors-color-palette-dark-gray)"
  },
  "colors.colorPalette.black": {
    "value": "var(--colors-color-palette-black)",
    "variable": "var(--colors-color-palette-black)"
  },
  "colors.colorPalette.sea": {
    "value": "var(--colors-color-palette-sea)",
    "variable": "var(--colors-color-palette-sea)"
  },
  "colors.colorPalette.gold": {
    "value": "var(--colors-color-palette-gold)",
    "variable": "var(--colors-color-palette-gold)"
  },
  "colors.colorPalette.sand": {
    "value": "var(--colors-color-palette-sand)",
    "variable": "var(--colors-color-palette-sand)"
  },
  "colors.colorPalette.forest": {
    "value": "var(--colors-color-palette-forest)",
    "variable": "var(--colors-color-palette-forest)"
  },
  "colors.colorPalette.terracotta": {
    "value": "var(--colors-color-palette-terracotta)",
    "variable": "var(--colors-color-palette-terracotta)"
  },
  "colors.colorPalette.granite": {
    "value": "var(--colors-color-palette-granite)",
    "variable": "var(--colors-color-palette-granite)"
  },
  "colors.colorPalette.burnt": {
    "value": "var(--colors-color-palette-burnt)",
    "variable": "var(--colors-color-palette-burnt)"
  },
  "colors.colorPalette.sun": {
    "value": "var(--colors-color-palette-sun)",
    "variable": "var(--colors-color-palette-sun)"
  },
  "colors.colorPalette.desert": {
    "value": "var(--colors-color-palette-desert)",
    "variable": "var(--colors-color-palette-desert)"
  },
  "colors.colorPalette.shadow": {
    "value": "var(--colors-color-palette-shadow)",
    "variable": "var(--colors-color-palette-shadow)"
  },
  "colors.colorPalette.dusk": {
    "value": "var(--colors-color-palette-dusk)",
    "variable": "var(--colors-color-palette-dusk)"
  },
  "colors.colorPalette.dawn": {
    "value": "var(--colors-color-palette-dawn)",
    "variable": "var(--colors-color-palette-dawn)"
  },
  "colors.colorPalette.depth": {
    "value": "var(--colors-color-palette-depth)",
    "variable": "var(--colors-color-palette-depth)"
  },
  "colors.colorPalette.coral": {
    "value": "var(--colors-color-palette-coral)",
    "variable": "var(--colors-color-palette-coral)"
  },
  "colors.colorPalette.peach": {
    "value": "var(--colors-color-palette-peach)",
    "variable": "var(--colors-color-palette-peach)"
  },
  "colors.colorPalette": {
    "value": "var(--colors-color-palette)",
    "variable": "var(--colors-color-palette)"
  },
  "colors.colorPalette.a1": {
    "value": "var(--colors-color-palette-a1)",
    "variable": "var(--colors-color-palette-a1)"
  },
  "colors.colorPalette.a2": {
    "value": "var(--colors-color-palette-a2)",
    "variable": "var(--colors-color-palette-a2)"
  },
  "colors.colorPalette.a3": {
    "value": "var(--colors-color-palette-a3)",
    "variable": "var(--colors-color-palette-a3)"
  },
  "colors.colorPalette.a4": {
    "value": "var(--colors-color-palette-a4)",
    "variable": "var(--colors-color-palette-a4)"
  },
  "colors.colorPalette.a5": {
    "value": "var(--colors-color-palette-a5)",
    "variable": "var(--colors-color-palette-a5)"
  },
  "colors.colorPalette.a6": {
    "value": "var(--colors-color-palette-a6)",
    "variable": "var(--colors-color-palette-a6)"
  },
  "colors.colorPalette.a7": {
    "value": "var(--colors-color-palette-a7)",
    "variable": "var(--colors-color-palette-a7)"
  },
  "colors.colorPalette.a8": {
    "value": "var(--colors-color-palette-a8)",
    "variable": "var(--colors-color-palette-a8)"
  },
  "colors.colorPalette.a9": {
    "value": "var(--colors-color-palette-a9)",
    "variable": "var(--colors-color-palette-a9)"
  },
  "colors.colorPalette.a10": {
    "value": "var(--colors-color-palette-a10)",
    "variable": "var(--colors-color-palette-a10)"
  },
  "colors.colorPalette.a11": {
    "value": "var(--colors-color-palette-a11)",
    "variable": "var(--colors-color-palette-a11)"
  },
  "colors.colorPalette.a12": {
    "value": "var(--colors-color-palette-a12)",
    "variable": "var(--colors-color-palette-a12)"
  },
  "colors.colorPalette.default": {
    "value": "var(--colors-color-palette-default)",
    "variable": "var(--colors-color-palette-default)"
  },
  "colors.colorPalette.muted": {
    "value": "var(--colors-color-palette-muted)",
    "variable": "var(--colors-color-palette-muted)"
  },
  "colors.colorPalette.subtle": {
    "value": "var(--colors-color-palette-subtle)",
    "variable": "var(--colors-color-palette-subtle)"
  },
  "colors.colorPalette.1": {
    "value": "var(--colors-color-palette-1)",
    "variable": "var(--colors-color-palette-1)"
  },
  "colors.colorPalette.2": {
    "value": "var(--colors-color-palette-2)",
    "variable": "var(--colors-color-palette-2)"
  },
  "colors.colorPalette.3": {
    "value": "var(--colors-color-palette-3)",
    "variable": "var(--colors-color-palette-3)"
  },
  "colors.colorPalette.4": {
    "value": "var(--colors-color-palette-4)",
    "variable": "var(--colors-color-palette-4)"
  },
  "colors.colorPalette.5": {
    "value": "var(--colors-color-palette-5)",
    "variable": "var(--colors-color-palette-5)"
  },
  "colors.colorPalette.6": {
    "value": "var(--colors-color-palette-6)",
    "variable": "var(--colors-color-palette-6)"
  },
  "colors.colorPalette.7": {
    "value": "var(--colors-color-palette-7)",
    "variable": "var(--colors-color-palette-7)"
  },
  "colors.colorPalette.8": {
    "value": "var(--colors-color-palette-8)",
    "variable": "var(--colors-color-palette-8)"
  },
  "colors.colorPalette.9": {
    "value": "var(--colors-color-palette-9)",
    "variable": "var(--colors-color-palette-9)"
  },
  "colors.colorPalette.10": {
    "value": "var(--colors-color-palette-10)",
    "variable": "var(--colors-color-palette-10)"
  },
  "colors.colorPalette.11": {
    "value": "var(--colors-color-palette-11)",
    "variable": "var(--colors-color-palette-11)"
  },
  "colors.colorPalette.12": {
    "value": "var(--colors-color-palette-12)",
    "variable": "var(--colors-color-palette-12)"
  },
  "colors.colorPalette.solid.bg": {
    "value": "var(--colors-color-palette-solid-bg)",
    "variable": "var(--colors-color-palette-solid-bg)"
  },
  "colors.colorPalette.bg": {
    "value": "var(--colors-color-palette-bg)",
    "variable": "var(--colors-color-palette-bg)"
  },
  "colors.colorPalette.solid.bg.hover": {
    "value": "var(--colors-color-palette-solid-bg-hover)",
    "variable": "var(--colors-color-palette-solid-bg-hover)"
  },
  "colors.colorPalette.bg.hover": {
    "value": "var(--colors-color-palette-bg-hover)",
    "variable": "var(--colors-color-palette-bg-hover)"
  },
  "colors.colorPalette.hover": {
    "value": "var(--colors-color-palette-hover)",
    "variable": "var(--colors-color-palette-hover)"
  },
  "colors.colorPalette.solid.fg": {
    "value": "var(--colors-color-palette-solid-fg)",
    "variable": "var(--colors-color-palette-solid-fg)"
  },
  "colors.colorPalette.fg": {
    "value": "var(--colors-color-palette-fg)",
    "variable": "var(--colors-color-palette-fg)"
  },
  "colors.colorPalette.subtle.bg": {
    "value": "var(--colors-color-palette-subtle-bg)",
    "variable": "var(--colors-color-palette-subtle-bg)"
  },
  "colors.colorPalette.subtle.bg.hover": {
    "value": "var(--colors-color-palette-subtle-bg-hover)",
    "variable": "var(--colors-color-palette-subtle-bg-hover)"
  },
  "colors.colorPalette.subtle.bg.active": {
    "value": "var(--colors-color-palette-subtle-bg-active)",
    "variable": "var(--colors-color-palette-subtle-bg-active)"
  },
  "colors.colorPalette.bg.active": {
    "value": "var(--colors-color-palette-bg-active)",
    "variable": "var(--colors-color-palette-bg-active)"
  },
  "colors.colorPalette.active": {
    "value": "var(--colors-color-palette-active)",
    "variable": "var(--colors-color-palette-active)"
  },
  "colors.colorPalette.subtle.fg": {
    "value": "var(--colors-color-palette-subtle-fg)",
    "variable": "var(--colors-color-palette-subtle-fg)"
  },
  "colors.colorPalette.surface.bg": {
    "value": "var(--colors-color-palette-surface-bg)",
    "variable": "var(--colors-color-palette-surface-bg)"
  },
  "colors.colorPalette.surface.bg.active": {
    "value": "var(--colors-color-palette-surface-bg-active)",
    "variable": "var(--colors-color-palette-surface-bg-active)"
  },
  "colors.colorPalette.surface.border": {
    "value": "var(--colors-color-palette-surface-border)",
    "variable": "var(--colors-color-palette-surface-border)"
  },
  "colors.colorPalette.border": {
    "value": "var(--colors-color-palette-border)",
    "variable": "var(--colors-color-palette-border)"
  },
  "colors.colorPalette.surface.border.hover": {
    "value": "var(--colors-color-palette-surface-border-hover)",
    "variable": "var(--colors-color-palette-surface-border-hover)"
  },
  "colors.colorPalette.border.hover": {
    "value": "var(--colors-color-palette-border-hover)",
    "variable": "var(--colors-color-palette-border-hover)"
  },
  "colors.colorPalette.surface.fg": {
    "value": "var(--colors-color-palette-surface-fg)",
    "variable": "var(--colors-color-palette-surface-fg)"
  },
  "colors.colorPalette.outline.bg.hover": {
    "value": "var(--colors-color-palette-outline-bg-hover)",
    "variable": "var(--colors-color-palette-outline-bg-hover)"
  },
  "colors.colorPalette.outline.bg.active": {
    "value": "var(--colors-color-palette-outline-bg-active)",
    "variable": "var(--colors-color-palette-outline-bg-active)"
  },
  "colors.colorPalette.outline.border": {
    "value": "var(--colors-color-palette-outline-border)",
    "variable": "var(--colors-color-palette-outline-border)"
  },
  "colors.colorPalette.outline.fg": {
    "value": "var(--colors-color-palette-outline-fg)",
    "variable": "var(--colors-color-palette-outline-fg)"
  },
  "colors.colorPalette.plain.bg.hover": {
    "value": "var(--colors-color-palette-plain-bg-hover)",
    "variable": "var(--colors-color-palette-plain-bg-hover)"
  },
  "colors.colorPalette.plain.bg.active": {
    "value": "var(--colors-color-palette-plain-bg-active)",
    "variable": "var(--colors-color-palette-plain-bg-active)"
  },
  "colors.colorPalette.plain.fg": {
    "value": "var(--colors-color-palette-plain-fg)",
    "variable": "var(--colors-color-palette-plain-fg)"
  },
  "colors.colorPalette.surface.bg.hover": {
    "value": "var(--colors-color-palette-surface-bg-hover)",
    "variable": "var(--colors-color-palette-surface-bg-hover)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar