<?php
    function getAllSubjects($conn) {
        $sql = "SELECT st.fullname, su.name, ss.grade
                FROM students AS st
                INNER JOIN student_subject AS ss 
                ON st.id = ss.student_id
                INNER JOIN subjects AS su 
                ON su.id = ss.subject_id
                ORDER BY st.fullname;";
        return $conn->query($sql);
    }

    function getSubjectsById($conn, $id) {
        /*Se pone un ? para prevenir inyecciones sql*/
        //$sql = "SELECT * FROM subjects WHERE id = ?";
        $sql = "SELECT su.name, ss.grade
                FROM students AS st
                INNER JOIN student_subject AS ss 
                ON st.id = ss.student_id
                INNER JOIN subjects AS su 
                ON su.id = ss.subject_id
                WHERE st.id = ?";

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

    function createSubject($conn, $idStudent, $idSubject, $grade) {
        $sql = "INSERT INTO student_subject (student_id, subject_id, grade) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iid", $idStudent, $idSubject, $grade); ///"d" para double (números con coma flotante)
        /*Devuelve un boolean si la ejecucion en la BD fue exitosa*/
        return $stmt->execute();
    }

    function updateSubject($conn, $id, $idStudent, $idSubject, $grade) {
        $sql = "UPDATE student_subject SET student_id = ?, subject_id = ?, grade = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iidi", $idStudent, $idSubject, $grade, $id);
        return $stmt->execute();
    }

    function deleteSubject($conn, $id) {
        $sql = "DELETE FROM student_subject WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
?>