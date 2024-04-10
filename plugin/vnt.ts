import { App } from 'vue';

// lib
import EventBus from '../lib/EventBus';
import Engine from '../lib/Engine';

// styles
import '../style/vnt.css';
import '../style/theme.scss';

// components
import BaseField from '../widgets/BaseField.vue';
import Button from '../widgets/Button.vue';
import Card from '../widgets/Card.vue';
import Carousel from '../widgets/Carousel.vue';
import ContextArea from '../widgets/ContextArea.vue';
import Dialog from '../widgets/Dialog.vue';
import HBox from '../widgets/HBox.vue';
import Menu from '../widgets/Menu.vue';
import MenuSwitcher from '../widgets/MenuSwitcher.vue';
import Notebook from '../widgets/Notebook.vue';
import Paned from '../widgets/Paned.vue';
import PopOver from '../widgets/PopOver.vue';
import SelectField from '../widgets/SelectField.vue';
import SideLayout from '../widgets/SideLayout.vue';
import Slider from '../widgets/Slider.vue';
import StaticNotebook from '../widgets/StaticNotebook.vue';
import Switcher from '../widgets/Switcher.vue';
import TabsSwitcher from '../widgets/TabsSwitcher.vue';
import TextField from '../widgets/TextField.vue';
import TextRich from '../widgets/TextRich.vue';
import TitleBar from '../widgets/TitleBar.vue';
import VBox from '../widgets/VBox.vue';
import Window from '../widgets/Window.vue';

const vnt = {
    install(app: App, engine: Engine) {
        // lib
        app.config.globalProperties.$eventBus = EventBus;
        app.config.globalProperties.$engine = engine;

        // components
        app.component('BaseField', BaseField);
        app.component('Button', Button);
        app.component('Card', Card);
        app.component('Carousel', Carousel);
        app.component('ContextArea', ContextArea);
        app.component('Dialog', Dialog);
        app.component('HBox', HBox);
        app.component('Menu', Menu);
        app.component('MenuSwitcher', MenuSwitcher);
        app.component('Notebook', Notebook);
        app.component('Paned', Paned);
        app.component('PopOver', PopOver);
        app.component('SelectField', SelectField);
        app.component('SideLayout', SideLayout);
        app.component('Slider', Slider);
        app.component('StaticNotebook', StaticNotebook);
        app.component('Switcher', Switcher);
        app.component('TabsSwitcher', TabsSwitcher);
        app.component('TextField', TextField);
        app.component('TextRich', TextRich);
        app.component('TitleBar', TitleBar);
        app.component('VBox', VBox);
        app.component('Window', Window);

        // theme override
        if (app.config.globalProperties.$vntConf) {
            console.debug('VNT configuration found:', app.config.globalProperties.$vntConf);
            const conf = app.config.globalProperties.$vntConf;

            if (conf.light) {
                const lightMediaStyle = document.createElement('style');
                lightMediaStyle.innerHTML = `:root {
                    ${generateThemeCSS(conf.light)}
                }`;
                document.head.appendChild(lightMediaStyle);

                const lightClassStyle = document.createElement('style');
                lightClassStyle.innerHTML = `.light {
                    ${generateThemeCSS(conf.light)}
                }`;
                document.head.appendChild(lightClassStyle);
            }

            if (conf.dark) {
                const darkMediaStyle = document.createElement('style');
                darkMediaStyle.innerHTML = `@media (prefers-color-scheme: dark) {
                    :root {
                        ${generateThemeCSS(conf.dark)}
                    }
                }`;
                document.head.appendChild(darkMediaStyle);

                const darkClassStyle = document.createElement('style');
                darkClassStyle.innerHTML = `.dark {
                        ${generateThemeCSS(conf.dark)}
                    }
                }`;
                document.head.appendChild(darkClassStyle);
            }
        }
    }
};

function generateThemeCSS(theme: { [x: string]: any; }) {
    let css = '';
    Object.keys(theme).forEach(key => {
        const kebabKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        css += `--${kebabKey}: ${theme[key]};\n`;
    });
    return css;
}

export default vnt;