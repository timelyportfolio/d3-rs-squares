library(d3calR)

days = seq.Date(from=as.Date("2016-01-01"),to=as.Date("2016-12-31"),by="days")
days2 = seq.Date(from=as.Date("2017-01-01"),to=as.Date("2017-12-31"),by="days")
df <- data.frame(
  d=days,
  v=runif(length(days), 0, 100)
)
df2 = data.frame(
  d=days2,
  v=runif(length(days2), 1, 100)
)

d3cal(df)

library(htmltools)
browsable(
  tagList(
    tags$script(HTML(
sprintf(
'
var df2 = %s;
',
jsonlite::toJSON(df2, auto_unbox=TRUE, dataframe="rows")
)
    )),
    d3cal(df),
    d3cal(df2)
  )
)



library(shiny)

ui <- d3calOutput("square")
server <- function(input, output, session) {
  output$square <- renderd3cal({
    d3cal(df)
  })
  
  observeEvent(input$square_click, {
    print(input$square_click)
  })
}
shinyApp(ui, server)


browsable(fluidPage(d3cal(df)))