/* eslint-disable */
export type Token = `aspectRatios.${AspectRatioToken}` | `borders.${BorderToken}` | `easings.${EasingToken}` | `radii.${RadiusToken}` | `fontWeights.${FontWeightToken}` | `lineHeights.${LineHeightToken}` | `letterSpacings.${LetterSpacingToken}` | `fontSizes.${FontSizeToken}` | `shadows.${ShadowToken}` | `blurs.${BlurToken}` | `spacing.${SpacingToken}` | `sizes.${SizeToken}` | `animations.${AnimationToken}` | `fonts.${FontToken}` | `colors.${ColorToken}` | `durations.${DurationToken}` | `zIndex.${ZIndexToken}` | `breakpoints.${BreakpointToken}`

export type ColorPalette = "sc" | "black" | "white" | "inherit" | "current" | "transparent" | "fg" | "border" | "primary" | "primary.solid" | "secondary" | "secondary.solid" | "error" | "primary.solid.bg" | "primary.subtle.bg" | "primary.subtle" | "primary.surface.bg" | "primary.surface" | "primary.surface.border" | "primary.outline" | "primary.outline.bg" | "primary.plain" | "primary.plain.bg" | "secondary.solid.bg" | "secondary.subtle.bg" | "secondary.subtle" | "secondary.surface.bg" | "secondary.surface" | "secondary.surface.border" | "secondary.outline" | "secondary.outline.bg" | "secondary.plain" | "secondary.plain.bg" | "gray" | "gray.solid.bg" | "gray.solid" | "gray.solid.fg" | "gray.subtle.bg" | "gray.subtle" | "gray.subtle.fg" | "gray.surface.bg" | "gray.surface" | "gray.surface.border" | "gray.surface.fg" | "gray.outline" | "gray.outline.bg" | "gray.outline.border" | "gray.outline.fg" | "gray.plain" | "gray.plain.bg" | "gray.plain.fg"

export type AspectRatioToken = "square" | "landscape" | "portrait" | "wide" | "ultrawide" | "golden"

export type BorderToken = "none"

export type EasingToken = "default" | "linear" | "in" | "out" | "in-out"

export type RadiusToken = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full" | "l1" | "l2" | "l3" | "l4"

export type FontWeightToken = "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"

export type LineHeightToken = "none" | "tight" | "snug" | "normal" | "relaxed" | "loose"

export type LetterSpacingToken = "tighter" | "tight" | "normal" | "wide" | "wider" | "widest"

export type FontSizeToken = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl"

export type ShadowToken = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inset-2xs" | "inset-xs" | "inset-sm"

export type BlurToken = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"

export type SpacingToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | "0.5" | "1.5" | "2.5" | "3.5" | "4.5" | "5.5" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-20" | "-24" | "-28" | "-32" | "-36" | "-40" | "-44" | "-48" | "-52" | "-56" | "-60" | "-64" | "-72" | "-80" | "-96" | "-0.5" | "-1.5" | "-2.5" | "-3.5" | "-4.5" | "-5.5"

export type SizeToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | "0.5" | "1.5" | "2.5" | "3.5" | "4.5" | "5.5" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "prose" | "full" | "min" | "max" | "fit" | "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl" | "breakpoint-2xl"

export type AnimationToken = "spin" | "ping" | "pulse" | "bounce"

export type FontToken = "rader" | "sentinel" | "gotham" | "mono" | "sans" | "serif"

export type ColorToken = "sc.green" | "sc.darkBlue" | "sc.natural" | "sc.stone" | "sc.white" | "sc.lightGray" | "sc.darkGray" | "sc.black" | "sc.sea" | "sc.gold" | "sc.sand" | "sc.forest" | "sc.terracotta" | "sc.granite" | "sc.burnt" | "sc.sun" | "sc.desert" | "sc.shadow" | "sc.dusk" | "sc.dawn" | "sc.depth" | "sc.coral" | "sc.peach" | "black" | "black.a1" | "black.a2" | "black.a3" | "black.a4" | "black.a5" | "black.a6" | "black.a7" | "black.a8" | "black.a9" | "black.a10" | "black.a11" | "black.a12" | "white" | "white.a1" | "white.a2" | "white.a3" | "white.a4" | "white.a5" | "white.a6" | "white.a7" | "white.a8" | "white.a9" | "white.a10" | "white.a11" | "white.a12" | "inherit" | "current" | "transparent" | "fg.default" | "fg.muted" | "fg.subtle" | "border" | "primary.solid.fg" | "secondary.solid.fg" | "error" | "primary.1" | "primary.2" | "primary.3" | "primary.4" | "primary.5" | "primary.6" | "primary.7" | "primary.8" | "primary.9" | "primary.10" | "primary.11" | "primary.12" | "primary.solid.bg" | "primary.solid.bg.hover" | "primary.subtle.bg" | "primary.subtle.bg.hover" | "primary.subtle.bg.active" | "primary.subtle.fg" | "primary.surface.bg" | "primary.surface.bg.active" | "primary.surface.border" | "primary.surface.border.hover" | "primary.surface.fg" | "primary.outline.bg.hover" | "primary.outline.bg.active" | "primary.outline.border" | "primary.outline.fg" | "primary.plain.bg.hover" | "primary.plain.bg.active" | "primary.plain.fg" | "primary.a1" | "primary.a2" | "primary.a3" | "primary.a4" | "primary.a5" | "primary.a6" | "primary.a7" | "primary.a8" | "primary.a9" | "primary.a10" | "primary.a11" | "primary.a12" | "secondary.1" | "secondary.2" | "secondary.3" | "secondary.4" | "secondary.5" | "secondary.6" | "secondary.7" | "secondary.8" | "secondary.9" | "secondary.10" | "secondary.11" | "secondary.12" | "secondary.solid.bg" | "secondary.solid.bg.hover" | "secondary.subtle.bg" | "secondary.subtle.bg.hover" | "secondary.subtle.bg.active" | "secondary.subtle.fg" | "secondary.surface.bg" | "secondary.surface.bg.active" | "secondary.surface.border" | "secondary.surface.border.hover" | "secondary.surface.fg" | "secondary.outline.bg.hover" | "secondary.outline.bg.active" | "secondary.outline.border" | "secondary.outline.fg" | "secondary.plain.bg.hover" | "secondary.plain.bg.active" | "secondary.plain.fg" | "secondary.a1" | "secondary.a2" | "secondary.a3" | "secondary.a4" | "secondary.a5" | "secondary.a6" | "secondary.a7" | "secondary.a8" | "secondary.a9" | "secondary.a10" | "secondary.a11" | "secondary.a12" | "gray.1" | "gray.2" | "gray.3" | "gray.4" | "gray.5" | "gray.6" | "gray.7" | "gray.8" | "gray.9" | "gray.10" | "gray.11" | "gray.12" | "gray.a1" | "gray.a2" | "gray.a3" | "gray.a4" | "gray.a5" | "gray.a6" | "gray.a7" | "gray.a8" | "gray.a9" | "gray.a10" | "gray.a11" | "gray.a12" | "gray.solid.bg" | "gray.solid.bg.hover" | "gray.solid.fg" | "gray.subtle.bg" | "gray.subtle.bg.hover" | "gray.subtle.bg.active" | "gray.subtle.fg" | "gray.surface.bg" | "gray.surface.bg.hover" | "gray.surface.bg.active" | "gray.surface.border" | "gray.surface.border.hover" | "gray.surface.fg" | "gray.outline.bg.hover" | "gray.outline.bg.active" | "gray.outline.border" | "gray.outline.fg" | "gray.plain.bg.hover" | "gray.plain.bg.active" | "gray.plain.fg" | "colorPalette.green" | "colorPalette.darkBlue" | "colorPalette.natural" | "colorPalette.stone" | "colorPalette.white" | "colorPalette.lightGray" | "colorPalette.darkGray" | "colorPalette.black" | "colorPalette.sea" | "colorPalette.gold" | "colorPalette.sand" | "colorPalette.forest" | "colorPalette.terracotta" | "colorPalette.granite" | "colorPalette.burnt" | "colorPalette.sun" | "colorPalette.desert" | "colorPalette.shadow" | "colorPalette.dusk" | "colorPalette.dawn" | "colorPalette.depth" | "colorPalette.coral" | "colorPalette.peach" | "colorPalette" | "colorPalette.a1" | "colorPalette.a2" | "colorPalette.a3" | "colorPalette.a4" | "colorPalette.a5" | "colorPalette.a6" | "colorPalette.a7" | "colorPalette.a8" | "colorPalette.a9" | "colorPalette.a10" | "colorPalette.a11" | "colorPalette.a12" | "colorPalette.default" | "colorPalette.muted" | "colorPalette.subtle" | "colorPalette.1" | "colorPalette.2" | "colorPalette.3" | "colorPalette.4" | "colorPalette.5" | "colorPalette.6" | "colorPalette.7" | "colorPalette.8" | "colorPalette.9" | "colorPalette.10" | "colorPalette.11" | "colorPalette.12" | "colorPalette.solid.bg" | "colorPalette.bg" | "colorPalette.solid.bg.hover" | "colorPalette.bg.hover" | "colorPalette.hover" | "colorPalette.solid.fg" | "colorPalette.fg" | "colorPalette.subtle.bg" | "colorPalette.subtle.bg.hover" | "colorPalette.subtle.bg.active" | "colorPalette.bg.active" | "colorPalette.active" | "colorPalette.subtle.fg" | "colorPalette.surface.bg" | "colorPalette.surface.bg.active" | "colorPalette.surface.border" | "colorPalette.border" | "colorPalette.surface.border.hover" | "colorPalette.border.hover" | "colorPalette.surface.fg" | "colorPalette.outline.bg.hover" | "colorPalette.outline.bg.active" | "colorPalette.outline.border" | "colorPalette.outline.fg" | "colorPalette.plain.bg.hover" | "colorPalette.plain.bg.active" | "colorPalette.plain.fg" | "colorPalette.surface.bg.hover"

export type DurationToken = "fastest" | "faster" | "fast" | "normal" | "slow" | "slower" | "slowest"

export type ZIndexToken = "hide" | "base" | "docked" | "dropdown" | "sticky" | "banner" | "overlay" | "modal" | "popover" | "skipLink" | "toast" | "tooltip"

export type BreakpointToken = "sm" | "md" | "lg" | "xl" | "2xl"

export type Tokens = {
		aspectRatios: AspectRatioToken
		borders: BorderToken
		easings: EasingToken
		radii: RadiusToken
		fontWeights: FontWeightToken
		lineHeights: LineHeightToken
		letterSpacings: LetterSpacingToken
		fontSizes: FontSizeToken
		shadows: ShadowToken
		blurs: BlurToken
		spacing: SpacingToken
		sizes: SizeToken
		animations: AnimationToken
		fonts: FontToken
		colors: ColorToken
		durations: DurationToken
		zIndex: ZIndexToken
		breakpoints: BreakpointToken
} & { [token: string]: never }

export type TokenCategory = "aspectRatios" | "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "cursor" | "shadows" | "spacing" | "radii" | "borders" | "borderWidths" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"