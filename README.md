# tree-sitter-dgeval

dgeval grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter).

## Setting up for Neovim

Install [`nvim-treesitter`](https://github.com/nvim-treesitter/nvim-treesitter) plugin and add the below
snippet to your neovim config.

```lua
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()

parser_config.dgeval = {
    install_info = {
        url = "https://github.com/sarowish/tree-sitter-dgeval",
        files = { "src/parser.c" },
    }
}
```

Start neovim and execute `:TSInstall dgeval` to install the parser.

### Add query files

Copy the [queries/highlights.scm](./queries/highlights.scm) file to `XDG_CONFIG_HOME/nvim/queries/dgeval/` directory.

### Filetype detection

Since dgeval source files don't have a special extension, the filetype can't be trivially detected.
Below is an example snippet that detects the filetype from the path to the source file:

```lua
-- file: ~/.config/nvim/ftdetect/filetype.lua

vim.filetype.add {
    pattern = {
        ['.*/ceng444/.*/.*%.txt'] = 'dgeval',
    },
}
```
