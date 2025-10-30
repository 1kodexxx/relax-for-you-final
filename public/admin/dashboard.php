<?php
session_start();
if (empty($_SESSION["admin"])) {
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Панель управления — Relax For You</title>
  <link rel="stylesheet" href="styles/base.css" />
  <link rel="stylesheet" href="styles/layout.css" />
  <link rel="stylesheet" href="styles/components.css" />
  <link rel="stylesheet" href="styles/dashboard.css" />
</head>
<body>

<div class="admin-layout">
  <!-- Sidebar -->
  <aside class="sidebar">
    <h2>Разделы</h2>
    <a href="#" class="nav-item active">🏠 Главная</a>
    <a href="#" class="nav-item">💆 Мастера</a>
    <a href="#" class="nav-item">💎 Программы</a>
    <a href="#" class="nav-item">🖼️ Галерея</a>
    <a href="#" class="nav-item">⭐ Отзывы</a>
    <a href="#" class="nav-item">📄 Вакансии</a>
  </aside>

  <!-- Main Content -->
  <main>
    <header class="topbar">
      <h1>Relax For You — панель администратора</h1>
      <a href="logout.php" class="logout-btn">Выйти</a>
    </header>

    <section class="dashboard">
      <div class="dashboard-card">
        <h3>💆 Мастера</h3>
        <p>Редактировать информацию о специалистах.</p>
      </div>

      <div class="dashboard-card">
        <h3>💎 Программы SPA</h3>
        <p>Добавить или изменить массажные программы.</p>
      </div>

      <div class="dashboard-card">
        <h3>🖼️ Галерея</h3>
        <p>Загрузить или удалить фотографии.</p>
      </div>

      <div class="dashboard-card">
        <h3>⭐ Отзывы</h3>
        <p>Просмотр и модерация отзывов.</p>
      </div>

      <div class="dashboard-card">
        <h3>📄 Вакансии</h3>
        <p>Обновить или добавить вакансии.</p>
      </div>

      <div class="dashboard-card">
        <h3>⚙️ Настройки</h3>
        <p>Основные параметры сайта.</p>
      </div>
    </section>
  </main>
</div>

<script src="scripts/main.js"></script>
</body>
</html>
