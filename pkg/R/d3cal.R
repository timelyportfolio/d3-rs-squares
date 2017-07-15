#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
d3cal <- function(
  data = NULL,
  classed = NULL,
  background = NULL,
  theme = NULL,
  margin = NULL,
  scale = NULL,
  minDate = NULL,
  maxDate = NULL,
  color = NULL,
  type = 'calendar.days',
  style = NULL,
  starting = NULL,
  cellSize = NULL,
  onClick = NULL,
  monthSeparation = NULL,
  nice = NULL,
  width = "100%", height = 200,
  elementId = NULL
) {

  # forward options using x
  x = list(
    data = data,
    options = Filter(
      Negate(is.null),
      list(
        classed = classed,
        background = background,
        theme = theme,
        margin = margin,
        scale = scale,
        minDate = minDate,
        maxDate = maxDate,
        color = color,
        type = type,
        style = style,
        starting = starting,
        cellSize = cellSize,
        onClick = onClick,
        monthSeparation = monthSeparation,
        nice= nice
      )
    )
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'd3cal',
    x,
    width = width,
    height = height,
    package = 'd3squareR',
    elementId = elementId
  )
}

#' Shiny bindings for d3cal
#'
#' Output and render functions for using d3cal within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a d3cal
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name d3cal-shiny
#'
#' @export
d3calOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'd3cal', width, height, package = 'd3squareR')
}

#' @rdname d3cal-shiny
#' @export
renderd3cal <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, d3calOutput, env, quoted = TRUE)
}
