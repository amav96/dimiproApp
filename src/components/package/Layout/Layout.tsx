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
    <div className={`c-m-4 ${customClass}`}>
      <div className="c-my-2">
        <h1 className={`c-text-2xl ${textColor}`}>{title}</h1>
      </div>
      {children}
    </div>
  );
}
