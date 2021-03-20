import Module from '../domain/model.js';
import { ModulesPanel } from './modulesPanel.js';

export const ModuleWrapper = {
    template: `<div>
                    <modules-panel v-for="(module, index) in getModules" :key="index" v-bind:module="module" v-bind:index="index"></modules-panel>
                    <button class="add-btn" v-on:click="addModule">Add Module</button>
                </div>`,
    methods: {
        addModule: function () {
            console.log('addModule');
            this.$store.commit('addModule', Module.createModule(1));
        }
    },
    components: {
        ModulesPanel
    },
    methods: {
        addModule: function () {
            let ids = []
            Object.values(this.$store.getters.getModules).forEach(element => {
                ids.push(element.id);
            });
            let maxId = Math.max(...ids);
            let module = Module.createModule(++maxId,
                null,
                'Mustername',
                '',
                '',
                new Date(),
                'edit Modules Addon',
                '',
                '',
                0,
                true);
            this.$store.commit('addModule', module);
        }
    },
    computed: {
        getModules: function () {
            console.log(this.$store.getters.getModules);
            return this.$store.getters.getModules;
        }
    }
};