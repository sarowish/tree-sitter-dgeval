/**
 * @file dgeval grammar for tree-sitter
 * @author Berke Enercan <berkeenercan@tutanota.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const PREC = {
  call: 8,
  unary: 7,
  multiplicative: 6,
  additive: 5,
  comperative: 4,
  logical: 3,
  ternary: 2,
  assign: 1,
  comma: 0,
}

module.exports = grammar({
  name: "dgeval",

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.expression_statement,
      $.wait_statement,
    ),

    expression_statement: $ => seq(
      $._expression,
      ';'
    ),

    wait_statement: $ => seq(
      'wait',
      field('identifiers', sepComma($.identifier)),
      'then',
      $._expression,
      ';'
    ),

    _expression: $ => choice(
      $.identifier,
      $.number_literal,
      $.boolean_literal,
      $.string_literal,
      $.binary_expression,
      $.unary_expression,
      $.call_expression,
      seq(optional($._expression), '[', $._expression, ']'),
      prec.left(PREC.ternary, seq($._expression, '?', $._expression, ':', $._expression)),
      seq('(', $._expression, ')'),
      prec.left(PREC.comma, seq($._expression, ',', $._expression)),
      prec.right(PREC.assign, seq($._expression, '=', $._expression)),
    ),

    binary_expression: $ => {
      const table = [
        [PREC.logical, choice('&&', '||')],
        [PREC.comperative, choice('==', '!=', '<', '>', '<=', '>=')],
        [PREC.additive, choice('+', '-')],
        [PREC.multiplicative, choice('*', '/')],
      ];

      return choice(...table.map(([precedence, operator]) => prec.left(precedence, seq(
        $._expression,
        field("operator", operator),
        $._expression,
      ))));
    },

    unary_expression: $ => choice(
      prec.right(PREC.unary, seq('!', $._expression)),
      prec.right(PREC.unary, seq('-', $._expression)),
    ),

    call_expression: $ => prec.left(PREC.call, seq(
      field("name", $._expression),
      '(',
      optional($._expression),
      ')'
    )),

    number_literal: _ => {
      const decimalDigits = /\d+/;
      const nonzeroInteger = seq(/[1-9]/, optional(decimalDigits));
      const integer = choice('0', nonzeroInteger);
      const fractional = seq('.', repeat(decimalDigits), repeat1(/[1-9]/));

      const significand = choice(
        seq(integer, optional(fractional)),
        fractional
      )

      const exponent = seq(
        choice('e', 'E'),
        optional(choice('-', '+')),
        nonzeroInteger
      );

      const number = seq(significand, optional(exponent));

      return token(number);
    },

    boolean_literal: _ => choice('true', 'false'),

    string_literal: $ => seq(
      '"',
      repeat(choice(
        /[^\\"\n]/,
        $.escape_sequence,
      )),
      '"',
    ),

    escape_sequence: _ => token.immediate(seq(
      '\\',
      choice(
        /x[0-9a-fA-F]{1,2}/,
        /[n\\"]/
      )
    )),

    identifier: _ => seq(
      /[a-z-A-z_]/,
      repeat(/[a-zA-Z0-9_]/)
    ),
  }
});

function sepComma(rule) {
  return seq(rule, repeat(seq(',', rule)));
}
