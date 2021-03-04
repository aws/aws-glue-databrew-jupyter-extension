# aws_glue_databrew_jupyter

This is an extension for Jupyter Lab that allows you to manage your AWS Glue Databrew resources in-context of your existing Jupyter workflows. 

### Prerequisites

1. boto3 version 1.16.17 or greater
1. botocore version 1.19.17 or greater
1. configure the aws cli. https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
1. jupyter lab version 1.2 or 2.x

### Installation instructions for Jupyter Lab

1. run `pip install aws-jupyter-proxy`
1. run `jupyter serverextension enable --py aws_jupyter_proxy`
1. Search for aws_glue_databrew_jupyter in the Jupyter Lab plugin store and click install

### Command-line installation instructions
1. run `jupyter labextension install aws_glue_databrew_jupyter`
1. Start jupyter lab: `jupyter lab`


### Build and install instructions
1. Install npm dependencies: `npm install`
1. Build the extension: `npm run build`
1. Install python dependencies: `pip install ./`
1. Install the extension: `jupyter labextension install ./`
1. Build jupyter lab assets: `jupyter lab build`
1. Start jupyter lab in debug mode: `jupyter lab --debug`

### Publishing new versions
1. Update the version and push via https://docs.npmjs.com/updating-your-published-package-version-number
1. tag the commit with a new version tag

