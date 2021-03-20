import { createStore } from './model/store.js';
import { ModuleWrapper } from './components/moduleWrapper.js';

function createApp() {
    const store = createStore();

    var app = new Vue({
        el: '#app',
        store,
        components: {
            ModuleWrapper,
        },
        created() {
            this.$store.dispatch('fetchModules');
        },
        template: `
            <div class="app">
                <module-wrapper></module-wrapper>
            </div>
            `
    });
    return { store, app };
}
createApp();