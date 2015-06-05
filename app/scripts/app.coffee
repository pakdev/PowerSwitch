app = angular.module 'powerApp', [
  'ngRoute'
  'powerApp.services'
  'pretty-checkable'
  'ui.bootstrap'
]

MainController = require('./controllers/main.coffee')
TableController = require('./controllers/table.coffee')
ProjectController = require('./controllers/project.coffee')

services = angular.module 'powerApp.services', ['ngResource']
services.factory 'Type', require('./services/types.coffee')
services.factory 'Table', require('./services/tables.coffee')
services.factory 'Dialect', require('./services/dialects.coffee')
services.factory 'Project', require('./services/projects.coffee')
services.factory 'Property', require('./services/properties.coffee')

app.constant 'Resources', (->
  location = 'http://127.0.0.1:5000'
  return {
    SERVER: location
  }
)()

app.config ['$routeProvider', ($routeProvider) ->
  $routeProvider
    .when '/',
      templateUrl: '/ps/static/partials/main.html'
      controller: MainController
    .when '/projects/:id',
      templateUrl: '/ps/static/partials/project.html'
      controller: ProjectController
    .when '/tables/:id',
      templateUrl: '/ps/static/partials/table.html'
      controller: TableController
]