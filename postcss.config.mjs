/**
 * [INPUT]: 依赖 @tailwindcss/postcss
 * [OUTPUT]: 对外提供 PostCSS 配置
 * [POS]: 项目根目录的 PostCSS 配置
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
