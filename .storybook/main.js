/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@api": "/api",
        "@api/*": "/api/*",
        "@components": "/components",
        "@components/*": "/components/*",
        "@config": "/config",
        "@pages/*": "/pages/*",
        "@assets/*": "public/assets/*",
        "@routes": "/routes",
        "@routes/*": "/routes/*",
        "@store": "/routes",
        "@store/*": "/store/*",
        "@actions": "/store/actions",
        "@reducers": "/store/reducers",
        "@utils": "/utils",
        "@icons": "/icons"
      };
    }
    return config;
  },
};
export default config;
