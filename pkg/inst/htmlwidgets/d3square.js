HTMLWidgets.widget({

  name: 'd3square',

  type: 'output',

  factory: function(el, width, height) {

    var instance = {};

    return {

      renderValue: function(x) {

        var width = d3.select(el).node().getBoundingClientRect().width;
        var height = d3.select(el).node().getBoundingClientRect().height;
        
        var data = HTMLWidgets.dataframeToD3(x.data);
        data.forEach(function(d) {
          d.d = d3.timeParse('%Y-%m-%d')(d.d);
        });
          
        var svg = d3.select(el).selectAll('svg')
          .data([data]);
          
        svg = svg.merge(
          svg.enter().append('svg')
        );
        
        svg
          .style('width', width)
          .style('height', height);
          
        var calendar = d3_rs_squares.html()
          .width(width)
          .height(height)
          .type('calendar.days');
        
        // add very basic click message for Shiny
        //  really need to add argument to configure
        //  and decorate the click with Shiny handler
        if(typeof(Shiny) !== 'undefined' && Shiny.onInputChange) {
          calendar.onClick(function(d) {
            Shiny.onInputChange(el.id + '_click', d);
          });
        }
          
        svg.call(calendar);
        
        instance.calendar = calendar;
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      },
      
      instance: instance

    };
  }
});