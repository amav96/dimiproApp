
import { theme } from 'antd';
export const useTheme = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return {
    colorBgContainer
  }
}
