import { AppBarComponent } from "./app-bar.component"

export function View(props: any) {
  return (
    <div className={props.className??''}>
      <AppBarComponent />
      {props.children}
    </div>
  );
}