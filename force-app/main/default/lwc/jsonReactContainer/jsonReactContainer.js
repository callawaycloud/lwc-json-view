/* global moment */
import { LightningElement, wire, api, track } from "lwc";
import { loadScript } from "lightning/platformResourceLoader";
import App from "@salesforce/resourceUrl/app";

export default class JsonReactContainer extends LightningElement {
  @api jsonText;
  @api reactJsonViewProps;

  renderedCallback() {
    Promise.all([loadScript(this, App)]).then(() => {
      mount(this.template.querySelector("div"), {
        jsonText: this.jsonText,
        reactJsonViewProps: this.reactJsonViewProps
      });
    });
  }
}
