<?php

class rex_api_modules extends rex_api_function
{
    // session timeout
    protected $published = false;

    function execute()
    {
        $response = '{}';
        header('Content-Type: application/json');
        try {
            if ('GET' === $_SERVER['REQUEST_METHOD']) {
                if (isset($mid) && !empty($mid)) {
                    $response = $this->getModuleAsJSON($_GET['mid']);
                } else {
                    $response = $this->getModulesAsJSON();
                }
            } else if ('POST' === $_SERVER['REQUEST_METHOD']) {
                if (isset($_POST['module']) && !empty($_POST['module'])) {
                    $response = $this->updateModule(json_decode($_POST['module'], true));
                }
            } else if ('PUT' === $_SERVER['REQUEST_METHOD']) {
                $messageBody = file_get_contents('php://input');
                if (!empty($messageBody)) {
                    parse_str($messageBody, $data);
                    if (isset($data['module']) && !empty($data['module'])) {
                        $response = $this->insertModule(json_decode($data['module'], true));
                    }
                }
            } else if ('DELETE' === $_SERVER['REQUEST_METHOD']) {
                $messageBody = file_get_contents('php://input');
                if (!empty($messageBody)) {
                    parse_str($messageBody, $data);
                    if (isset($data['mid']) && !empty($data['mid'])) {
                        $response = $this->deleteModule(json_decode($data['mid'], true));
                    }
                }
            } else {
                header($_SERVER['REQUEST_METHOD'] . ' 405 Method Not Allowed', true, 405);
            }
        } catch (rex_sql_exception | Exception $ex) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            $logger = rex_logger::factory();
            $logger->error('Error [Edit-Modules REST-Api] : {exMessage}', array('exMessage' => $ex->getMessage()));
        }
        echo $response;
        exit();
    }

    private function insertModule($module)
    {
        $sql = rex_sql::factory();
        $sql->setTable('rex_module');
        if (isset($module['id'])) {
            $logger = rex_logger::factory();
            $logger->warning('Warnung [Edit-Modules REST-Api] : {message}', array('message' => 'Id aus Module vor INSERT entfernt'));
            unset($module['id']);
        }
        $sql->setValues($module);
        $sql->insert();
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
