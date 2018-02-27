function getNotes() {
  $('#notes').empty();

  $.get('/api/notes')
    .then(function(data) {
      for ( var i = 0; i < data.length; i++ ) {
        $('#notes').append(
          '<div class="note">' + 
            '<h3>' + data[i].title + '</h3>' +
            '<p>' + data[i].details + '</p>' +
          '</div>'
        );
      }
    });
}

function createNote(event) {
  event.preventDefault();

  var title = $('#title').val().trim();
  var details = $('#details').val().trim();

  $.post('/api/notes', {
    title: title,
    details: details
  }).then(getNotes);

  $('form input, form textarea').val('');
}


$('#submit').on('click', createNote);
getNotes();