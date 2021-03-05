### Ensuring permissions for your SageMaker execution role

Make sure to add the correct permissions to the role your SageMaker Studio runs with. A good place to start is by:

* Adding the `AwsGlueDataBrewFullAccessPolicy` managed policy to your SageMaker execution role, and;

* Creating `AwsGlueDataBrewSpecificS3BucketPolicy` customer managed policy with `s3:GetObject` and `s3:PutObject` permissions for the bucket/s in which you would like to operate and adding this policy to your SageMaker execution role. Refer to [IAM policy for S3](https://docs.aws.amazon.com/databrew/latest/dg/iam-policy-to-use-s3-for-data-resource-role.html) documentation for more details.

This grants baseline permissions to use AWS Glue DataBrew console features. Refer to DataBrew developer guide on [Setting up IAM permissions](https://docs.aws.amazon.com/databrew/latest/dg/setting-up-iam.html) for a comprehensive guide on permissions setup.

### Installing the plugin

1. Install/upgrade dependencies

Once SageMaker Studio has started, open system terminal under Launcher tab. Amazon SageMaker Studio, as of writing, comes installed with aws_jupyter_proxy v0.1.0. Upgrade aws_jupyter_proxy to v0.3.1 or later and ensure you have a compatible version.

After installation, enable the aws_jupyter_proxy as jupyter server extension.

```
# upgrade to latest
pip install --upgrade aws-jupyter-proxy

# verify version
pip show aws_jupyter_proxy

# enable server extension
jupyter serverextension enable --py aws_jupyter_proxy
```

2. Install the extension and build Jupyter assets

Download and install the latest version of DataBrew JupyterLab extension, and build Jupyter assets.

```
jupyter labextension install aws_glue_databrew_jupyter --minimize=False
```

3. Restart the Jupyter server

When installing server extensions, like aws_jupyter_proxy, Jupyter server needs to be restarted to run the newly installed server extension.

```
nohup supervisorctl -c /etc/supervisor/conf.d/supervisord.conf restart jupyterlabserver
```

4. Restart browser

After running the command above, terminal will automatically close and move you to the Launcher tab. Hard refresh the page to relaunch JupyterLab assets.

5. Launch DataBrew extension
