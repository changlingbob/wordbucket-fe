export const content =
  // eslint-disable-next-line no-template-curly-in-string -- Documentation
  "Buckets are named and have a parent. Each bucket contains entries, which have a weight used for rolling on the table (supports divisions down to 0.1) and the words to use. To embed another table in the result, use `${bucket.name}`. You can comma or space separate bucket names within the braces, and it will space separate the results.\n" +
  "\n" +
  "Currently there is one pair of supported commands: within a table query, use `$a` or `$an` to use the appropriate identifier depending on the result of the table query.\n" +
  "\n" +
  // eslint-disable-next-line no-template-curly-in-string -- Documentation
  "eg: `${$a size colour} table` may generates `a large blue table` or `an enormous pink table`, depending on the results. If there's no generated output, it the word used to call the command will be used, in this case `a table`.\n";
