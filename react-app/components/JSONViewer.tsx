import * as React from "react";
import { Card, Button } from "@salesforce/design-system-react";
import ReactJson from "react-json-view";
// use the component in your app!
export interface JSONViewerProps {
  //error: string;
  jsonText: any;
}
export const JSONViewer = (props: JSONViewerProps) => {
  /*if (props.error) {
    return <div>{props.error}</div>;
  } else */ if (
    !props.jsonText
  ) {
    return <Card hasNoHeader={true}>&nbsp;</Card>;
  }
  return (
    <Card hasNoHeader={true} bodyClassName="slds-p-horizontal_large">
      <ReactJson src={JSON.parse(props.jsonText)} />
    </Card>
  );
};
