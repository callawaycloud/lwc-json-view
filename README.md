# LWC React-Webpack Container

Demo:

<img alt="LWC Demo" src="https://raw.githubusercontent.com/ChuckJonas/lwc-json-view/master/LWC-demo.gif">

A Lightning Web Component that utilizes React and react-json-view(https://github.com/mac-s-g/react-json-view) to display JSON text within Salesforce.

## Setup

- Install in your org
  -- https://my-domain.lightning.force.com/packaging/installPackage.apexp?p0=04t1C000000goKJQAY
- Create a LWC to implement in your org
  -- Review example implementation in https://github.com/ChuckJonas/lwc-json-view/tree/master/example/main/default for guidance

## Usage

- View and edit fields where JSON text is stored
  -- To enable edit functionality, please review the example below for passing react-json-view props

### Pass react-json-view props

- Any props in https://github.com/mac-s-g/react-json-view is supported by passing as an object to reactJsonViewProps
  -- Lightning Web Component example:
  --- LWC html file

  ```html
  <c-json-react-container
    json-text="{jsontext}"
    react-json-view-props="{reactJsonViewProps}"
  ></c-json-react-container>
  ```

  --- LWC js file

  ```javascript
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
  ```

  -- Classic example:
  --- Utilizes the LWC above an uses a Visualforce Page to render the component
  --- Visualforce Page example:

  ```html
  <apex:page standardController="Account">
    <apex:includeLightning />
    <div id="container"> </div>

    <script>
      $Lightning.use("c:JsonViewApp", function () { $Lightning.createComponent(
      "c:jsonViewerExample", { recordId: '{!Account.Id}' }, "container",
      function (cmp) { console.log('component created'); }); });
    </script>
  </apex:page>
  ```

## Demo (put install instructions for the example)

- Install https://my-domain.lightning.force.com/packaging/installPackage.apexp?p0=04t1C000000goKJQAY in your org
- clone https://github.com/ChuckJonas/lwc-json-view and deploy the example directory to your org
- `sfdx force:org:open`

- For Lightning:

1. Assign AccountJSONViewRecordPage as the Lightning Record Page for the Account object
2. Give users edit access to JSON Test field on Account
3. Go to any Account and go to the JSON Test component to update the JSON Test field

- For Classic:

1. Give users access to Visualforce Page JsonViewPage
2. Assign JSON View Account Layout as the Account page layout
3. Go to any Account and go to the JsonViewPage Visualforce Page section to update the JSON Test field

## Contributing

- https://github.com/ChuckJonas/lwc-json-view

### Release Update

- Create version

1. Update `versionName` & `versionNumber` in `sfdx-project.json`
2. run `sfdx force:package:version:create -p lwc-json-view -d force-app -x --wait 10 -v ccc-prod`

- "promote" Version

1. Get `04txxxxxx` version from previous step
2. `sfdx force:package:version:promote -p 04txxxxxx`

- Update install instructions in readme

- Add release on github
