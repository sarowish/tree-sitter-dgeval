(identifier) @variable
(number_literal) @number
(boolean_literal) @boolean
(string_literal) @string
(escape_sequence) @string.escape

(call_expression
  name: (identifier) @function)

[
 "wait"
 "then"
] @keyword

[
 ";"
 ","
] @punctuation.delimiter

[
 "["
 "]"
 "("
 ")"
] @punctuation.bracket

[
 "?"
 ":"
 "&&"
 "||"
 "=="
 "!="
 "<"
 ">"
 "<="
 ">="
 "+"
 "-"
 "*"
 "/"
 "!"
 "="
] @operator

