from notebook.base.handlers import IPythonHandler, utcnow
import json
from boto3 import session

class AWSConfigHandler(IPythonHandler):
    def get(self):
        response = {}

        self.set_header("Content-Type", "application/json")
        if self.request.uri == '/api/aws-config':
            aws_region = self._get_aws_region()

            response = {
             "region" : aws_region
            }
            self.write(json.dumps(response))

    def _get_aws_region(self):
        aws_session = session.Session()
        return aws_session.region_name or 'us-east-1'
