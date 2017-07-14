#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
d3square <- function(
  data = NULL,
  width = NULL, height = NULL,
  elementId = NULL
) {

  # forward options using x
  x = list(
    data = data
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'd3square',
    x,
    width = width,
    height = height,
    package = 'd3squareR',
    elementId = elementId
  )
}

#' Shiny bindings for d3square
#'
#' Output and render functions for using d3square within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a d3square
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name d3square-shiny
#'
#' @export
d3squareOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'd3square', width, height, package = 'd3squareR')
}

#' @rdname d3square-shiny
#' @export
renderd3square <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, d3squareOutput, env, quoted = TRUE)
}
