# 硬币翻转应用 (Coin Flip App)

一个使用 React Native + Expo + TypeScript 开发的硬币翻转应用，具有流畅的 3D 动画效果和精美的 SVG 图标。

## 功能特点

- 🎮 **真实的硬币翻转体验**：模拟真实硬币的物理翻转效果
- 📱 **流畅的 3D 动画**：使用 React Native Reanimated 实现平滑的 3D 旋转动画
- 🎨 **精美的 SVG 图标**：使用用户提供的 SVG 图标作为硬币正反面
- 🎯 **随机结果生成**：每次翻转都有 50% 的概率出现正面或反面
- 📱 **跨平台兼容**：支持 iOS、Android 和 Web 平台
- 🚀 **快速启动**：使用 Expo 框架，开发和运行速度快

## 技术栈

- **前端框架**：React Native + Expo
- **开发语言**：TypeScript
- **动画库**：React Native Reanimated 3.x
- **SVG 渲染**：react-native-svg
- **构建工具**：EAS Build (Expo Application Services)

## 安装和运行

### 前置条件

- Node.js 16.x 或更高版本
- npm 或 yarn
- Expo CLI
- 对于 Android 开发：Android Studio 和 Android SDK
- 对于 iOS 开发：macOS 和 Xcode

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/lemonpacks/coin-flip.git
   cd coin-flip
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **运行开发服务器**
   ```bash
   npx expo start
   ```

4. **在设备上运行**
   - **iOS**：按 `i` 在 iOS 模拟器中运行
   - **Android**：按 `a` 在 Android 模拟器中运行
   - **Web**：按 `w` 在浏览器中运行
   - **真实设备**：使用 Expo Go 应用扫描终端中的 QR 码

## 构建方法

### 使用 EAS Build 构建

1. **登录 Expo 账户**
   ```bash
   eas login
   ```

2. **构建 Android 应用**
   ```bash
   eas build -p android --profile preview
   ```

3. **构建 iOS 应用**
   ```bash
   eas build -p ios --profile preview
   ```

### 使用 GitHub Actions 构建

项目配置了 GitHub Actions 工作流，可以自动构建 Android 应用：

1. 在 GitHub 仓库的 **Settings** > **Secrets and variables** > **Actions** 中设置以下 secrets：
   - `EXPO_USERNAME`：您的 Expo 用户名
   - `EXPO_PASSWORD`：您的 Expo 密码

2. 触发构建：
   - 推送代码到 `master` 分支
   - 或在 GitHub 仓库的 **Actions** 标签页手动触发

## 项目结构

```
coin-flip-app/
├── .github/workflows/       # GitHub Actions 工作流配置
├── android/                 # Android 原生代码（自动生成）
├── ios/                     # iOS 原生代码（自动生成）
├── assets/                  # 静态资源文件
├── .gitignore              # Git 忽略文件
├── App.tsx                  # 主应用组件
├── babel.config.js         # Babel 配置
├── eas.json                 # EAS Build 配置
├── package.json             # 项目依赖和脚本
├── tsconfig.json            # TypeScript 配置
└── README.md               # 项目说明文档
```

## 核心功能实现

### 硬币翻转动画

使用 React Native Reanimated 实现流畅的 3D 旋转动画：

- **旋转动画**：通过 `withSequence` 和 `withTiming` 实现多阶段旋转
- **上抛效果**：使用 `translateY` 实现硬币上抛再落下的效果
- **缩放效果**：通过 `scale` 实现硬币翻转时的透视缩放效果
- **正反面切换**：通过计算旋转角度控制正反面图标的显示和隐藏

### 随机结果生成

每次翻转时，使用 `Math.random()` 生成随机结果：

```typescript
const randomResult = Math.random() > 0.5;
const rotations = 5;
const targetRotation = rotations * 360 + (randomResult ? 0 : 180);
```

## 故障排除

### 常见问题

1. **依赖兼容性问题**
   - 确保使用兼容的 React 和 Reanimated 版本
   - 参考 `package.json` 中的依赖版本

2. **构建失败**
   - 确保已正确配置 EAS Build
   - 检查网络连接和 Expo 账户状态
   - 查看 GitHub Actions 日志获取详细错误信息

3. **动画不流畅**
   - 确保已正确配置 React Native Reanimated 插件
   - 检查 `babel.config.js` 中的插件配置

## 贡献指南

欢迎贡献代码和提出建议！请按照以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件

## 致谢

- [Expo](https://expo.dev/) - 提供了快速开发 React Native 应用的框架
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - 提供了流畅的动画效果
- [react-native-svg](https://github.com/react-native-svg/react-native-svg) - 用于渲染 SVG 图标

---

**享受翻转硬币的乐趣！** 🎉
