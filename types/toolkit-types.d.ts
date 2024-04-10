import 'vue';
import { Emitter } from 'mitt';
import Engine from '../lib/Engine';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $eventBus: Emitter;
        $engine: Engine;
    }
}
