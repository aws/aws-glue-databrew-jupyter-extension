import setuptools


setuptools.setup(
    name='aws_glue_databrew_jupyter_extension',
    version='1.0.0',
    packages=setuptools.find_packages(),
    install_requires=[
        'aws-jupyter-proxy',
        'notebook'
    ],
    include_package_data=True,
    data_files=[
        (
            "etc/jupyter/jupyter_notebook_config.d",
            ["aws_glue_databrew_jupyter_extension/etc/aws_glue_databrew_jupyter_extension.json"],
        )
    ],
)
