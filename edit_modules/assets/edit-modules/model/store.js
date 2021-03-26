import Module from '../domain/model.js';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            modules: {/* [module_id] = Module */ }
        },
        mutations: {
            addModule(state, module) {
                console.log('add module to state with id: ' + module.getId());
                Vue.set(state.modules, module.id, module);
            },
            deleteModule(state, module) {
                console.log('delete module from state with id: ' + module.getId());
                Vue.delete(state.modules, module.id);
            }
        },
        actions: {
            fetchModules(store) {
                console.log('load module from database');
                return axios.get('http://htdocs3.local/redaxo/index.php?rex-api-call=modules')
                    .then(resp => {
                        if (resp.data.length > 0) {
                            resp.data.forEach(moduleJSON => {
                                let module = parseModuleJSON(moduleJSON);
                                module.neuanlage = false;
                                store.commit('addModule', module);
                            });
                        } else {
                            console.log("no modules in database.");
                        }
                    });
            },
            storeModule(store, moduleN) {
                moduleN.updatedate = new Date();
                if (moduleN.neuanlage) {
                    console.log('store new module in database with id: ' + moduleN.id);
                    return axios.put('http://htdocs3.local/redaxo/index.php?rex-api-call=modules', JSON.stringify(moduleN))
                        .then(resp => {
                            if (resp.status == 200) {
                                return axios.get('http://htdocs3.local/redaxo/index.php?rex-api-call=modules&mid=' + resp.data.lastId);
                            }
                            throw new Error("storing failed");
                        })
                        .then(resp => { store.commit('deleteModule', moduleN); store.commit('addModule', parseModuleJSON(resp.data[0])); });
                } else {
                    console.log('update module in database with id: ' + moduleN.id);
                    return axios.post('http://htdocs3.local/redaxo/index.php?rex-api-call=modules', 'module=' + JSON.stringify(moduleN))
                        .then(resp => {
                            if (resp.status == 200) {
                                return axios.get('http://htdocs3.local/redaxo/index.php?rex-api-call=modules&mid=' + moduleN.id);
                            }
                            throw new Error("storing failed");
                        })
                        .then(resp => { store.commit('deleteModule', moduleN); store.commit('addModule', parseModuleJSON(resp.data[0])); });
                }
            },
            deleteModule(store, module) {
                console.log('delete module in databse with id: ' + module.id);
                if (!module.neuanlage) {
                    axios.delete('http://htdocs3.local/redaxo/index.php?rex-api-call=modules&mid=' + module.id)
                        .then(resp => console.log(resp.data));
                }
                store.commit('deleteModule', module);
            },
            resetModule(store, moduleN) {
                console.log('load current version of module from database for id: ' + moduleN.id);
                return axios.get('http://htdocs3.local/redaxo/index.php?rex-api-call=modules&mid=' + moduleN.id)
                    .then(resp => { store.commit('deleteModule', moduleN); store.commit('addModule', parseModuleJSON(resp.data[0])); });
            }
        },
        getters: {
            getModules: state => {
                return state.modules;
            },
            getModule: state => (id) => {
                return state.modules[id];
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
        json.updatedate,
        json.updateuser,
        json.attributes,
        json.revision);
}