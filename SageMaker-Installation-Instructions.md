### Ensuring permissions for your SageMaker role

Make sure to add the correct permissions to the role your SageMaker notebook runs with. A good place to start is by adding the 'AwsGlueDataBrewFullAccessPolicy' managed policy to the role, and then adding inline permissions allowing s3:GetObject and s3:PutObject for the bucket in which you would like to operate.

### Installing the plugin

1. Install dependencies

```
pip install aws-jupyter-proxy;
```

1. Install the extension and build Jupyter assets

```
jupyter labextension install aws_glue_databrew_jupyter;
jupyter lab build;
```

1. Restart the Jupyter server

```
sudo initctl restart jupyter-server --no-wait;
```
