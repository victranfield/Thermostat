
$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();
  function displayWeather(city) {
   var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
   var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
   var units = '&units=metric';
   $.get(url + token + units, function(data) {
     $('#current-temperature').text(data.main.temp);
   })
  })
})
})
})

$('#temperature-up').on('click', function() { // event listener
  thermostat.up(); // update model
  $('#temperature').text(thermostat.temperature); // update view
})

$('#temperature-down').click(function() { // this is an alternate version of .on('click'), with a sprinkle of jQuery syntactic sugar
  thermostat.down();
  $('#temperature').text(thermostat.temperature);
})

$('#temperature-reset').click(function() {
    thermostat.resetTemperature();
    updateTemperature();
  });

$('#powersaving-on').click(function() {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving').text('on')
    updateTemperature();
  })

$('#powersaving-off').click(function() {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving').text('off')
    updateTemperature();
  })

$('#current-city').change(function() {
  var city = $('#current-city').val();
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
    $('#current-temperature').text(data.main.temp)
  })
})

function updateTemperature() {
  $('#temperature').text(thermostat.temperature);
  $('#temperature').attr('class', thermostat.energyUsage());
  // if(thermostat.energyUsage() === 'low-usage') {
  //   $('#temperature').css('color', 'green')
  // } else if(thermostat.energyUsage() === 'medium-usage') {
  //   $('#temperature').css('color', 'black')
  // } else {
  //   $('#temperature').css('color', 'red')
  // }
}
