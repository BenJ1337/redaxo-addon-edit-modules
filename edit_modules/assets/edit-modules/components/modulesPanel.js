export const ModulesPanel = {
    template: `
                        <div class="container-fluid c-module">
                            <div class="row">
                                <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <span v-if="!this.module.neuanlage" 
                                            class="label label-success">aus DB</span>
                                        <span v-if="!this.module.neuanlage" 
                                            class="label label-info">{{ this.module.id }}</span>
                                        <span v-if="changed"
                                            class="label label-warning">modified</span>
                                    </div>
                                    <div class="form-group">
                                        <label v-bind:for="'modulename'+index">Modulename
                                        </label>
                                        <input v-bind:id="'modulename'+index" v-model="module.name">
                                    </div>
                                </div>
                                <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label v-bind:for="'input'+index">Createuser 
                                            <span v-if="!this.module.neuanlage"
                                            class="label label-info">{{ this.module.createdate }}</span>
                                        </label>
                                        <input v-bind:id="'input'+index" v-model="module.createuser">
                                    </div>
                                    <div class="form-group">
                                        <label v-bind:for="'input'+index">Updateuser
                                            <span v-if="!this.module.neuanlage"
                                            class="label label-info">{{ this.module.updatedate }}</span>
                                        </label>
                                        <input v-bind:id="'input'+index" v-model="module.updateuser">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label v-bind:for="'input'+index">Input</label>
                                        <textarea v-bind:id="'input'+index" v-model="module.input" style="resize: vertical"></textarea>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label v-bind:for="'output'+index">Ouput</label>
                                        <textarea v-bind:id="'output'+index" v-model="module.output" style="resize: vertical"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                                    <button class="delete-btn" v-on:click="deleteModule">delete</button>
                                    <button class="delete-btn" v-on:click="storeModule">save</button>
                                    <button v-if="!this.module.neuanlage" class="delete-btn" v-on:click="resetModule">reset</button>
                                </div>
                            </div>
                    </div>`,
    props: {
        module: {},
        index: 0
    },
    data: function () {
        return {
            changed: false,
            backupModule: {}
        }
    },
    created() {
        Object.assign(this.backupModule, this.module);
    },
    watch: {
        module: {
            handler: function () {
                this.changed =
                    JSON.stringify(this.module).replace(/(?:\\[rn])+/g, "cc")
                    != JSON.stringify(this.backupModule).replace(/(?:\\[rn])+/g, "cc");
            },
            deep: true
        }
    },
    methods: {
        deleteModule: function () {
            if (confirm("Do you really want to delete this module?")) {
                this.$store.dispatch('deleteModule', this.module);
            }
        },
        storeModule: function () {
            this.$store.dispatch('storeModule', this.module);
        },
        resetModule: function () {
            if (confirm("Do you really want to undo your lokal changes for this module?")) {
                this.$store.dispatch('resetModule', this.module);
            }
        }
    }
};