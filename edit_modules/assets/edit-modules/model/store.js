import Module from '../domain/model.js';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            modules: {/* [module_id] = Module */ }
        },
        mutations: {
            addModule(state, module) {
                console.log("add Module with id: " + module.getId());
                Vue.set(state.modules, module.id, module);
            },
            deleteModule(state, module) {
                Vue.delete(state.modules, module.id);
            }
        },
        actions: {
            fetchModules(store) {
                return axios.get('http://htdocs3.local/redaxo/index.php?rex-api-call=modules')
                    .then(resp => {
                        if (resp.data.length > 0) {
                            resp.data.forEach(moduleJSON => {
                                let module = parseModuleJSON(moduleJSON);
                                module.neuanlage = false;
                                store.commit('addModule', module);
                            });
                        } else {
                            console.log("Keine Module in der Datenbank.");
                        }
                    });
            },
            storeModule(store, moduleN) {
                if (moduleN.neuanlage) {
                    axios.put('http://htdocs3.local/redaxo/index.php?rex-api-call=modules', JSON.stringify(moduleN))
                        .then(resp => {
                            if (resp.status == 200) {
                                return axios.get('http://htdocs3.local/redaxo/index.php?rex-api-call=modules&mid=' + resp.data.lastId);
                            }
                            throw new Error("Speichern nicht erfolgreich");
                        })
                        .then(resp => { store.commit('deleteModule', moduleN); store.commit('addModule', parseModuleJSON(resp.data[0])); });
                } else {
                    axios.post('http://htdocs3.local/redaxo/index.php?rex-api-call=modules', 'module=' + JSON.stringify(moduleN))
                        .then(resp => {
                            if (resp.status == 200) {
                                return axios.get('http://htdocs3.local/redaxo/index.php?rex-api-call=modules&mid=' + moduleN.id);
                            }
                            throw new Error("Speichern nicht erfolgreich");
                        })
                        .then(resp => { store.commit('deleteModule', moduleN); store.commit('addModule', parseModuleJSON(resp.data[0])); });
                }
            },
            deleteModule(store, module) {
                if (!module.neuanlage) {
                    axios.delete('http://htdocs3.local/redaxo/index.php?rex-api-call=modules&mid=' + module.id)
                        .then(resp => console.log(resp.data));
                }
                store.commit('deleteModule', module);
            },
            resetModule(store, moduleN) {
                axios.get('http://htdocs3.local/redaxo/index.php?rex-api-call=modules&mid=' + moduleN.id)
                    .then(resp => { store.commit('deleteModule', moduleN); store.commit('addModule', parseModuleJSON(resp.data[0])); });
            }
        },
        getters: {
            getModules: state => {
                return state.modules;
            }
        }
    });
}

function parseModuleJSON(json) {
    return Module.createModule(
        json.id,
        json.key,
        json.name,
        json.input,
        json.output,
        json.createdate,
        json.createuser,
        json.updateuser,
        json.attributes,
        json.revision);
}