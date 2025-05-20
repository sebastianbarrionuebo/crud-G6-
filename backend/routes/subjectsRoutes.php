<?php
    /*Trae el acceso y establece la coneccion con la DB*/
    require_once("./config/databaseConfig.php");
    /*Trae las funciones a ejecutra depentiendo del method de la solicitud*/
    require_once("./controllers/subjectsController.php");

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            handleGetS($conn);
            break;
        case 'POST':
            handlePostS($conn);
            break;
        case 'PUT':
            handlePutS($conn);
            break;
        case 'DELETE':
            handleDeleteS($conn);
            break;
        default:
            http_response_code(405);
            echo json_encode(["error" => "Método no permitido"]);
            break;
    }
?>
