# aws_glue_databrew_jupyter

A JupyterLab extension.

### Pre-reqs

You need to have the following installed:

1. Python 3, pip3
2. Jupyter
3. NodeJS

### Launching the notebook extension

run

```
bash launch-jupyter.sh
```

### Development

1. Watch the source directory in another terminal tab
* Let extension serve production assets retrieved from Cloudfront 
```
npm run watch
```

2. Install this local extension to your jupyter notebook
```
jupyter labextension install <path to this package> --no-build
```

3. Run jupyterlab in watch mode in one terminal tab
```
jupyter lab --watch
```

