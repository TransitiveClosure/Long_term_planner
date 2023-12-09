// introJs().start();

introJs().setOptions({
    tooltipClass: 'customTooltip'
  }).onbeforeexit( 
function(){
    update_global_tasks(".planning__list_tasks.global_tasks")}
        ).start();

// introJs().start()
var picker = new Pikaday({ field: document.getElementById('datepicker') });