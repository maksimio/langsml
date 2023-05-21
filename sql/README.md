# SQL для работы с данными

## Установка среды работы языка

Простую аналитику данных можно проводить на языке запросов SQL. Он не является языком программирования, однако позволяет провести первичную обработку и визуализацию данных, посмотреть на их значения.

Установка базы данных в систему (например, PostgreSQL) является сложным действием. Но есть простое зарекомендовавшее себя решение - база данных SQLite. Она представляет собой двоичный файл. Сама библиотека SQLite имеет небольшой размер и легко встраивается в приложения.

Для работы с SQLite необходимо установить [DB Browser for SQLite](https://sqlitebrowser.org/) - это одна из наиболее подходящих программ с графическим интерфейсом, доступная для Windows и Linux.

## Установка библиотек

Библиотек для SQL не существует, так как это не язык программирования. Вывод графиков поддерживает DB Browser for SQLite.

# Запуск

> В файле db.db уже есть таблица dataset.csv, однако рекомендуется провести импорт собственноручно.

Чтобы начать работу с данными необходимо открыть DB Browser for SQLite. Затем создать новую базу данных, так как добавлять таблицу можно только внутрь базы данных. Далее выбрать Файл --> Импорт --> Таблицы из файла CSV... Откроется окно импорта. После его завершения вы увидите на вкладке Данные датасет.

Для выполнения скриптов перейдите на вкладку SQL, вставьте код из файла main.sql и нажмите Play (Ctrl + R).

> В местах в коде, где требуется использовать графический интерфейс DB Browser for SQLite есть соответствующие инструкции в комментариях.

После выполнения скрипта экспортируйте таблицу out в файл формата CSV.