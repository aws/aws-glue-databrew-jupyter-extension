1. Uninstall extensions that prevent us from upgrading the Jupyter environment
```
jupyter labextension uninstall @jupyterlab/celltags;
jupyter labextension uninstall @jupyterlab/git;
jupyter labextension uninstall @jupyterlab/toc;
```
2. Upgrade Jupyter
```
conda install --yes -c conda-forge jupyterlab;
```
3. Install dependencies
```
pip install awscli -U;
pip install botocore -U;
pip install aws-jupyter-proxy;
```

4. Install the extension and build Jupyter assets

```
jupyter labextension install aws_glue_databrew_jupyter;
jupyter lab build;
```

5. Restart the Jupyter server
```
sudo initctl restart jupyter-server --no-wait;
```
