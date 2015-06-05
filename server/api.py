__author__ = 'pkurlak'

from flask.ext.restless import APIManager

import models

PREFIX = '/ps/api/v1'


def create(app):
    manager = APIManager(app, flask_sqlalchemy_db=models.db)
    manager.create_api(models.Dialect, url_prefix=PREFIX, methods=['GET'])
    manager.create_api(models.Project, url_prefix=PREFIX, methods=['GET', 'POST'])
    manager.create_api(models.Table, url_prefix=PREFIX, methods=['GET'])
    manager.create_api(models.Property, url_prefix=PREFIX, methods=['GET'])
    manager.create_api(models.PropertyType, url_prefix=PREFIX, methods=['GET'])
