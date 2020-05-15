-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2020-05-15 09:11:47
-- 服务器版本： 5.7.18-log
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `job_demo`
--

-- --------------------------------------------------------

--
-- 表的结构 `sys_dict`
--

CREATE TABLE `sys_dict` (
  `id` bigint(20) NOT NULL,
  `dict_name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `sys_dict`
--

INSERT INTO `sys_dict` (`id`, `dict_name`, `type`, `status`) VALUES
(1, '显示隐藏', 'sys_show_hide', 1),
(2, '是否', 'sys_yes_no', 1),
(4, '菜单类型', 'sys_menu_type', 1),
(5, '请求类型', 'sys_http_method', 1);

-- --------------------------------------------------------

--
-- 表的结构 `sys_dict_data`
--

CREATE TABLE `sys_dict_data` (
  `id` bigint(20) NOT NULL,
  `dict_sort` int(11) NOT NULL DEFAULT '10',
  `dict_value` varchar(50) NOT NULL,
  `dict_label` varchar(50) NOT NULL,
  `list_class` varchar(50) NOT NULL DEFAULT 'primary',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `dict_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `sys_dict_data`
--

INSERT INTO `sys_dict_data` (`id`, `dict_sort`, `dict_value`, `dict_label`, `list_class`, `status`, `dict_type`) VALUES
(1, 10, '1', '显示', 'primary', 1, 'sys_show_hide'),
(2, 10, '2', '隐藏', 'pirimary', 1, 'sys_show_hide'),
(3, 10, '1', '是', 'primary', 1, 'sys_yes_no'),
(4, 10, '2', '否', 'primary', 1, 'sys_yes_no'),
(5, 10, '1', '菜单', 'primary', 1, 'sys_menu_type'),
(6, 10, '2', '页面', 'danger', 1, 'sys_menu_type'),
(7, 10, '3', '按钮', 'success', 1, 'sys_menu_type'),
(8, 10, '4', '接口', 'warning', 1, 'sys_menu_type'),
(9, 10, '1', 'GET', 'primary', 1, 'sys_http_method'),
(10, 10, '2', 'POST', 'primary', 1, 'sys_http_method'),
(11, 10, '3', 'PUT', 'primary', 1, 'sys_http_method'),
(12, 10, '4', 'DELETE', 'primary', 1, 'sys_http_method');

-- --------------------------------------------------------

--
-- 表的结构 `sys_menu`
--

CREATE TABLE `sys_menu` (
  `id` bigint(20) NOT NULL,
  `menu_name` varchar(50) NOT NULL,
  `parent_id` bigint(20) UNSIGNED NOT NULL,
  `menu_order` int(10) UNSIGNED NOT NULL,
  `menu_type` tinyint(3) UNSIGNED NOT NULL,
  `is_hidden` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `menu_key` varchar(100) DEFAULT NULL,
  `menu_url` varchar(200) DEFAULT NULL,
  `http_method` tinyint(3) UNSIGNED NOT NULL DEFAULT '1',
  `menu_icon` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `sys_menu`
--

INSERT INTO `sys_menu` (`id`, `menu_name`, `parent_id`, `menu_order`, `menu_type`, `is_hidden`, `menu_key`, `menu_url`, `http_method`, `menu_icon`) VALUES
(1, '系统管理', 0, 10, 1, 0, '', '', 1, 'menu'),
(2, '菜单管理', 1, 20, 2, 0, 'system/menu/MenuList', 'system/menu', 1, 'file'),
(3, '角色管理', 1, 30, 2, 0, 'system/role/RoleList', 'system/role', 1, 'file'),
(4, '用户管理', 1, 40, 2, 0, 'system/user/UserList', 'system/user', 1, 'file'),
(5, '新增', 1, 1, 3, 0, 'system:menu:add', ' ', 1, 'file'),
(6, '查询', 1, 1, 3, 0, 'system:menu:search', ' ', 1, 'file'),
(7, '字典管理', 1, 40, 2, 0, 'system/dict/DictList', 'system/dict', 1, 'file'),
(8, '分配角色', 1, 40, 2, 1, 'system/role/RelatedUser', 'system/role/relatedUser/:roleId', 1, 'file'),
(9, '字典数据', 1, 40, 2, 1, 'system/dict/DictData', 'system/dictData', 1, 'file');

-- --------------------------------------------------------

--
-- 表的结构 `sys_role`
--

CREATE TABLE `sys_role` (
  `id` bigint(20) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `role_key` varchar(100) NOT NULL,
  `status` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `sys_role`
--

INSERT INTO `sys_role` (`id`, `role_name`, `role_key`, `status`) VALUES
(1, '管理员', 'system', 1);

-- --------------------------------------------------------

--
-- 表的结构 `sys_role_menu`
--

CREATE TABLE `sys_role_menu` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `menu_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `sys_role_menu`
--

INSERT INTO `sys_role_menu` (`id`, `menu_id`, `role_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1);

-- --------------------------------------------------------

--
-- 表的结构 `sys_user`
--

CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL,
  `login_name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nick_name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `sys_user`
--

INSERT INTO `sys_user` (`id`, `login_name`, `password`, `nick_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'admin', '2020-05-06 02:34:08', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `sys_user_role`
--

CREATE TABLE `sys_user_role` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `sys_user_role`
--

INSERT INTO `sys_user_role` (`id`, `user_id`, `role_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `nick_name` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sys_dict`
--
ALTER TABLE `sys_dict`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_dict_data`
--
ALTER TABLE `sys_dict_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_menu`
--
ALTER TABLE `sys_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_role`
--
ALTER TABLE `sys_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_role_menu`
--
ALTER TABLE `sys_role_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_user`
--
ALTER TABLE `sys_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uni_login_name` (`login_name`);

--
-- Indexes for table `sys_user_role`
--
ALTER TABLE `sys_user_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uni_phone` (`phone`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `sys_dict`
--
ALTER TABLE `sys_dict`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `sys_dict_data`
--
ALTER TABLE `sys_dict_data`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用表AUTO_INCREMENT `sys_menu`
--
ALTER TABLE `sys_menu`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `sys_role`
--
ALTER TABLE `sys_role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `sys_role_menu`
--
ALTER TABLE `sys_role_menu`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `sys_user`
--
ALTER TABLE `sys_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `sys_user_role`
--
ALTER TABLE `sys_user_role`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
