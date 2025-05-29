import XCTest
import SwiftTreeSitter
import TreeSitterDgeval

final class TreeSitterDgevalTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_dgeval())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Dgeval grammar")
    }
}
