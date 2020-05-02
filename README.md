# Wordbucket

Inspired by the chaps at Asymmetric and the need for Dungeons and Dragons randomness, this is a project that lets you build random tables that can call other random tables. This project is a front end to the underlying engine, that saves to Google Drive appdata, so if you do want to use this, it's a straightforward(?) way of compiling your tables.

Currently it isn't as fully featured as I want it, but it's at least a start.

## Features

Buckets are named and have a parent. Each bucket contains entries, which have a weight used for rolling on the table (supports divisions down to 0.1) and the words to use. To embed another table in the result, use `${fully.qualified.bucket.name}`. You can comma separate bucket names within the braces, and it will comma separate the results.

### Commands

Currently there is one pair of supported commands: within a table query, use `$a` or `$an` to use the appropriate identifier depending on the result of the table query.

eg: `${$a, $size, $colour} table` may generates `a large blue table` or `an enormous pink table`, depending on the results. If there's no generated output, it the word used to call the command will be used, in this case `a table`.