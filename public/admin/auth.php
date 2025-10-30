<?php
// Без session_start() — он уже запускается в index.php

$ADMIN_LOGIN = "admin";
$ADMIN_PASS  = "Rfy_LotusMoon!25";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $login = trim($_POST["login"] ?? "");
    $pass  = trim($_POST["password"] ?? "");

    if ($login === $ADMIN_LOGIN && $pass === $ADMIN_PASS) {
        $_SESSION["admin"] = true;

        // ✅ Переход строго в текущую папку admin
        header("Location: ./dashboard.php");
        exit;
    } else {
        $error = "Неверный логин или пароль.";
    }
}
?>
