# This addon provides an alternative gui for editing modules

# In the current Redaxo Version, it requires a change in the core system:

    \redaxo\src\core\backend.php


"rex_api_function::handleCall();" musst be moved to line 206 inside the if-statement

    if (rex::getUser()) {
    rex_be_controller::appendPackagePages();
        rex_api_function::handleCall();
    }

otherwise it requires a "page" param in the url, which is not included in the api requests.

![Preview](https://github.com/BenJ1337/redaxo-addon-edit-modules/blob/master/gui-preview.PNG)
