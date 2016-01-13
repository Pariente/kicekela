var StudentListView = Backbone.View.extend ({

  el: '#app',

  events: {
    'submit form': 'addStudent',
    'change input[type="radio"]': 'seeStudent'
  },

  initialize: function() {

    this.myStudentCollection = new StudentCollection(); // we bind the collection to the view by instanciating it.
    this.myStudentCollection.fetch();
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
    var student = this.myStudentCollection.findWhere({'lastname': studentTitle});
    console.log(student);
    if (student) {
      if (inputValue === 'seen') {
        student.set({'seen': true});
      } else {
        student.set({'seen': false});
      }
    }
    student.save();
    this.render();
  },

  getTemplate: function(student) {

    var isSeenChecked = '';
    var isNotSeenChecked = 'checked';

    if (student.seen) {
      isSeenChecked = 'checked';
      isNotSeenChecked = '';
      var studentTemplate = '\
      <li data-title="' + student.lastname + '">\
        <div class="studentbox-bg" style="background: url(' + student.url + ')">\
          <div class="ribbon-green">L&Agrave;</div>\
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
    } else {
      var studentTemplate = '\
      <li data-title="' + student.lastname + '">\
        <div class="studentbox-bg" style="background: url(' + student.url + ')">\
          <div class="ribbon-red">PAL&Agrave;</div>\
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
    }

    // It returns the string converted to HTML thanks to jQuery.
    return $(studentTemplate);
  },

  render: function() {
    // The place where we add the list. We first empty it.
    var $renderTarget = this.$('.student-list');
    $renderTarget.empty();

    var allMyStudents = this.myStudentCollection.toJSON();
    var totalStudents = allMyStudents.length;
    var seenStudents = 0;

    for (var i = 0; i < allMyStudents.length; i++) {
      var student = allMyStudents[i];
      if (student.seen) {
        seenStudents++;
      }
      // For every student, we get the template.
      var studentTemplate = this.getTemplate(student);
      $renderTarget.append(studentTemplate);
    }
    $('.student-total').html(totalStudents);
    $('.student-seen').html(seenStudents);
    $('.student-notseen').html(totalStudents - seenStudents);
  }
});
