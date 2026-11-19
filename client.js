/**
 * Client half of the bundle: draws the official Hatsune Miku module artwork
 * (Project DIVA Future Tone) behind the left sidebar, and adds a Settings page
 * (Settings → Plugins) to choose between a fixed image or per-session binding.
 *
 * The image is painted on a `::before` pseudo-element at a configurable
 * `opacity` (set it lower in Settings when the menu text needs more contrast),
 * with the original artwork shown as-is (no blur, no scrim).
 *
 * Only the `window.__ModuleLoader__.load(...)` registration runs at script load
 * time; everything else lives inside the factory (see combo-script note).
 */
window.__ModuleLoader__.load({
  id: 'dsh-miku',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState } = React

    const ENTRY_ID = 'miku-sidebar-background'
    const NS = 'miku-sidebar-background'
    const DEFAULT_OPACITY = 0.35

    /** All 168 Miku module portraits, default "初音ミク" first, then alphabetical. */
    const ASSETS = [
    'module_pre001.webp',
    'module_ct001.webp',
    'module_ct002.webp',
    'module_ct003.webp',
    'module_ct004.webp',
    'module_ct005.webp',
    'module_ct006.webp',
    'module_ct007.webp',
    'module_ct008.webp',
    'module_ct009.webp',
    'module_ct010.webp',
    'module_ct011.webp',
    'module_ct012.webp',
    'module_ct013.webp',
    'module_ct014.webp',
    'module_ct015.webp',
    'module_ct016.webp',
    'module_ct017.webp',
    'module_ct018.webp',
    'module_ct019.webp',
    'module_ct020.webp',
    'module_ct021.webp',
    'module_ct022.webp',
    'module_ct023.webp',
    'module_ct024.webp',
    'module_ct025.webp',
    'module_ct026.webp',
    'module_ct027.webp',
    'module_ct028.webp',
    'module_ct029.webp',
    'module_ct030.webp',
    'module_ct031.webp',
    'module_ct032.webp',
    'module_ct033.webp',
    'module_ct034.webp',
    'module_ct035.webp',
    'module_ct036.webp',
    'module_ct037.webp',
    'module_ct038.webp',
    'module_ct039.webp',
    'module_ct040.webp',
    'module_ct041.webp',
    'module_fc001.webp',
    'module_fc002.webp',
    'module_fc003.webp',
    'module_fc004.webp',
    'module_fc005.webp',
    'module_fc006.webp',
    'module_fc007.webp',
    'module_fc008.webp',
    'module_fc009.webp',
    'module_fc010.webp',
    'module_fc011.webp',
    'module_fc012.webp',
    'module_fc013.webp',
    'module_fc014.webp',
    'module_fs001.webp',
    'module_fs002.webp',
    'module_fs003.webp',
    'module_fs004.webp',
    'module_fs005.webp',
    'module_fs006.webp',
    'module_fs007.webp',
    'module_fs008.webp',
    'module_fs009.webp',
    'module_fs010.webp',
    'module_fs011.webp',
    'module_fs012.webp',
    'module_fs013.webp',
    'module_fs014.webp',
    'module_fs015.webp',
    'module_fs016.webp',
    'module_fs017.webp',
    'module_fs018.webp',
    'module_fs019.webp',
    'module_fs020.webp',
    'module_fs021.webp',
    'module_fs022.webp',
    'module_fs023.webp',
    'module_fs024.webp',
    'module_fs025.webp',
    'module_fs026.webp',
    'module_fs027.webp',
    'module_fs028.webp',
    'module_fs029.webp',
    'module_fs030.webp',
    'module_fs031.webp',
    'module_fs032_hd.webp',
    'module_fs033.webp',
    'module_fs034.webp',
    'module_fs035.webp',
    'module_fs036.webp',
    'module_fs037.webp',
    'module_fs038.webp',
    'module_fs039.webp',
    'module_fs040.webp',
    'module_fs041.webp',
    'module_fs042.webp',
    'module_fs043.webp',
    'module_fs044.webp',
    'module_fs045.webp',
    'module_fs046.webp',
    'module_fs047.webp',
    'module_fs048.webp',
    'module_fs049.webp',
    'module_fs050.webp',
    'module_fs051.webp',
    'module_fs052.webp',
    'module_fs053.webp',
    'module_fs054.webp',
    'module_fs055.webp',
    'module_fs056.webp',
    'module_fs057.webp',
    'module_fs058.webp',
    'module_fs059.webp',
    'module_fs060.webp',
    'module_fs061.webp',
    'module_fs062.webp',
    'module_fs063.webp',
    'module_fs064.webp',
    'module_fs065.webp',
    'module_fs066.webp',
    'module_fs067.webp',
    'module_fs068.webp',
    'module_fs069.webp',
    'module_fs070.webp',
    'module_fs071.webp',
    'module_fs072.webp',
    'module_fs073.webp',
    'module_fs074.webp',
    'module_fs075.webp',
    'module_fs076.webp',
    'module_pack1st_miku_01.webp',
    'module_pack1st_miku_02.webp',
    'module_pack1st_miku_03.webp',
    'module_pack1st_miku_04.webp',
    'module_pack1st_miku_05.webp',
    'module_pack1st_miku_06.webp',
    'module_pack2nd_miku_01.webp',
    'module_pack2nd_miku_02.webp',
    'module_pack2nd_miku_03.webp',
    'module_pack2nd_miku_04.webp',
    'module_pack2nd_miku_05.webp',
    'module_pack2nd_miku_06.webp',
    'module_pack2nd_miku_07.webp',
    'module_pack2nd_miku_08.webp',
    'module_pack3rd_miku_01.webp',
    'module_pack3rd_miku_02.webp',
    'module_pack3rd_miku_03.webp',
    'module_pack3rd_miku_04.webp',
    'module_pre007.webp',
    'module_pre008.webp',
    'module_pre009.webp',
    'module_pre010.webp',
    'module_pre011.webp',
    'module_pre012.webp',
    'module_pre013.webp',
    'module_pre014.webp',
    'module_pre015.webp',
    'module_pre016.webp',
    'module_pre017.webp',
    'module_pre018.webp',
    'module_pre019.webp',
    'module_pre020.webp',
    'module_pre021.webp',
    'module_pre022.webp',
    'module_pre023.webp',
    'module_pre024.webp',
    ]

    const ASSET_BASE = 'plugins/dsh-miku/assets/'
    const PER_PAGE = 24

    /** FNV-1a hash → stable index into ASSETS. */
    const indexFor = (id) => {
      let hash = 2166136261
      for (let i = 0; i < id.length; i++) {
        hash ^= id.charCodeAt(i)
        hash = Math.imul(hash, 16777619)
      }
      return (hash >>> 0) % ASSETS.length
    }

    const clampOpacity = (value) => {
      const n = typeof value === 'number' ? value : DEFAULT_OPACITY
      return Math.min(1, Math.max(0.05, n))
    }

    const rule = (file, opacity) => `[data-slot="sidebar"] > * {
  position: relative;
  isolation: isolate;
}
[data-slot="sidebar"] > *::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: url("${ASSET_BASE}${file}");
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
  opacity: ${opacity};
}
`

    /** Settings-page styles; theme tokens only, prefixed under `.miku-*`. */
    const UI_CSS = `
.miku-settings { display: flex; flex-direction: column; gap: 24px; }
.miku-section { display: flex; flex-direction: column; gap: 12px; }
.miku-label { font-size: 13px; font-weight: 500; color: var(--dsw-alias-label-secondary); }
.miku-modes { display: flex; gap: 8px; }
.miku-mode {
  flex: 1; padding: 9px 12px; box-sizing: border-box;
  border: 1px solid var(--dsw-alias-border-l3);
  border-radius: var(--dsw-radius-md);
  background: transparent; color: var(--dsw-alias-label-primary);
  font: inherit; font-size: 14px; line-height: 22px; text-align: center; cursor: pointer;
}
.miku-mode:hover { background: var(--dsw-alias-interactive-bg-hover); }
.miku-mode.is-active {
  border-color: var(--dsw-alias-state-business-primary);
  background: var(--dsw-alias-interactive-bg-hover);
}
.miku-mode:disabled, .miku-cell:disabled, .miku-page:disabled { opacity: 0.5; cursor: default; }
.miku-slider { width: 100%; accent-color: var(--dsw-alias-state-business-primary); }
.miku-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; }
.miku-cell {
  padding: 0; border: 2px solid transparent; border-radius: var(--dsw-radius-sm);
  background: transparent; cursor: pointer; overflow: hidden; line-height: 0;
}
.miku-cell:hover { border-color: var(--dsw-alias-border-l3); }
.miku-cell.is-active { border-color: var(--dsw-alias-state-business-primary); }
.miku-cell img { display: block; width: 100%; height: auto; }
.miku-pager { display: flex; align-items: center; justify-content: center; gap: 12px; }
.miku-page {
  padding: 5px 12px; border: 1px solid var(--dsw-alias-border-l3);
  border-radius: var(--dsw-radius-sm); background: transparent;
  color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; cursor: pointer;
}
.miku-page:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover); }
.miku-pageinfo { font-size: 13px; color: var(--dsw-alias-label-secondary); }
`

    function MikuSettingsTab(props) {
      const { useForm, setMode, setImage, setOpacity, t } = props
      const state = useForm(snapshot => snapshot)
      const cfg = state.value ?? {}
      const mode = cfg.mode === 'fixed' ? 'fixed' : 'session'
      const fixedImage = cfg.fixedImage ?? ASSETS[0]
      const opacity = clampOpacity(cfg.opacity)
      const writable = state.writable !== false
      const [page, setPage] = useState(0)
      const pages = Math.max(1, Math.ceil(ASSETS.length / PER_PAGE))
      const safePage = Math.min(page, pages - 1)
      const slice = ASSETS.slice(safePage * PER_PAGE, (safePage + 1) * PER_PAGE)

      const modeBtn = (value, label) => h('button', {
        type: 'button',
        className: value === mode ? 'miku-mode is-active' : 'miku-mode',
        'aria-pressed': value === mode,
        disabled: !writable,
        onClick: () => { setMode(value) },
      }, label)

      return h('div', { className: 'miku-settings' },
        h('style', null, UI_CSS),
        h('div', { className: 'miku-section' },
          h('div', { className: 'miku-label' }, t('mode')),
          h('div', { className: 'miku-modes' },
            modeBtn('session', t('session')),
            modeBtn('fixed', t('fixed')),
          ),
        ),
        h('div', { className: 'miku-section' },
          h('div', { className: 'miku-label' }, t('opacity') + ': ' + Math.round(opacity * 100) + '%'),
          h('input', {
            type: 'range',
            className: 'miku-slider',
            min: 0.05, max: 1, step: 0.05,
            value: opacity,
            disabled: !writable,
            onChange: (event) => { setOpacity(parseFloat(event.target.value)) },
          }),
        ),
        mode === 'fixed' && h('div', { className: 'miku-section' },
          h('div', { className: 'miku-label' }, t('choose')),
          h('div', { className: 'miku-grid' },
            slice.map(file => h('button', {
              type: 'button',
              key: file,
              className: file === fixedImage ? 'miku-cell is-active' : 'miku-cell',
              'aria-pressed': file === fixedImage,
              'aria-label': file,
              disabled: !writable,
              onClick: () => { setImage(file) },
            }, h('img', { src: ASSET_BASE + file, alt: file, loading: 'lazy' }))),
          ),
          h('div', { className: 'miku-pager' },
            h('button', {
              type: 'button', className: 'miku-page',
              disabled: safePage === 0 || !writable, onClick: () => { setPage(safePage - 1) },
            }, t('prev')),
            h('span', { className: 'miku-pageinfo' }, safePage + 1 + ' / ' + pages),
            h('button', {
              type: 'button', className: 'miku-page',
              disabled: safePage >= pages - 1 || !writable, onClick: () => { setPage(safePage + 1) },
            }, t('next')),
          ),
        ),
      )
    }

    return {
      inject: ['slots', 'locale', 'configForms', 'uiSession'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, {
          zh: {
            title: '初音未来背景',
            mode: '模式',
            session: '根据会话自动切换',
            fixed: '使用固定图片',
            opacity: '不透明度',
            choose: '选择图片',
            prev: '上一页',
            next: '下一页',
          },
          en: {
            title: 'Miku background',
            mode: 'Mode',
            session: 'Auto-switch by session',
            fixed: 'Use a fixed image',
            opacity: 'Opacity',
            choose: 'Choose image',
            prev: 'Previous',
            next: 'Next',
          },
        }), 'miku: dictionaries')
        const t = ctx.locale.bind(NS)

        const form = ctx.configForms.get(ENTRY_ID)
        const sessionSource = ctx.uiSession.adapter.current

        const style = document.createElement('style')
        style.setAttribute('data-plugin', 'dsh-miku')
        document.head.appendChild(style)
        const render = () => {
          const cfg = form.getSnapshot().value
          const sessionId = sessionSource.getSnapshot().key
          const opacity = clampOpacity(cfg && cfg.opacity)
          let file
          if (cfg && cfg.mode === 'fixed' && cfg.fixedImage) file = cfg.fixedImage
          else if (sessionId == null) file = ASSETS[0]
          else file = ASSETS[indexFor(sessionId)]
          style.textContent = rule(file, opacity)
        }
        const offForm = form.subscribe(render)
        const offSession = sessionSource.subscribe(render)
        render()

        const setMode = (value) => { form.set('mode', value).catch((error) => { console.error('[miku] set mode failed:', error) }) }
        const setImage = (file) => { form.set('fixedImage', file).catch((error) => { console.error('[miku] set image failed:', error) }) }
        const setOpacity = (value) => { form.set('opacity', value).catch((error) => { console.error('[miku] set opacity failed:', error) }) }
        ctx.effect(() => {
          const dispose = ctx.configForms.whileServed([ENTRY_ID], () => ctx.slots.inject('settings.plugins.tab', () => ctx.slots.register({
            name: 'settings.plugins.tab',
            id: ENTRY_ID,
            order: 100,
            label: () => t('title'),
            locale: NS,
            inject: () => ({ hooks: { form }, setMode, setImage, setOpacity }),
          }, MikuSettingsTab)))
          return () => { dispose() }
        }, 'miku: settings tab')

        ctx.effect(() => () => {
          offForm()
          offSession()
          style.remove()
        }, 'miku: background')
      },
    }
  },
})
