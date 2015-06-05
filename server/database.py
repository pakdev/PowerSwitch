__author__ = 'pkurlak'

import models


def create(db):
    db.drop_all()
    db.create_all()

    supported_dialects = [
        models.Dialect(name='Firebird'),
        models.Dialect(name='Microsoft SQL Server'),
        models.Dialect(name='MySQL'),
        models.Dialect(name='Oracle'),
        models.Dialect(name='PostgreSQL'),
        models.Dialect(name='SQLite'),
        models.Dialect(name='Sybase')
    ]

    supported_types = [
        models.PropertyType(name='Boolean'),
        models.PropertyType(name='Number'),
        models.PropertyType(name='String'),
        models.PropertyType(name='DateTime'),
        models.PropertyType(name='Date'),
    ]

    for type in supported_types:
        db.session.add(type)
        db.session.commit()

    add_entities(db, supported_dialects)
    add_entities(db, supported_types)


def add_entities(db, entities):
    for entity in entities:
        db.session.add(entity)
        db.session.commit()