module.exports = ['$resource', 'Resources', ($resource, Resources) ->
  $resource "#{Resources.SERVER}/ps/api/v1/properties/:id", id: '@id',
    query:
      method: 'GET'
      isArray: true
      transformResponse: (data) ->
        wrapped = angular.fromJson(data)
        wrapped.objects
]