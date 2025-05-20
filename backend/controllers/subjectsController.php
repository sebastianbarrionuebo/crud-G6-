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
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode($data);
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

    function handlePostS($conn) {
        $input = json_decode(file_get_contents("php://input"), true);
        if (createStudent($conn, $input['student_id'], $input['subject_id'], $input['grade'])) {
            echo json_encode(["message" => "Materia agregada al estudiante correctamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "No se pudo agregar la materia"]);
        }
    }

    function handlePutS($conn) {
        $input = json_decode(file_get_contents("php://input"), true);
        if (updateStudent($conn, $input['id'], $input['student_id'], $input['subject_id'], $input['grade'])) {
            echo json_encode(["message" => "Actualizado correctamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "No se pudo actualizar"]);
        }
    }

    function handleDeleteS($conn) {
        $input = json_decode(file_get_contents("php://input"), true);
        if (deleteStudent($conn, $input['id'])) {
            echo json_encode(["message" => "Eliminado correctamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "No se pudo eliminar"]);
        }
    }
?>
