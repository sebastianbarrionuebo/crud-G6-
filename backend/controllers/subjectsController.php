<?php
    require_once("./models/subjects.php");

    function handleGetS($conn) {
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
?>
