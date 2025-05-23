<?php
    function getAllSubjects($conn) {
        $sql = "SELECT s.name FROM subjects as s;";
        return $conn->query($sql);
    }
?>