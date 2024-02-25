const picker = new Pikaday({ field: document.getElementById('datepicker') , format: 'MM/DD/YYYY'});
picker.setDate(new Date())
function get_choosen_data()
{
    return picker.getDate().toLocaleDateString();
}