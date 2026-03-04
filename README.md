现代化的 AI 对话与开发助手 Web 应用

[功能特性](#功能特性) • [快速开始](#快速开始) • [部署指南](#部署指南) • [技术栈](#技术栈)

</div>

---

## ✨ 功能特性

### 💬 智能对话
- 基于 Claude AI 的自然语言对话
- 支持多模型切换（Anthropic Claude、Google Gemini、OpenAI GPT）
- 实时流式响应
- 对话历史管理与会话恢复
- 支持 Code、Plan、Ask 三种对话模式

### 🎯 Skills 管理
- 浏览和安装社区 AI 技能
- 自定义技能编辑器
- 支持全局技能和项目技能
- 技能市场搜索与发现

### 🎨 图片生成
- 集成多个 AI 图片生成服务
- 批量图片生成支持
- 图片画廊管理
- 图片标签与收藏
- 支持多种比例和分辨率

### ⚙️ API Providers
- 多 Provider 配置管理
- API Key 安全存储
- 环境变量检测
- 模型参数自定义

### 🔌 MCP 服务器
- Model Context Protocol 服务器管理
- 支持 stdio、SSE、HTTP 连接方式
- 环境变量配置
- 服务器状态监控

### 📊 使用统计
- Token 使用统计
- 对话历史分析
- 可视化数据展示

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.17.0
- npm 或 pnpm

### 安装

```bash
# 克隆项目
git clone https://github.com/yourusername/CodePilotWeb.git
cd CodePilotWeb

# 安装依赖
npm install

# 或使用 pnpm
pnpm install
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建

```bash
# 生产环境构建
npm run build

# 启动生产服务器
npm start
```

---

## 📦 部署指南

### 环境变量

创建 `.env.local` 文件：

```env
# 应用配置
NEXT_PUBLIC_APP_VERSION=0.1.0

# Claude API (可选，如需使用)
ANTHROPIC_API_KEY=your_api_key_here

# Google API (可选，如需使用)
GOOGLE_API_KEY=your_api_key_here

# OpenAI API (可选，如需使用)
OPENAI_API_KEY=your_api_key_here

# 图片生成服务 (可选)
GEMINI_API_KEY=your_api_key_here
```

### Docker 部署

```bash
# 构建镜像
docker build -t codepilot-web .

# 运行容器
docker run -p 3000:3000 \
  -v ~/.claude:/root/.claude \
  codepilot-web
```

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

---

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Next.js 15.1 |
| **UI** | React 19, TypeScript 5 |
| **样式** | Tailwind CSS v4, shadcn/ui |
| **AI SDK** | Anthropic Claude SDK, AI SDK |
| **数据库** | better-sqlite3 |
| **图标** | Lucide React, Hugeicons |
| **Markdown** | react-markdown, streamdown |
| **图表** | Recharts |
| **动画** | Framer Motion |

---

## 📁 项目结构

```
CodePilotWeb/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API 路由
│   │   ├── chat/           # 聊天页面
│   │   ├── skills/         # Skills 管理
│   │   ├── gallery/        # 图片画廊
│   │   ├── settings/       # 设置页面
│   │   └── mcp/            # MCP 管理
│   ├── components/         # React 组件
│   │   ├── chat/           # 聊天组件
│   │   ├── skills/         # Skills 组件
│   │   ├── gallery/        # 画廊组件
│   │   ├── settings/       # 设置组件
│   │   ├── plugins/        # 插件组件
│   │   ├── layout/         # 布局组件
│   │   └── ui/             # shadcn/ui 组件
│   ├── lib/               # 工具函数
│   ├── hooks/             # React Hooks
│   └── i18n/              # 国际化
├── public/                # 静态资源
└── package.json
```

---

## 🌐 页面导航

| 页面 | 路由 | 描述 |
|------|------|------|
| Chat | `/chat` | AI 对话界面 |
| Skills | `/skills` | 技能管理 |
| Gallery | `/gallery` | 图片画廊 |
| MCP | `/mcp` | MCP 服务器管理 |
| Settings | `/settings` | 系统设置 |

---

## 🔐 安全说明

- API Keys 存储在客户端本地配置文件（`~/.claude/config.json`）
- 敏感信息不会上传到服务器
- 建议在生产环境使用环境变量管理 API Keys

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---
