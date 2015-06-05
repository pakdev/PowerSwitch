module.exports = ['$scope', '$routeParams', 'Type', 'Table', 'Property', ($scope, $routeParams, Type, Table, Property) ->
  class PropertyRow
    constructor: (@name = '', @required = false, @type = null, @isLast = true) ->
      @types = Type.query()

  Property.query (existingProperties) ->
    $scope.propertyRows = []
    for existingProperty in existingProperties
      $scope.propertyRows.push(new PropertyRow(existingProperty.name,
        existingProperty.required,
        existingProperty.type))

    $scope.propertyRows.push(new PropertyRow)

  if $routeParams['id']?
    $scope.table = Table.get(id: $routeParams['id'])

  $scope.removeProperty = (index) ->
    if not $scope.propertyRows[index].isLast
      $scope.propertyRows.splice(index, 1)
      $scope.propertyRows[index].isLast = true

  $scope.propertyNameChanged = (propertyRow) ->
    if propertyRow.name.trim().length > 0
      if propertyRow.isLast
        propertyRow.isLast = false
        $scope.propertyRows.push(new PropertyRow)
    else
      $scope.propertyRows.splice($scope.propertyRows.length - 1, 1)
      propertyRow.isLast = true
]