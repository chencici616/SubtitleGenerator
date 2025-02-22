# 字幕生成器 V0.1

## 项目简介
字幕生成器是一个简单易用的网页工具，可以帮助用户快速为图片添加字幕。无论是制作表情包、制作教程还是为图片添加说明文字，都能轻松完成。

## 功能特点

### 1. 图片上传与预览
- 支持本地图片上传
- 实时预览上传的图片
- 支持常见图片格式（JPG、PNG等）

### 2. 字幕样式自定义
- 字体大小调节（12-100px）
- 字体颜色选择（支持任意颜色）
- 字体样式选择
  - 微软雅黑
  - 黑体
  - 楷体
  - 宋体

### 3. 多行字幕支持
- 支持输入多行字幕文本
- 自动为每行字幕添加半透明背景
- 智能排版，确保字幕清晰可见

### 4. 图片导出
- 一键生成带字幕的图片
- 自动添加时间戳，方便管理
- 导出文件命名格式：原文件名_字幕_日期_时间.jpg

## 使用说明

1. **上传图片**
   - 点击"上传图片"按钮选择本地图片
   - 图片上传后会立即显示预览

2. **设置字幕样式**
   - 调整字体大小（默认30px）
   - 选择字体颜色（默认白色）
   - 选择字体样式（默认微软雅黑）

3. **输入字幕内容**
   - 在文本框中输入字幕内容
   - 每行一句话，支持多行输入

4. **生成和下载**
   - 点击"生成字幕"按钮预览效果
   - 点击"图片下载"按钮保存结果

## 技术特点
- 纯前端实现，无需后端服务
- 响应式设计，适配各种屏幕尺寸
- 使用Canvas技术处理图片
- 本地处理，保护用户隐私

## 版本信息
- 当前版本：V0.1
- 发布日期：2024年2月

## 注意事项
1. 建议上传清晰度较高的图片以获得最佳效果
2. 字幕长度请适中，过长可能影响显示效果
3. 建议使用现代浏览器（Chrome、Firefox、Edge等）访问使用

## 安装和运行

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/SubtitleGenerator.git
   cd SubtitleGenerator
   ```

2. **运行项目**
   - 使用任意HTTP服务器运行项目，例如：
     ```bash
     # 使用Python的HTTP服务器
     python -m http.server 8080
     # 或使用Node.js的http-server
     npx http-server . --port 8080
     ```
   - 在浏览器中访问 `http://localhost:8080`

## 贡献指南

欢迎为字幕生成器项目做出贡献！以下是一些贡献的方式：

1. Fork本项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 问题反馈

如果您发现任何问题或有改进建议，欢迎：

1. 在GitHub Issues中提出问题
2. 提交Pull Request来修复问题或添加功能
3. 通过GitHub Discussions讨论新功能想法

## 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情