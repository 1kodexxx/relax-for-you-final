<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!empty($_SESSION["admin"])) {
    header("Location: ./dashboard.php");
    exit;
} else {
    header("Location: ./index.php");
    exit;
}
