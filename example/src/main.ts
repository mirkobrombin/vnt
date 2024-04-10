import { createApp } from 'vue'
import App from './App.vue'
import vnt from 'vnt/plugin/vnt'
// import BrowserEngine from 'vnt/lib/engines/Browser'
import TauriEngine from 'vnt/lib/engines/Tauri'
import { Window } from '@tauri-apps/api/window'

const app = createApp(App)

// Theme override (optional)
// app.config.globalProperties.$vntConf = {
//     light: {
//         backgroundBase: '#f5fbf5',
//         backgroundElevated: '#ecf8ec',
//         backgroundElevated2: '#e1f1e1',
//         backgroundElevated2Hover: '#d6ead6',
//         backgroundTop: '#c9e2c9',
//         backgroundTranslucent: 'rgba(245, 251, 245, 0.95)',
//         shadowBase: 'none',
//         shadowElevated: '0 2px 4px rgba(0, 0, 0, 0.1)',
//         shadowElevated2: '0 2px 4px rgba(0, 0, 0, 0.05)',
//         shadowTop: '0 0 10px rgba(0, 0, 0, 0.2)',
//         textPrimary: '#333333',
//         textPrimaryAlt: '#ffffff',
//         textSecondary: '#888888',
//         borderPrimary: '#dddddd',
//         borderSecondary: '#f0f0f0',
//         borderTertiary: '#bcbcbc',
//         actionSuggested: '#48cd98',
//         actionSuggestedHover: '#3dbd87',
//         actionSuggestedActive: '#32a572',
//         actionSuggestedDisabled: '#a1d5c9',
//         actionDestructive: '#f44336',
//         actionDestructiveHover: '#d32f2f',
//         actionDestructiveActive: '#b71c1c',
//         actionDestructiveDisabled: '#f8cbcb',
//         scrollbarThumb: '#48cd98',
//         scrollbarThumbHover: '#388e3c',
//     },
//     dark: {
//         backgroundBase: '#323232',
//         backgroundElevated: '#3c3c3c',
//         backgroundElevated2: '#474747',
//         backgroundElevated2Hover: '#525252',
//         backgroundTop: '#5d5d5d',
//         backgroundTranslucent: 'rgba(50, 50, 50, 0.95)',
//         shadowBase: 'none',
//         shadowElevated: '0 2px 4px rgba(0, 0, 0, 0.1)',
//         shadowElevated2: '0 2px 4px rgba(0, 0, 0, 0.05)',
//         shadowTop: '0 0 10px rgba(0, 0, 0, 0.3)',
//         textPrimary: '#ffffff',
//         textPrimaryAlt: '#000000',
//         textSecondary: '#999999',
//         borderPrimary: '#2c2c2c',
//         borderSecondary: '#1f1f1f',
//         borderTertiary: '#3f3f3f',
//         actionSuggested: '#48cd98',
//         actionSuggestedHover: '#3dbd87',
//         actionSuggestedActive: '#32a572',
//         actionSuggestedDisabled: '#4b7c6d',
//         actionDestructive: '#f44336',
//         actionDestructiveHover: '#d32f2f',
//         actionDestructiveActive: '#b71c1c',
//         actionDestructiveDisabled: '#765151',
//         scrollbarThumb: '#48cd98',
//         scrollbarThumbHover: '#1976d2',
//     },
// };

// Using Tauri Engine
app.use(vnt, new TauriEngine(Window.getCurrent()))

// Using Browser Engine
// app.use(vnt, new BrowserEngine())

app.mount('#app')
