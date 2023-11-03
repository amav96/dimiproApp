import './Layout.scss'

interface LayoutProps {
  title?: string;
  textColor?: string;
  customClass?: string;
  children?: JSX.Element | JSX.Element[];
}

export function Layout(props: LayoutProps) {
  const {
    title = "Dashboard",
    textColor = "c-text-layout",
    customClass = "",
    children,
  } = props;

  return (
    <div className={`m-4 ${customClass}`}>
      <div className="my-4">
        <h1 className={`text-2xl ${textColor}`}>{title}</h1>
      </div>
      {children}
    </div>
  );
}
