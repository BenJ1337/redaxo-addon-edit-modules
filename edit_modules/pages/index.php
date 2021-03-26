<?php

?>
<script src="/assets/addons/edit_modules/vendor/vue.js"></script>
<script src="/assets/addons/edit_modules/vendor/vue-router.js"></script>
<script src="/assets/addons/edit_modules/vendor/vuex.js"></script>
<script src="/assets/addons/edit_modules/vendor/axios.min.js"></script>

<div id="app">
</div>

<script type="module" src="/assets/addons/edit_modules/edit-modules/main.js"></script>

<style>
    .rex-page-main {
        background: rgba(0, 0, 0, 0.4);
    }

    .c-module {
        border: 1px solid rgba(0, 0, 0, 0.4);
        padding: 15px 5px;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 0 0 10px 10px;
    }

    .c-module label {
        color: #ddd;
        width: 100%;
    }

    .c-module input {
        border-radius: 10px;
    }

    .c-module textarea {
        border-radius: 10px 10px 0 10px;
    }

    .c-module input,
    .c-module textarea {
        border: none;
        border: 1px solid rgba(0, 0, 0, 0.4);
        background-color: rgba(0, 0, 0, 0.7);
        color: #ddd;
        width: 100%;
        padding: 2px 2px 2px 10px;
        transition: background-color 0.2s ease;
    }

    .c-module input:focus,
    .c-module textarea:focus {
        outline: none;
        background-color: rgba(0, 0, 0, 0.9);
    }

    .c-module textarea {
        min-height: 200px;
    }

    .c-module p {
        color: #ddd;
    }

    .delete-btn {
        background-color: #333;
        color: #eee;
        border: 1px solid #666;
        border-radius: 3px;
        padding: 5px 28px;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .delete-btn:hover {
        background-color: #000;
        color: #fff;
    }

    .add-btn {
        background-color: #333;
        color: #eee;
        border: 1px solid #666;
        border-radius: 3px;
        padding: 5px 28px;
        transition: background-color 0.3s ease, color 0.3s ease;
        margin-top: 10px;
    }

    .add-btn:hover {
        background-color: #000;
        color: #fff;
    }

    .module-toggle {
        width: 100%;
        padding: 10px 0 10px 20px;
        background: rgba(0, 0, 0, 0.7);
        color: #eee;
        border: 1px solid #666;
        text-align: left;
        margin-top: 3px;
    }
</style>