var StudentCollection = Backbone.Collection.extend({
  model: StudentModel,
  localStorage: new Backbone.LocalStorage("StudentCollection")
});
