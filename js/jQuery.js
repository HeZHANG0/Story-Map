$(document).ready(function() {
  $.ajax(parkdata).done(function(data) {
    loadSlide(currentSlide, data)
    // featureGroup.eachLayer(eachFeatureFunction);
    $('#nextButton').on('click',function(){
      console.log('click')
      next(data);
    });
    $('#previousButton').on('click',function(){
      previous(data);
    });
  })
})
