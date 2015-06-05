__author__ = 'pkurlak'

from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship

from PowerSwitch import db


class Dialect(db.Model):
    __tablename__ = 'dialects'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)


class Project(db.Model):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    dialect = relationship('Dialect', backref='projects')

    dialect_id = Column(Integer, ForeignKey('dialects.id'), nullable=False)


class Table(db.Model):
    __tablename__ = 'tables'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    project = relationship('Project', backref='tables')

    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False)


class Property(db.Model):
    __tablename__ = 'properties'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    required = Column(Boolean, nullable=False)
    type = relationship('PropertyType', backref='properties')
    table = relationship('Table', backref='properties')

    type_id = Column(Integer, ForeignKey('property_types.id'), nullable=False)
    table_id = Column(Integer, ForeignKey('tables.id'), nullable=False)


class PropertyType(db.Model):
    __tablename__ = 'property_types'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)


class PropertyValidation(db.Model):
    __tablename__ = 'property_validations'
    id = Column(Integer, primary_key=True)
    property = relationship('Property', backref='validations')

    property_id = Column(Integer, ForeignKey('properties.id'), nullable=False)
