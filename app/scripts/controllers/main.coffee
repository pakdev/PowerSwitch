module.exports = ['$scope', '$location', 'Dialect', 'Project', ($scope, $location, Dialect, Project) ->
  $scope.inputs = {}
  $scope.dialects = Dialect.query (data) ->
    $scope.inputs.dialect = data[1]
  $scope.existingProjects = Project.query()

  $scope.create = ->
    project = new Project()
    project.name = $scope.inputs.name
    project.dialect = $scope.inputs.dialect
    project.$save ->
      $location.path("projects/#{project.id}")
]