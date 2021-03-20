<?php

class rex_api_modules extends rex_api_function
{
    // session timeout
    protected $published = false;

    function execute()
    {
        $logger = rex_logger::factory();
        $response = '{}';
        header('Content-Type: application/json');
        try {
            if ('GET' === $_SERVER['REQUEST_METHOD']) {
                if (isset($_GET['mid']) && !empty($_GET['mid'])) {
                    $response = $this->getModuleAsJSON($_GET['mid']);
                } else {
                    $response = $this->getModulesAsJSON();
                }
            } else if ('POST' === $_SERVER['REQUEST_METHOD']) {
                $logger->info('POST: ' . json_encode($_POST));
                if (isset($_POST['module']) && !empty($_POST['module'])) {
                    $logger->info('Module vorhanden.');
                    $response = $this->storeModule(json_decode($_POST['module'], true));
                }
            } else if ('PUT' === $_SERVER['REQUEST_METHOD']) {
                $messageBody = file_get_contents('php://input');
                if (!empty($messageBody)) {
                    $response = $this->storeModule(json_decode($messageBody, true));
                }
            } else if ('DELETE' === $_SERVER['REQUEST_METHOD']) {
                if (isset($_GET['mid']) && !empty($_GET['mid'])) {
                    $response = $this->deleteModule($_GET['mid']);
                }
            } else {
                header($_SERVER['REQUEST_METHOD'] . ' 405 Method Not Allowed', true, 405);
            }
        } catch (rex_sql_exception | Exception $ex) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            $logger->error('Error [Edit-Modules REST-Api] : {exMessage}', array('exMessage' => $ex->getMessage()));
        }
        echo $response;
        exit();
    }

    private function storeModule($module)
    {
        $logger = rex_logger::factory();
        $sql = rex_sql::factory();
        $sql->setTable('rex_module');
        if (isset($module['neuanlage']) && $module['neuanlage']) {
            $logger->warning('Warnung [Edit-Modules REST-Api] : {message}', array('message' => 'Id aus Module vor INSERT entfernt'));
            unset($module['id']);
        }
        unset($module['neuanlage']);
        $sql->setValues($module);
        $logger->info(json_encode($module));
        $logger->info('' . isset($module['id']));
        if (!isset($module['id'])) {
            $sql->insert();
        } else {
            $sql->setWhere("id = :mid", array('mid' => $module['id']));
            $sql->update();
        }
        return json_encode(array('rows' => $sql->getRows(), 'lastId' => $sql->getLastId()));
    }

    private function updateModule($module)
    {
        $sql = rex_sql::factory();
        $sql->setTable('rex_module');
        if (isset($module['id'])) {
            $logger = rex_logger::factory();
            $logger->warning('Warnung [Edit-Modules REST-Api] : {message}', array('message' => 'Id aus Module vor UPDATE entfernt'));
            unset($module['id']);
        }
        $sql->setValues($module);
        $sql->update();
        return json_encode(array('rows' => $sql->getRows(), 'lastId' => $sql->getLastId()));
    }

    private function deleteModule($mid)
    {
        if (isset($mid) && !empty($mid)) {
            if (!is_numeric($mid)) {
                throw new Exception("Die Module-ID muss eine Zahl sein!");
            }
            $sql = rex_sql::factory();
            $sql->setTable('rex_module');
            $sql->setWhere("id = :mid", array('mid' => $mid));
            $sql->delete();
            return json_encode(array('rowsDeleted' => $sql->getRows()));
        }
        throw new Exception("Um ein Modul zu löschen, muss eine Module-ID angegeben werden!");
    }

    private function getModuleAsJSON($mid)
    {
        $sql = rex_sql::factory();
        $params = array();
        $query = 'SELECT * FROM rex_module';
        if (!is_numeric($mid)) {
            throw new Exception("Die Module-ID muss eine Zahl sein!");
        }
        $params["mid"] = $mid;
        $query .= ' WHERE id= :mid';
        $module_ids_results = $sql->getDBArray($query, $params);
        return json_encode($module_ids_results);
    }

    private function getModulesAsJSON()
    {
        $sql = rex_sql::factory();
        $params = array();
        $query = 'SELECT * FROM rex_module';
        $module_ids_results = $sql->getDBArray($query);
        return json_encode($module_ids_results);
    }
}
