# aws_glue_databrew_jupyter

This is an extension for Jupyter Lab that allows you to manage your AWS Glue Databrew resources in-context of your existing Jupyter workflows. 

### Prerequisites

1. boto3 version 1.16.17 or greater
2. botocore version 1.19.17 or greater
3. configure the aws cli. https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
4. Jupyter version 2.0 or greater

### Installation instructions for Jupyter Lab

1. run `pip install aws-jupyter-proxy`
2. Search for aws_glue_databrew_jupyter in the Jupyter Lab plugin store and click install

### Installation instructions for Amazon SageMaker Notebooks

See https://github.com/aws/aws-glue-databrew-jupyter-extension/blob/main/SageMaker-Installation-Instructions.md

### Command-line installation instructions
1. run `jupyter labextension install aws_glue_databrew_jupyter`
2. Start jupyter lab: `jupyter lab`


### Build and install instructions
1. Install npm dependencies: `npm i typescript --global; npm i rimraf --global; npm i;`
2. Build the extension: `npm run:build;`
3. Install python dependencies: `pip install ./`
4. Install the extension: `jupyter labextension install ./`
5. Build jupyter lab assets: `jupyter lab build`
5. Start jupyter lab in debug mode: `jupyter lab --debug`

### Publishing new versions
1. Update the version and push via https://docs.npmjs.com/updating-your-published-package-version-number
2. tag the commit with a new version tag

