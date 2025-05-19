<?php
    require_once("./models/subjects.php");

    function handleGetS($conn) {
        /*isset pregunta si existe la variable id del method GET*/
        if (isset($_GET['id'])) {
            $result = getSubjectsById($conn, $_GET['id']);

            /*json_encode transforma un array o objeto php a Json*/
            /*fetch_assoc() obtiene una fila del resultado de la consulta y 
                la devuelve como un arreglo asociativo.
                Los nombres de las columnas en la base de datos serán las claves del arreglo.*/
            /*echo: Envía ese JSON al navegador, cliente o donde se haya hecho la petición.*/
            echo json_encode($result->fetch_assoc());
        }else{
            // Intentar obtener las materias
            $result = getAllSubjects($conn);  // Obtiene las materias
            $data = [];
            
            // Verificar si hubo un error en la consulta
            if (!$result) {
                echo json_encode(["error" => "Error en la consulta a la base de datos"]);
                return;
            }
            
            // Recorre los resultados y agrega cada fila al array $data
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            
            // Verificar si los datos están vacíos
            if (empty($data)) {
                echo json_encode(["message" => "No hay materias disponibles"]);
                return;
            }
            
            // Enviar la respuesta JSON
            echo json_encode($data);
        }
    }
?>
