import { select } from "d3-selection";

export default function (id) {
  
  let width = 300,
      height = 150,
      top = 16,
      right = 16,
      bottom = 16,
      left = 16,
      scale = 1,
      inner = 'g.svg-child',
      innerWidth = -1,
      innerHeight = -1,
      style = null,
      background = null,
      title = null,
      desc = null,
      role = 'img',
      classed = 'svg-svg';

  function _updateInnerWidth() {
      innerWidth = width - left - right;
  }    
  
  function _updateInnerHeight() {
      innerHeight = height - top - bottom;
  }   
  
  _updateInnerWidth();
  _updateInnerHeight();
        
  function _impl(context) {
    let selection = context.selection ? context.selection() : context,
        transition = (context.selection !== undefined);

    selection.each(function() {
      let parent = select(this);

      let el = parent.select(_impl.self());
      if (el.empty()) {
        let ariaTitle = (id == null ? '' : id + '-') + 'title';
        let ariaDesc = (id == null ? '' : id + '-') + 'desc';   
        el = parent.append('svg')
          .attr('preserveAspectRatio', 'xMidYMid meet')
          .attr('aria-labelledby', ariaTitle)
          .attr('aria-describedby', ariaDesc)
          .attr('id', id);
                    
        el.append('title').attr('id', ariaTitle);        
        el.append('desc').attr('id', ariaDesc);      
        el.append('defs');
        el.append('rect').attr('class', 'background');
        el.append('g').attr('class', 'svg-child');
      }
      
      let defsEl = el.select('defs');
      
      let styleEl = defsEl.selectAll('style').data(style ? [ style ] : []);
      styleEl.exit().remove();
      styleEl = styleEl.enter().append('style').attr('type', 'text/css').merge(styleEl);
      styleEl.text(style);
      
      el.attr('role', role);
      
      el.select('title').text(title);
      el.select('desc').text(desc);
            
      let rect = el.select('rect.background')
                  .attr('width', background != null ? width * scale : null)
                  .attr('height', background != null ? height * scale : null);      
            
      // Never transition
      el.attr('class', classed)

      let g = el.select(_impl.child());
            
      if (transition === true) {
        el = el.transition(context);
        g = g.transition(context);
        rect = rect.transition(context);
      }     

      // Transition if enabled
      el.attr('width', width * scale)
        .attr('height', height * scale)
        .attr('viewBox', '0 0 ' + width + ' ' + height);
    
      g.attr('transform', 'translate(' + left + ',' + top + ')');

      rect.attr('fill', background);

    });
  }

  _impl.self = function() { return 'svg' + (id ?  '#' + id : ''); }
  _impl.child = function() { return inner; }
  _impl.childDefs = function() { return 'defs'; }
  _impl.childWidth = function() { return innerWidth; }
  _impl.childHeight = function() { return innerHeight; }

  _impl.id = function() {
    return id;
  };
    
  _impl.classed = function(value) {
    return arguments.length ? (classed = value, _impl) : classed;
  };

  _impl.style = function(value) {
    return arguments.length ? (style = value, _impl) : style;
  };

  _impl.background = function(value) {
    return arguments.length ? (background = value, _impl) : background;
  };
    
  _impl.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    _updateInnerWidth();
    return _impl;
  };

  _impl.height = function(value) {
    if (!arguments.length) return width;
    height = value;
    _updateInnerHeight();
    return _impl;
  };
  
  _impl.scale = function(value) {
    return arguments.length ? (scale = value, _impl) : scale;
  };

  _impl.title = function(value) {
    return arguments.length ? (title = value, _impl) : title;
  };  

  _impl.desc = function(value) {
    return arguments.length ? (desc = value, _impl) : desc;
  };   
  
  _impl.role = function(value) {
    return arguments.length ? (role = value, _impl) : role;
  };  
   
  _impl.margin = function(value) {
    if (!arguments.length) return {
      top: top,
      right: right,
      bottom: bottom,
      left: left
    };
    if (value.top !== undefined) {
      top = value.top;
      right = value.right;
      bottom = value.bottom;
      left = value.left; 
    } else {
      top = value;
      right = value;
      bottom = value;
      left = value;
    }     
    _updateInnerWidth();
    _updateInnerHeight();
    return _impl;
  };
    
  return _impl;
}