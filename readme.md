# TO-DO calendar

### Приложение для создания задач, привязанных к календарю

### Приложение состоит из серверной и клиентской части

### Клиент - react + redux + typescript + [isdayoff api](https://www.isdayoff.ru/)

### Сервер - http + typescript + sqlite

### Задачи
1. [ ] Приятный дизайн
2. [ ] Добавление задачи из списка всех дней(иконка на нужном дне с попапом)
3. [ ] Маркировка праздничных дней используя isDayOff() API
4. [ ] Использовать sql вместо query builder
5. [ ] Инициализация хранилища SQLite при его отсутствии
6. [x] Использование TypeScript на бекенде
7. [ ] Система профилей, выбор профиля из списка, изменение списка, у каждого
   профиля свой список задач, не отображаемый в другом профиле
8. [ ] Прикрепление файла любого типа к задаче, с возможностью скачать его
9. [ ] Реализация второй модели зрелости REST
10. [ ] Реализация эндпоинтов по типу /task/:id и т.п.
11. [ ] Реализовать dependency inversion для интерфейса работы с HTTP запросами
12. [ ] Разворачивание проекта в Docker