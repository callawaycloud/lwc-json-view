import { LightningElement, wire, api, track } from "lwc";
import { getRecord, updateRecord } from "lightning/uiRecordApi";
const FIELDS = ["Account.Id", "Account.JSON_Test__c"];
import JSON_TEST_FIELD from "@salesforce/schema/Account.JSON_Test__c";
import ID_FIELD from "@salesforce/schema/Account.Id";

export default class JsonViewerExample extends LightningElement {
  @api recordId;
  @track account;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [JSON_TEST_FIELD, ID_FIELD]
  })
  wiredAccount({ error, data }) {
    if (data) {
      this.record = data;
      this.account = data;
      this.error = undefined;

      this.jsontext = this.record.fields.JSON_Test__c.value;

      if (!this.jsontext) {
        this.jsontext = "{}";
      }
    } else if (error) {
      this.error = error;
      this.record = undefined;
    }
  }

  @api
  jsontext;

  reactJsonViewProps = {
    name: false,
    displayDataTypes: false,
    onEdit: edit => {
      this.editJson(edit);
    },
    onAdd: edit => {
      this.editJson(edit);
    },
    onDelete: edit => {
      this.editJson(edit);
    }
  };

  editJson(edit) {
    const fields = {};
    fields[JSON_TEST_FIELD.fieldApiName] = JSON.stringify(edit.updated_src);
    fields[ID_FIELD.fieldApiName] = this.recordId;

    const recordInput = { fields };

    updateRecord(recordInput)
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
    this.jsontext = JSON.stringify(edit.updated_src);
  }
}
