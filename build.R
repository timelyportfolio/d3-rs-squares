# requires node/npm
system2("npm",args = "install")

# copy dist files to htmlwidgets directory
file.copy(
  from = "./distribution/d3-rs-squares.umd-es2015.js",
  to = "./pkg/inst/htmlwidgets/src/d3-rs-squares/dist/d3-rs-squares.min.js",
  overwrite = TRUE
)

