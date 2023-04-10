// =====Sorting list===== 

const gripIcon = document.querySelectorAll('.fa-grip-vertical');

const dragArea = document.querySelector('#space');
new Sortable(dragArea, {
  group: 'list-of-locations',
  handle: ".fa-grip-vertical",
  animation: 350,
  draggable: ".weatherCard",
  ghostClass: 'ghost',
  // direction: 'vertical',
  store: {
    /** 
    * @param {Sortable} sortable
    * @returns {Array} 
    */
    get: function(sortable){
      var order = localStorage.getItem(sortable.options.group.name);
      console.log(order)
      return order ? order.split('|') : [];

    },
    /**
    * @param {Sortable} sortable
    */
    set: function(sortable){
      var order = sortable.toArray();
      localStorage.setItem(sortable.options.group.name, order.join('|'));
      console.log(order)
    }
      
  },
  
})
