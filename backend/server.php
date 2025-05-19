<?php
    /**
     * DEBUG MODE
     */


    /*Iportante!. Esto tiene que estar desactivado en produccion. 
    Para evitar detalles cruciales a los clientes*/

    /*Hace que muestre los errores por pantalla (Util para depurar durante el desarrolo)*/
    ini_set('display_errors', 1);
    /*Muestra todos los tipos de error*/
    error_reporting(E_ALL);



    /*Estas tres lineas de codigo son clabe para que la funcion fetch() desde JS funcione
    correctamente con methodos como POST, PUT, etc. Esto es obligatorio para evitar errores de CORS*/

    /*Permite que cualquier fronte end acceda al backend*/
    header("Access-Control-Allow-Origin: *");
    /*Le indica al navegador que metohos acepta el backend*/
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    /*Permite que el navegador envie encabezados personalizados al backend*/
    header("Access-Control-Allow-Headers: Content-Type");


    /*si el method es OPTIONS envia un 200 (coneccion correcta)*/
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
    
    /*Hace que se ejecute solo una vez el archivo .php*/
    /*require_once("./routes/studentsRoutes.php");*/
    





    // Obtengo la ruta de la URL
    //$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    // Separar la ruta en partes para identificar el recurso solicitado
    //$uriParts = explode('/', $uri);

    // Establecer la ruta por defecto
    //$resource = isset($_GET['resource']) ? $_GET['resource'] : 'students';
    
    if( isset($_GET['resource']) ){
        $resource = $_GET['resource'];
        switch ($resource) {
            case 'students':
                require_once('./routes/studentsRoutes.php');
                exit;
            case 'subjects':
                require_once('./routes/subjectsRoutes.php');
                exit;
                
            default:
                http_response_code(404);
                echo json_encode(["error" => "Recurso no encontrado"]);
                exit;
        } 
    }else{
        // No se especificó el parámetro 'resource'
        http_response_code(404);
        echo json_encode(["error" => "Ruta no especificada o no encontrado"]);
        exit;
    }
    

/*
    if( isset($_GET['resource']) ){
        $resource = $_GET['resource'];
        $route_file("./routes/{$resource}Routes.php");
        if(file_exists($route_file)){
            require_once($route_file);
            exit;
        }
    }else{
        http_response_code(404);
        echo json_encode(["error" => "Ruta no especificada o no encontrado"]);
        exit;
    }
*/
?>