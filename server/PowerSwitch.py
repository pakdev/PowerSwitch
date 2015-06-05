__author__ = 'pkurlak'

import os
import tempfile

import flask
from flask.ext.sqlalchemy import SQLAlchemy

dir_temp = tempfile.gettempdir()
path_db = os.path.join(dir_temp, 'ps.db')

app = flask.Flask(__name__, static_folder='../public', static_url_path='/ps/static')
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///{}".format(path_db)
db = SQLAlchemy(app)

import api
import database

api.create(app)
database.create(db)


@app.route('/ps/')
def main():
    return flask.render_template('index.html')