# aws_glue_databrew_jupyter

A JupyterLab extension.

### Development

1. Watch the source directory in another terminal tab
* Let extension serve production assets retrieved from Cloudfront 
```
npm run watch
```
* Let extension serve local assets retrieved from webpack
```
npm run watch:local
```

2. Install this local extension to your jupyter notebook
```
jupyter labextension install <path to this package> --no-build
```

3. Run jupyterlab in watch mode in one terminal tab
```
jupyter lab --watch
```

