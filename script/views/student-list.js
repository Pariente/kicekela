var StudentListView = Backbone.View.extend ({

  el: '#app',

  events: {
    'submit form': 'addStudent',
    'change input[type="radio"]': 'seeStudent'
  },

  initialize: function() {

    this.myStudentCollection = new StudentCollection(); // we bind the collection to the view by instanciating it.
    // this.myStudentCollection.fetch();
    this.render(); // in case we have some students in a DB to be loaded on-start.

  },

  addStudent: function(event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var ffirstname = $form.find(".student-first-name").val();
    var flastname = $form.find(".student-last-name").val();
    var furl = $form.find(".student-url").val();

    // if (furl == '') {
    //   furl = 'https://s-media-cache-ak0.pinimg.com/236x/c7/da/32/c7da32a3643323629e3b110590b159de.jpg';
    // }

    var student = new StudentModel({
      firstname: ffirstname,
      lastname: flastname,
      url: furl
    });

    this.myStudentCollection.add(student);
    student.save();
    this.render();
  },

  seeStudent: function(event) {

    var $input = $(event.currentTarget);
    var inputValue = $input.val();
    var studentTitle = $input.parents('li').attr('data-title');
    var student = this.myStudentCollection.findWhere({'title': studentTitle});
    if (student) {
      if (inputValue === 'seen') {
        student.set({'seen': true});
      } else {
        student.set({'seen': false});
      }
    }
  },

  getTemplate: function(student) {

    var isSeenChecked = '';
    var isNotSeenChecked = 'checked';

    if (student.seen) {
      isSeenChecked = 'checked';
      isNotSeenChecked = '';
    }

    var studentTemplate = '\
    <li data-title="' + student.firstname + student.lastname + '">\
      <div class="studentbox-bg" style="background: url(' + student.url + ')">\
        <div class="ribbon-red">SEEN</div>\
        <div class="studentbox-title">\
          <p>' + student.firstname + ' ' + student.lastname + '</p>\
        </div>\
      </div>\
      <form>\
        <div class="inline-block">\
          <input type="radio" name="seenRadio" value="seen" '+ isSeenChecked + ' /> L&agrave;\
        </div>\
        <div class="inline-block">\
          <input type="radio" name="seenRadio" value="notseen" ' + isNotSeenChecked + '> Pal&agrave;\
        </div>\
      </form>\
    </li>';

    // It returns the string converted to HTML thanks to jQuery.
    return $(studentTemplate);
  },

  render: function() {
    // The place where we add the list. We first empty it.
    var $renderTarget = this.$('.student-list');
    $renderTarget.empty();

    this.myStudentCollection.fetch();

    // var allMyStudents = this.myStudentCollection.toJSON();

    // console.log(allMyStudents);
    // console.log(this.myStudentCollection);

    window.localStorage.getItem('StudentCollection-7db45347-5517-f0cb-10a2-b3db2ead8dd1')
    debugger;
    for (var i = 0; i < allMyStudents.length; i++) {
      var student = allMyStudents[i];

        console.log('sdkjh');
      // For every student, we get the template.
      var studentTemplate = this.getTemplate(student);
      $renderTarget.append(studentTemplate);
    }
  }
});
