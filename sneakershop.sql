-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 26 2024 г., 16:29
-- Версия сервера: 5.7.39
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `sneakershop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `order_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `total_price` int(11) NOT NULL,
  `creation_date` date NOT NULL,
  `delivery_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `total_price`, `creation_date`, `delivery_date`) VALUES
(1, 3, 19998, '2024-05-17', '2024-05-20'),
(2, 8, 51996, '2024-05-17', '2024-05-20'),
(4, 9, 25998, '2024-05-22', '2024-05-25'),
(5, 3, 70995, '2024-05-26', '2024-05-29');

-- --------------------------------------------------------

--
-- Структура таблицы `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(255) NOT NULL,
  `order_id` int(255) NOT NULL,
  `product_id` int(255) NOT NULL,
  `size` int(255) NOT NULL,
  `amount` int(255) NOT NULL,
  `price` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `size`, `amount`, `price`) VALUES
(1, 1, 2, 38, 1, 9999),
(2, 1, 2, 39, 1, 9999),
(3, 2, 1, 39, 2, 12999),
(4, 2, 1, 40, 2, 12999),
(6, 4, 1, 40, 1, 12999),
(7, 4, 1, 41, 1, 12999),
(8, 5, 1, 41, 1, 12999),
(9, 5, 2, 39, 1, 9999),
(10, 5, 9, 38, 2, 15999),
(11, 5, 9, 40, 1, 15999);

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `product_id` int(255) NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(255) NOT NULL,
  `description_small` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `main_image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sup_image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sizes` json NOT NULL,
  `visibility` int(255) NOT NULL,
  `is_popular` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`product_id`, `title`, `price`, `description_small`, `description`, `main_image`, `sup_image`, `sizes`, `visibility`, `is_popular`) VALUES
(1, 'NIKE AIR JORDAN', 12999, 'Оригинальные Nike Jordan 1 в красно белом окрасе', 'Эти невероятные кроссовки созданы для любителей активного образа жизни. Современный дизайн и высококачественные материалы обеспечивают комфорт и поддержку на протяжении всего дня. Гибкая и износостойкая подошва с глубоким протектором гарантирует отличное сцепление с поверхностью, а легкая, но прочная конструкция позволяет двигаться быстро и уверенно.', '/images/sneakers_product/red_black/pngwing.com (6).png', '/images/sneakers_product/red_black/pngwing.com (3).png', '[37, 38, 39, 40, 41]', 1, 1),
(2, 'NIKE AIR 1', 9999, 'Оригинальные Nike Air 1 в красно черном окрасе', 'Воздухопроницаемый верх из сетчатого материала создает эффективную вентиляцию, не давая ногам перегреваться. Система амортизации обеспечивает мягкую и плавную посадку, снижая нагрузку на суставы. Стильный и современный дизайн отлично сочетается с повседневной одеждой, позволяя создавать модные образы для прогулок, занятий спортом или просто активного отдыха.', '/images/sneakers_product/red_black_white/red_white_jordan_anfas.png', '/images/sneakers_product/red_black_white/red_sneakers_jordan.png', '[37, 38, 39, 40, 41]', 1, 1),
(8, 'Nike Air Max', 8999, 'Оригинальный Nike Air Max в красно белом окрасе', 'Эти кроссовки - настоящий прорыв в мире спортивной обуви! Инновационные технологии и современные материалы делают их не только невероятно комфортными, но и стильными.\nВерх из дышащего сетчатого материала обеспечивает оптимальную воздухопроницаемость.', '/images/sneakers_product/air_red/1.png', '/images/sneakers_product/air_red/2.png', '[37, 39, 40, 41, 42]', 1, 1),
(9, 'Nike Air Jordan', 15999, 'Оригинальные Nike Air Jordan в черно-синем окрасе', 'Мягкая, но при этом стабильная конструкция поддерживает стопу и предотвращает усталость.\nДинамичный дизайн с яркими акцентами придает кроссовкам современный и активный вид.', '/images/sneakers_product/blue_black/1.png', '/images/sneakers_product/blue_black/2.png', '[38, 40, 41, 42]', 1, 1),
(10, 'Nike Jordan OffWhite', 24999, 'Оригинальные OffWhite кроссовки в бело-голубом окрасе', 'Эти кроссовки - идеальное сочетание высоких технологий и современного дизайна. Они созданы, чтобы помогать вам достигать новых высот, не жертвуя комфортом.\nУникальный материал верха обеспечивает исключительную воздухопроницаемость.', '/images/sneakers_product/blue_white_orange/1.png', '/images/sneakers_product/blue_white_orange/2.png', '[39, 40, 41, 42]', 1, 0),
(11, 'Air Force 1', 7999, 'Оригинальные низкие Air Force в черно-белом окрасе', 'Эти ботинки - квинтэссенция универсальности и комфорта. Созданные для повседневной носки, они идеально дополнят ваш гардероб и станут надежными спутниками в любых жизненных ситуациях.', '/images/sneakers_product/low_white_black/1.png', '/images/sneakers_product/low_white_black/2.png', '[39, 40, 41, 42, 43]', 1, 0),
(12, 'Adidas NMD R1', 13999, 'Оригинальный NMD R1 в черном окрасе', 'Гибкая и амортизирующая подошва с прорезиненным протектором обеспечивает уверенное сцепление с поверхностью, а также смягчает нагрузку на суставы во время ходьбы. ', '/images/sneakers_product/nmd_black/1.png', '/images/sneakers_product/nmd_black/2.png', '[37, 38, 39, 40, 41, 42]', 1, 0),
(13, 'Nike Jordan 1', 18999, 'Оригинальные Jordan 1 в бело-оранжевом окрасе', 'Эти ботинки - воплощение практичности и стиля. Надежные, удобные и стильные, они станут вашим любимым выбором на каждый день. Будьте уверены в себе и своем образе в этих замечательных ботинках!', '/images/sneakers_product/orange_white/1.png', '/images/sneakers_product/orange_white/2.png', '[38, 39, 40, 41, 42]', 1, 0),
(14, 'Nike Air Jordan', 15999, 'Оригинальные Jordan в черно-красном окрасе', 'Эти ботинки олицетворяют собой совершенное сочетание функциональности и элегантности. Созданные для ежедневного использования, они обеспечат вам комфорт и стиль в любых жизненных ситуациях.', '/images/sneakers_product/red_gray/1.png', '/images/sneakers_product/red_gray/2.png', '[38, 39, 40, 41, 42]', 1, 0),
(15, 'Yeezy Boosts', 16999, 'Оригинальные серые Yeezy Boosts', 'Классический дизайн с лаконичными деталями позволяет легко интегрировать эти ботинки в любой повседневный образ - будь то деловой костюм или casual-комплект. Они станут идеальным выбором для тех, кто ценит практичность, качество и элегантность.', '/images/sneakers_product/yeezy_gray/1.png', '/images/sneakers_product/yeezy_gray/2.png', '[38, 39, 40, 41, 42]', 1, 0),
(16, 'Nike Jordan 1', 18999, 'Оригинальные Nike Jordan в желто-черном окрасе', 'Классический дизайн с лаконичными деталями позволяет легко интегрировать эти ботинки в любой повседневный образ - будь то деловой костюм или casual-комплект. ', '/images/sneakers_product/yellow_black/1.png', '/images/sneakers_product/yellow_black/1.png', '[37, 38, 39, 40, 41, 42]', 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(255) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`review_id`, `name`, `email`, `text`, `user_id`) VALUES
(1, '1', '1', '1', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int(255) NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_admin` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `email`, `name`, `password`, `is_admin`) VALUES
(3, 'malaka', 'malaka', 'malaka', 1),
(16, '1', '2', '1', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Индексы таблицы `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
