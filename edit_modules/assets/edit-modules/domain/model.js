export default class Module {

    // private fields are not currently supported
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Privateclassfields
    id;
    key;
    name;
    output;
    input;
    createdate;
    createuser;
    updateuser;
    updatedate;
    attributes;
    revision;
    neuanlage;

    constructor() {
        this.id = 0;
        this.key = '';
        this.name = '';
        this.input = '';
        this.output = '';
        this.createdate = null;
        this.createuser = '';
        this.updatedate = null;
        this.updateuser = '';
        this.attributes = '';
        this.revision = 0;
        this.neuanlage = true;
    }

    static createModule(id) {
        let module = new Module();
        module.id = id;
        return module;
    }

    static createModule(id, key, name, input, output, createdate, createuser, updatedate, updateuser, attributes, revision, neuanlage) {
        let module = new Module();
        module.id = id;
        module.key = key;
        module.name = name;
        module.input = input;
        module.output = output;
        module.createdate = createdate;
        module.createuser = createuser;
        module.updatedate = updatedate;
        module.updateuser = updateuser;
        module.attributes = attributes;
        module.revision = revision;
        module.neuanlage = neuanlage;
        return module;
    }

    getId() {
        return this.id;
    }

    getKey() {
        return this.key;
    }

    getName() {
        return this.name;
    }

    getOutput() {
        return this.output;
    }

    getInput() {
        this.input;
    }

    getCreatedate() {
        return this.createdate;
    }

    getCreateuser() {
        return this.createuser;
    }

    getAttribute() {
        return this.attributes;
    }

    getRevision() {
        return this.revision;
    }
}