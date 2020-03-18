import * as React from "react";
import * as ReactDOM from "react-dom";

import { JSONViewer, JSONViewerProps } from "./components/JSONViewer";

(window as any).mount = (el: any, injected: JSONViewerProps) => {
  console.log(injected);

  ReactDOM.render(<JSONViewer {...injected} />, el);
};
