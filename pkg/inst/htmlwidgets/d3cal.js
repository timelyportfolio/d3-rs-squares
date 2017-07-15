HTMLWidgets.widget({

  name: 'd3cal',

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
          
        d3.select(el)
          .data([data]);

          
        var calendar = d3_rs_squares.html()
          .width(width)
          .height(height);
          
        Object.keys(x.options).forEach(function(ky) {
          try {
            calendar[ky](x.options[ky]);
          } catch(e) {
            console.log('could not set ' + ky + ' option');
          }
        });
        
        // add very basic click message for Shiny
        //  really need to add argument to configure
        //  and decorate the click with Shiny handler
        if(typeof(Shiny) !== 'undefined' && Shiny.onInputChange) {
          calendar.onClick(function(d) {
            Shiny.onInputChange(el.id + '_click', d);
          });
        }
          
        d3.select(el).call(calendar);
        
        // make svg 100% width
        d3.select(el).select('svg')
          .attr('width', '')
          .style('width', '100%');
        
        instance.calendar = calendar;
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      },
      
      instance: instance

    };
  }
});