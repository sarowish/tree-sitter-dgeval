(identifier) @variable
(number) @number
(boolean) @boolean
(string) @string
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

