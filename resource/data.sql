/*
Navicat MySQL Data Transfer

Source Server         : 641
Source Server Version : 50726
Source Host           : 192.168.0.64:23306
Source Database       : vote

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2022-07-17 18:29:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除日期',
  `name` varchar(63) NOT NULL COMMENT '姓名',
  `user_type` varchar(63) NOT NULL COMMENT '用户类型',
  `passport_number` varchar(31) NOT NULL COMMENT '身份证号码',
  `email` varchar(63) NOT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;



INSERT INTO `vote`.`user` (`id`, `created_at`, `updated_at`, `delete_at`, `name`, `user_type`, `passport_number`, `email`) VALUES ('1', '2022-07-17 10:28:46.065772', '2022-07-17 10:28:46.065772', NULL, 'admin', 'admin', 'A123456(7)', 'abcd@gmail.com');
