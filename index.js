/** Host half of the bundle: declares the settings schema and disables the
 * auto-generated settings page (the Client module registers a custom one). */
import z from '@deepseek-ai/schemastery'

export const Config = z.object({
  /** 'session' = bind a card to each session; 'fixed' = always show `fixedImage`. */
  mode: z.union(['session', 'fixed']).default('session').volatile(),
  /** Asset file shown when `mode` is 'fixed'. */
  fixedImage: z.string().default('module_pre001.webp').volatile(),
  /** Background strength 0–1 (0 = invisible, 1 = fully opaque). */
  opacity: z.number().default(0.35).volatile(),
})

export function apply(ctx) {
  // The client registers a custom settings page; suppress the schema-generated one.
  ctx.inject(['settings'], (child) => {
    child.effect(() => child.settings.configure({ auto: false }, ctx.fiber))
  })
}
