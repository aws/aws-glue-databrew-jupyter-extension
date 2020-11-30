#!/bin/bash

jpyter labextension uninstall @jupyterlab/celltags
jupyter labextension uninstall @jupyterlab/git
jupyter labextension uninstall @jupyterlab/toc
#Upgrade Jupyter, install the plugin, and restart the notebook server by running
conda install --yes -c conda-forge jupyterlab;
pip install awscli -U;
pip install botocore -U;
pip install aws-jupyter-proxy;
jupyter labextension install aws_glue_databrew_jupyter;
jupyter lab build;
sudo initctl restart jupyter-server --no-wait;
