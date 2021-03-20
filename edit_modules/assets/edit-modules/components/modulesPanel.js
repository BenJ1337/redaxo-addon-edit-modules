export const ModulesPanel = {
    template: `
                        <div class="container-fluid c-module">
                            <div class="row">
                                <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                    <span v-if="!this.module.neuanlage" 
                                        class="badge badge-pill badge-success">aus DB</span>
                                    <span v-if="!this.module.neuanlage" 
                                        class="ml-auto badge badge-pill badge-success">{{ this.module.id }}</span>
                                    <span v-if="!this.module.neuanlage" 
                                        class="ml-auto badge badge-pill badge-success">{{ this.module.createdate }}</span>
                                    <span v-if="!this.module.neuanlage" 
                                        class="ml-auto badge badge-pill badge-success">{{ this.module.createuser }}</span>
                                    <span v-if="!this.module.neuanlage"
                                        class="ml-auto badge badge-pill badge-success">{{ this.module.updateuser }}</span>
                                    <span v-if="changed"
                                        class="ml-auto badge badge-pill badge-success">modified</span>
                                </div>
                                <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label v-bind:for="'input'+index">Createuser:</label>
                                        <input v-bind:id="'input'+index" v-model="module.createuser">
                                    </div>
                                    <div class="form-group">
                                        <label v-bind:for="'input'+index">Updateuser:</label>
                                        <input v-bind:id="'input'+index" v-model="module.updateuser">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label v-bind:for="'input'+index">Input:</label>
                                        <textarea v-bind:id="'input'+index" v-model="module.input" style="resize: vertical"></textarea>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <div class="form-group">
                                        <label v-bind:for="'output'+index">Ouput:</label>
                                        <textarea v-bind:id="'output'+index" v-model="module.output" style="resize: vertical"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                                    <button class="delete-btn" v-on:click="deleteModule">delete</button>
                                    <button class="delete-btn" v-on:click="storeModule">store</button>
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
            this.$store.dispatch('deleteModule', this.module);
        },
        storeModule: function () {
            this.$store.dispatch('storeModule', this.module);
        },
        resetModule: function () {
            this.$store.dispatch('resetModule', this.module);
        }
    }
};