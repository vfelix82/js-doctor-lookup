import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $('#button').click(function() {
    let doctorName = $('#doctorName').val();

    $.ajax({
      url: `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.exports.apiKey}&location=47.608465,-122.337752,100&name=${doctorName}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('#doctor').text("Search results for: " + doctorName);

        if (response.data.count != 0) {
          for(let i = 0; i <= response.data.length; i++){
            $('#result').append(
              "<strong>First Name: </strong>" + response.data[i].profile.first_name + "<br>" +
              "<strong>Last Name: </strong>" + response.data[i].profile.last_name + "<br>" +
              "<strong>Address: </strong>" + response.data[i].practices[0].visit_address.street + " " +
             response.data[i].practices[0].visit_address.city + " " +
             response.data[i].practices[0].visit_address.state + " " +
             response.data[i].practices[0].visit_address.zip + "<br>" +
             "<strong>Phone: </strong>" + response.data[i].practices[0].phones[0].number + "<br>" +
             "<strong>Website: </strong> " + response.data[i].practices[0].website + "<br>" +
             "<strong>Accepting New Patients: </strong> " + response.data[i].practices[0].accepts_new_patients +"<hr>");
          }
        } else {
          $("#result").text("No doctors match that criteria. Try again!");
        }
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.");
      }
    });
  });
});


  $('#button2').click(function(){
    let medicalIssue = $('#medicalIssue').val();

    $.ajax({
      url: `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.exports.apiKey}&location=47.608465,-122.337752,100&query=${medicalIssue}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(issueResponse){
        $('#issueName').text("Search results for: " + medicalIssue);
        if(issueResponse.data.count != 0){
          for(let i = 0; i <= issueResponse.data.length; i++){
            $('#medicalResult').append(
              "<strong>First Name: </strong>" + issueResponse.data[i].profile.first_name + "<br>" +
              "<strong>Last Name: </strong>" + issueResponse.data[i].profile.last_name + "<br>" +
              "<strong>Phone: </strong>" + issueResponse.data[i].practices[0].phones[0].number + "<br>" +
              "<strong>Accepting New Patients: </strong>" + issueResponse.data[i].practices[0].accepts_new_patients + "<hr>");
          }
        } else {
            $("#medicalResult").text("No conditions match that criteria. Try again!");
        }
      },
      error: function() {
        $('#medicalErrors').text("There was an error processing your request. Please try again.");
      }
    });
  });
