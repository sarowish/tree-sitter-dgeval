package tree_sitter_dgeval_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_dgeval "github.com/sarowish/tree-sitter-dgeval/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_dgeval.Language())
	if language == nil {
		t.Errorf("Error loading Dgeval grammar")
	}
}
