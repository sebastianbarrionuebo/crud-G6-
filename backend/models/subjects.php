<?php
    function getAllSubjects($conn) {
        $sql = "SELECT * FROM subjects";
        return $conn->query($sql);
    }

    function getStudentById($conn, $id) {
        /*Se pone un ? para prevenir inyecciones sql*/
        $sql = "SELECT * FROM subjects WHERE id = ?";

        /*prepare($sql) Convierte la consulta en un objeto que se puede configurar antes de ejecutarlo*/
        /*Esta funcion reconoc el ? como un marcado para futuramente modificarlo*/
        $stmt = $conn->prepare($sql);

        /*bind_param("i", $id) pisa el marcado ? con el valor ingresado en el segundo paramentro*/
        /*El primer parametro indica que se va a ingresar un entero. d (decimal) s(string)*/
        /*Si hubieras tenido más de un ?
            $sql = "SELECT * FROM students WHERE email = ? AND age = ?";
            $stmt->bind_param("si", $email, $age);  // s = string, i = integer
        */
        $stmt->bind_param("i", $id);

        /*Se ejecuta la consulta a la BD*/
        $stmt->execute();

        /*Devuelve el resultado de la consulta como un objeto mysqli_result*/
        /*Esto se puede recorrer como si fuera una tabla (con fetch_assoc(), fetch_all(), etc.). */
        return $stmt->get_result();
    }
?>