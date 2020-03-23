import * as React from "react";
import { Card, Button } from "@salesforce/design-system-react";
import ReactJson from "react-json-view";
// use the component in your app!
export interface JSONViewerProps {
  jsonText: any;
  reactJsonViewProps: any;
}
export const JSONViewer = (props: JSONViewerProps) => {
  if (!props.jsonText) {
    return <Card hasNoHeader={true}>&nbsp;</Card>;
  }

  console.log(props.reactJsonViewProps);
  return (
    <Card hasNoHeader={true} bodyClassName="slds-p-horizontal_large">
      <ReactJson
        src={JSON.parse(props.jsonText)}
        {...props.reactJsonViewProps}
      />
    </Card>
  );
};
