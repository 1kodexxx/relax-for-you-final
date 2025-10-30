<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (empty($_SESSION["admin"])) {
    header("Location: ./index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Панель — Relax For You</title>
  <link rel="stylesheet" href="styles/base.css" />
  <link rel="stylesheet" href="styles/layout.css" />
  <link rel="stylesheet" href="styles/dashboard.css" />
</head>
<body>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <img src="/logo.png" alt="Relax For You logo" class="sidebar-logo" />
      <div class="sidebar-title">
        <span class="brand-sub">by Эстетик SPA</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <a href="dashboard.php" class="nav-link active">🏠 Главная</a>
      <a href="programs.php" class="nav-link">💆 Программы</a>
      <a href="masters.php" class="nav-link">👩‍🦰 Мастера</a>
      <a href="reviews.php" class="nav-link">💬 Отзывы</a>
      <a href="gallery.php" class="nav-link">🖼 Галерея</a>
      <a href="logout.php" class="nav-link">🚪 Выйти</a>
    </nav>
  </aside>


  <main class="dashboard">
    <header class="dash-head">
      <h1>Панель администратора</h1>
      <p>Управление контентом сайта Relax For You</p>
    </header>

    <section class="dash-grid">
      <!-- карточки -->
      <article class="dash-card">
        <h3>Мастера</h3>
        <p>Управляйте профилями специалистов, фото и описаниями.</p>
        <a href="masters.php" class="btn">Перейти</a>
      </article>

      <article class="dash-card">
        <h3>Программы</h3>
        <p>Добавляйте и редактируйте SPA-программы и категории.</p>
        <a href="programs.php" class="btn">Перейти</a>
      </article>

      <article class="dash-card">
        <h3>Отзывы</h3>
        <p>Просматривайте отзывы гостей и управляйте публикациями.</p>
        <a href="reviews.php" class="btn">Перейти</a>
      </article>

      <article class="dash-card">
        <h3>Галерея</h3>
        <p>Добавляйте фотографии салона и работ мастеров.</p>
        <a href="gallery.php" class="btn">Перейти</a>
      </article>
    </section>
  </main>

  <nav class="mobile-nav">
    <a href="dashboard.php" class="nav-item active"><i>🏠</i><span>Главная</span></a>
    <a href="programs.php" class="nav-item"><i>💆</i><span>Программы</span></a>
    <a href="masters.php" class="nav-item"><i>👩‍🦰</i><span>Мастера</span></a>
    <a href="reviews.php" class="nav-item"><i>💬</i><span>Отзывы</span></a>
    <a href="gallery.php" class="nav-item"><i>🖼</i><span>Галерея</span></a>
  </nav>

  <script src="admin.js"></script>
</body>

<!-- 🔘 Кнопка меню (мобильная версия) -->
<button class="menu-toggle" aria-label="Открыть меню">
  ☰
</button>
</html>
