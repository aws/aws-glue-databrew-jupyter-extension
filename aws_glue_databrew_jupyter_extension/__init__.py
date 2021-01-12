from .aws_config_handler import AWSConfigHandler

def _jupyter_server_extension_paths():
    return [{"module": "aws_glue_databrew_jupyter_extension"}]


def _jupyter_nbextension_paths():
    return []


def load_jupyter_server_extension(nb_server_app):
    web_app = nb_server_app.web_app
    host_pattern = '.*$'
    web_app.add_handlers(host_pattern, [
        ('/api/aws-config', AWSConfigHandler),
    ])
