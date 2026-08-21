import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',

  brandTitle: 'Design System',
  brandUrl: '.',
  brandTarget: '_self',

  fontBase: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
  fontCode: '"SF Mono", "Fira Code", Consolas, monospace',

  colorPrimary: '#c70036',
  colorSecondary: '#c70036',

  // UI
  appBg: '#efeceb',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e8e4e3',
  appBorderRadius: 10,

  // Text
  textColor: '#0c0a09',
  textInverseColor: '#ffffff',
  textMutedColor: '#7c6d67',

  // Toolbar
  barTextColor: '#7c6d67',
  barHoverColor: '#c70036',
  barSelectedColor: '#c70036',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e8e4e3',
  inputTextColor: '#0c0a09',
  inputBorderRadius: 8,

  buttonBg: '#f3f1f1',
  buttonBorder: '#e8e4e3',
  booleanBg: '#f3f1f1',
  booleanSelectedBg: '#ffffff',
});

addons.setConfig({
  theme,
});
