<?php
    /*Trae el acceso y establece la coneccion con la DB*/
    require_once("./config/databaseConfig.php");
    /*Trae las funciones a ejecutra depentiendo del method de la solicitud*/
    require_once("./controllers/studentsController.php");

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            handleGet($conn);
            break;
        case 'POST':
            handlePost($conn);
            break;
        case 'PUT':
            handlePut($conn);
            break;
        case 'DELETE':
            handleDelete($conn);
            break;
        default:
            http_response_code(405);
            echo json_encode(["error" => "Método no permitido"]);
            break;
    }
?>