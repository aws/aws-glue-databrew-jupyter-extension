#!/bin/bash
my_region=$1
echo "region is $my_region"
export PATH=/home/ec2-user/anaconda3/bin:$PATH
curl -sL https://rpm.nodesource.com/setup_15.x | sudo bash -
sudo yum install -y nodejs
pip install --upgrade jupyter
pip uninstall jupyterlab
pip install "jupyterlab>=2.2.9,<3.0.0"
pip install aws-jupyter-proxy

npm_version=`npm --version`
node_version=`node --version`
jupyter_version=`jupyter lab --version`
echo "NODE VERISON : $node_version , NPM VERSION : $npm_version and JUPYTERLAB VERSION : $jupyter_version"


CERTIFICATE_DIR="/home/ec2-user/certificate"
JUPYTER_CONFIG_DIR="/home/ec2-user/.jupyter"

if [ ! -d "$CERTIFICATE_DIR" ]; then
    mkdir $CERTIFICATE_DIR
    openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout "$CERTIFICATE_DIR/mykey.key" -out "$CERTIFICATE_DIR/mycert.pem" -batch
    chown -R ec2-user $CERTIFICATE_DIR
fi
echo "*********************Finished Writing Certificats******************"

if [ ! -d "$JUPYTER_CONFIG_DIR" ]; then
    mkdir $JUPYTER_CONFIG_DIR
fi
echo "*********************Started Writing Config File******************"
    # append notebook server settings
    cat <<EOF >> "$JUPYTER_CONFIG_DIR/jupyter_notebook_config.py"
# Set options for certfile, ip, password, and toggle off browser auto-opening
c.NotebookApp.certfile = u'$CERTIFICATE_DIR/mycert.pem'
c.NotebookApp.keyfile = u'$CERTIFICATE_DIR/mykey.key'
# Set ip to '*' to bind on all interfaces (ips) for the public server
c.NotebookApp.ip = '*'
from IPython.lib import passwd
password = passwd("databrew_demo")
c.NotebookApp.password = password
c.NotebookApp.open_browser = False

# It is a good idea to set a known, fixed port for server access
c.NotebookApp.port = 8888
EOF
    chown -R ec2-user $JUPYTER_CONFIG_DIR
echo "*********************Finished Writing Config File******************"
jupyter labextension install aws_glue_databrew_jupyter

pip install --upgrade boto3
pip install --upgrade awscli
aws configure set region $my_region
nohup jupyter notebook --config=$JUPYTER_CONFIG_DIR/jupyter_notebook_config.py &
df -h
