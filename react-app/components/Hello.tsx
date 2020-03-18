import * as React from "react";
import { Card, Button } from "@salesforce/design-system-react";
import ReactJson from "react-json-view";
// use the component in your app!
export interface HelloProps {
  contacts: any[];
  error: string;
  jsonText: any;
}
export const Hello = (props: HelloProps) => {
  console.log(props.jsonText);
  if (props.error) {
    return <div>{props.error}</div>;
  }
  let contactDivs = props.contacts
    ? props.contacts.map(c => (
        <div>
          <a href={`/${c.Id}`}>{c.Name}</a>
        </div>
      ))
    : null;
  return (
    <Card
      heading="I am a react component"
      bodyClassName="slds-p-horizontal_small"
    >
      <h1>These are the contacts you passed into me:</h1>
      {contactDivs}
      <Button label="Hello Button" />
      <ReactJson src={JSON.parse(props.jsonText)} />
    </Card>
  );
};
