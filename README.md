# LWC-Integrates-Redux
Integrate Lightning Web Components with Redux for predictable, centralized, and flexible application state


# Usage

## Install the Command Line Interface (CLI)

1. Install the CLI from https://developer.salesforce.com/tools/sfdxcli.
1. Confirm the CLI is properly installed and on the latest version by running the following command from the command line.

```
sfdx update
```

You should see output like `sfdx-cli: Updating CLI....`


## Deploy the code to a scratch org

Checkout the source code.

```
git clone git@github.com:antonajp/LWC-Integrates-Redux.git
cd LWC-Integrates-Redux
```

If you are new to Salesforce DX, please follow the [App Development with Salesforce DX](https://trailhead.salesforce.com/content/learn/modules/sfdx_app_dev) Trailhead module.

Login to the dev hub:

```
sfdx auth:web:login
```

Create a new scratch org.

```
sfdx force:org:create -f config/project-scratch-def.json -a ReduxLWC
```

Push your local source and metadata to the scratch org.

```
sfdx force:source:push
```

Open your org.

```
sfdx force:org:open
```
