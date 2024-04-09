import { App } from 'vue';

// lib
import EventBus from '../lib/EventBus';

// styles
import '../style/vnt.css';
import '../style/theme.scss';

// tools
import Engine from '../lib/Engine';

// components
import BaseField from '../BaseField.vue';
import Button from '../Button.vue';
import Card from '../Card.vue';
import Carousel from '../Carousel.vue';
import ContextArea from '../ContextArea.vue';
import Dialog from '../Dialog.vue';
import HBox from '../HBox.vue';
import Menu from '../Menu.vue';
import MenuSwitcher from '../MenuSwitcher.vue';
import Notebook from '../Notebook.vue';
import Paned from '../Paned.vue';
import PopOver from '../PopOver.vue';
import SelectField from '../SelectField.vue';
import SideLayout from '../SideLayout.vue';
import Slider from '../Slider.vue';
import StaticNotebook from '../StaticNotebook.vue';
import Switcher from '../Switcher.vue';
import TabsSwitcher from '../TabsSwitcher.vue';
import Terminal from '../Terminal.vue';
import TextField from '../TextField.vue';
import TextRich from '../TextRich.vue';
import TitleBar from '../TitleBar.vue';
import VBox from '../VBox.vue';
import Window from '../Window.vue';

const VNT = {
    install(app: App) {
        // lib
        app.config.globalProperties.$eventBus = EventBus;

        // tools
        app.config.globalProperties.$engine = Engine.getInstance();

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
        app.component('Terminal', Terminal);
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

export default VNT;