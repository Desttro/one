import { c as cjsExports, R as React, j as jsxRuntimeExports, r as reactExports } from "../_virtual_one-entry.js";
import "buffer";
import { h as getVariable, i as getTokenValue, T as Text, j as authClient } from "./authClient-DTdP_buj.js";
import { u as usePropsAndStyle } from "./useProps-BHYOGbmk.js";
import "node:async_hooks";
var transform;
var hasRequiredTransform;
function requireTransform() {
  if (hasRequiredTransform) return transform;
  hasRequiredTransform = 1;
  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }
  function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }
  peg$subclass(peg$SyntaxError, Error);
  peg$SyntaxError.buildMessage = function(expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
      literal: function(expectation) {
        return '"' + literalEscape(expectation.text) + '"';
      },
      "class": function(expectation) {
        var escapedParts = "", i;
        for (i = 0; i < expectation.parts.length; i++) {
          escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
        }
        return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
      },
      any: function(expectation) {
        return "any character";
      },
      end: function(expectation) {
        return "end of input";
      },
      other: function(expectation) {
        return expectation.description;
      }
    };
    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }
    function literalEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
        return "\\x" + hex(ch);
      });
    }
    function classEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
        return "\\x" + hex(ch);
      });
    }
    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }
    function describeExpected(expected2) {
      var descriptions = new Array(expected2.length), i, j;
      for (i = 0; i < expected2.length; i++) {
        descriptions[i] = describeExpectation(expected2[i]);
      }
      descriptions.sort();
      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }
      switch (descriptions.length) {
        case 1:
          return descriptions[0];
        case 2:
          return descriptions[0] + " or " + descriptions[1];
        default:
          return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
      }
    }
    function describeFound(found2) {
      return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
    }
    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };
  function peg$parse(input, options) {
    options = options !== void 0 ? options : {};
    var peg$FAILED = {}, peg$startRuleFunctions = {
      transformList: peg$parsetransformList
    }, peg$startRuleFunction = peg$parsetransformList, peg$c0 = function(ts) {
      return ts;
    }, peg$c1 = function(t, ts) {
      return multiply_matrices(t, ts);
    }, peg$c2 = "matrix", peg$c3 = peg$literalExpectation("matrix", false), peg$c4 = "(", peg$c5 = peg$literalExpectation("(", false), peg$c6 = ")", peg$c7 = peg$literalExpectation(")", false), peg$c8 = function(a, b, c, d, e, f) {
      return [
        a,
        c,
        e,
        b,
        d,
        f
      ];
    }, peg$c9 = "translate", peg$c10 = peg$literalExpectation("translate", false), peg$c11 = function(tx, ty) {
      return [
        1,
        0,
        tx,
        0,
        1,
        ty || 0
      ];
    }, peg$c12 = "scale", peg$c13 = peg$literalExpectation("scale", false), peg$c14 = function(sx, sy) {
      return [
        sx,
        0,
        0,
        0,
        sy === null ? sx : sy,
        0
      ];
    }, peg$c15 = "rotate", peg$c16 = peg$literalExpectation("rotate", false), peg$c17 = function(angle, c) {
      var cos = Math.cos(deg2rad * angle);
      var sin = Math.sin(deg2rad * angle);
      if (c !== null) {
        var x = c[0];
        var y = c[1];
        return [
          cos,
          -sin,
          cos * -x + -sin * -y + x,
          sin,
          cos,
          sin * -x + cos * -y + y
        ];
      }
      return [
        cos,
        -sin,
        0,
        sin,
        cos,
        0
      ];
    }, peg$c18 = "skewX", peg$c19 = peg$literalExpectation("skewX", false), peg$c20 = function(angle) {
      return [
        1,
        Math.tan(deg2rad * angle),
        0,
        0,
        1,
        0
      ];
    }, peg$c21 = "skewY", peg$c22 = peg$literalExpectation("skewY", false), peg$c23 = function(angle) {
      return [
        1,
        0,
        0,
        Math.tan(deg2rad * angle),
        1,
        0
      ];
    }, peg$c24 = function(f) {
      return parseFloat(f.join(""));
    }, peg$c25 = function(i) {
      return parseInt(i.join(""));
    }, peg$c26 = function(n) {
      return n;
    }, peg$c27 = function(n1, n2) {
      return [
        n1,
        n2
      ];
    }, peg$c28 = ",", peg$c29 = peg$literalExpectation(",", false), peg$c30 = function(ds) {
      return ds.join("");
    }, peg$c31 = function(f) {
      return f.join("");
    }, peg$c32 = function(d) {
      return d.join("");
    }, peg$c33 = peg$otherExpectation("fractionalConstant"), peg$c34 = ".", peg$c35 = peg$literalExpectation(".", false), peg$c36 = function(d1, d2) {
      return [
        d1 ? d1.join("") : null,
        ".",
        d2.join("")
      ].join("");
    }, peg$c37 = /^[eE]/, peg$c38 = peg$classExpectation([
      "e",
      "E"
    ], false, false), peg$c39 = function(e) {
      return [
        e[0],
        e[1],
        e[2].join("")
      ].join("");
    }, peg$c40 = /^[+\-]/, peg$c41 = peg$classExpectation([
      "+",
      "-"
    ], false, false), peg$c42 = /^[0-9]/, peg$c43 = peg$classExpectation([
      [
        "0",
        "9"
      ]
    ], false, false), peg$c44 = /^[ \t\r\n]/, peg$c45 = peg$classExpectation([
      " ",
      "	",
      "\r",
      "\n"
    ], false, false), peg$currPos = 0, peg$posDetailsCache = [
      {
        line: 1,
        column: 1
      }
    ], peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
      }
      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function peg$literalExpectation(text, ignoreCase) {
      return {
        type: "literal",
        text,
        ignoreCase
      };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
      return {
        type: "class",
        parts,
        inverted,
        ignoreCase
      };
    }
    function peg$endExpectation() {
      return {
        type: "end"
      };
    }
    function peg$otherExpectation(description) {
      return {
        type: "other",
        description
      };
    }
    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos], p;
      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }
        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };
        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }
          p++;
        }
        peg$posDetailsCache[pos] = details;
        return details;
      }
    }
    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos), endPosDetails = peg$computePosDetails(endPos);
      return {
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }
    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }
      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }
      peg$maxFailExpected.push(expected);
    }
    function peg$buildStructuredError(expected, found, location) {
      return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
    }
    function peg$parsetransformList() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewsp();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsewsp();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsetransforms();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsewsp();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsewsp();
          }
          if (s3 !== peg$FAILED) {
            s1 = peg$c0(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsetransforms() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$parsetransform();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsecommaWsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsecommaWsp();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetransforms();
          if (s3 !== peg$FAILED) {
            s1 = peg$c1(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parsetransform();
      }
      return s0;
    }
    function peg$parsetransform() {
      var s0;
      s0 = peg$parsematrix();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetranslate();
        if (s0 === peg$FAILED) {
          s0 = peg$parsescale();
          if (s0 === peg$FAILED) {
            s0 = peg$parserotate();
            if (s0 === peg$FAILED) {
              s0 = peg$parseskewX();
              if (s0 === peg$FAILED) {
                s0 = peg$parseskewY();
              }
            }
          }
        }
      }
      return s0;
    }
    function peg$parsematrix() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c2) {
        s1 = peg$c2;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c3);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsecommaWsp();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsenumber();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsecommaWsp();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsenumber();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parsecommaWsp();
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parsenumber();
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parsecommaWsp();
                            if (s12 !== peg$FAILED) {
                              s13 = peg$parsenumber();
                              if (s13 !== peg$FAILED) {
                                s14 = peg$parsecommaWsp();
                                if (s14 !== peg$FAILED) {
                                  s15 = peg$parsenumber();
                                  if (s15 !== peg$FAILED) {
                                    s16 = [];
                                    s17 = peg$parsewsp();
                                    while (s17 !== peg$FAILED) {
                                      s16.push(s17);
                                      s17 = peg$parsewsp();
                                    }
                                    if (s16 !== peg$FAILED) {
                                      if (input.charCodeAt(peg$currPos) === 41) {
                                        s17 = peg$c6;
                                        peg$currPos++;
                                      } else {
                                        s17 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                          peg$fail(peg$c7);
                                        }
                                      }
                                      if (s17 !== peg$FAILED) {
                                        s1 = peg$c8(s5, s7, s9, s11, s13, s15);
                                        s0 = s1;
                                      } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                      }
                                    } else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                    }
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsetranslate() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 9) === peg$c9) {
        s1 = peg$c9;
        peg$currPos += 9;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c10);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsecommaWspNumber();
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  s7 = [];
                  s8 = peg$parsewsp();
                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$parsewsp();
                  }
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s8 = peg$c6;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s1 = peg$c11(s5, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsescale() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c12) {
        s1 = peg$c12;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c13);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsecommaWspNumber();
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  s7 = [];
                  s8 = peg$parsewsp();
                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$parsewsp();
                  }
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s8 = peg$c6;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s1 = peg$c14(s5, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parserotate() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c15) {
        s1 = peg$c15;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c16);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsecommaWspTwoNumbers();
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  s7 = [];
                  s8 = peg$parsewsp();
                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$parsewsp();
                  }
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s8 = peg$c6;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s1 = peg$c17(s5, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parseskewX() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c18) {
        s1 = peg$c18;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c19);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = [];
                s7 = peg$parsewsp();
                while (s7 !== peg$FAILED) {
                  s6.push(s7);
                  s7 = peg$parsewsp();
                }
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s7 = peg$c6;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c7);
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s1 = peg$c20(s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parseskewY() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c21) {
        s1 = peg$c21;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c22);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s6 = [];
                s7 = peg$parsewsp();
                while (s7 !== peg$FAILED) {
                  s6.push(s7);
                  s7 = peg$parsewsp();
                }
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s7 = peg$c6;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c7);
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s1 = peg$c23(s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsenumber() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsesign();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsefloatingPointConstant();
        if (s3 !== peg$FAILED) {
          s2 = [
            s2,
            s3
          ];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c24(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsesign();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseintegerConstant();
          if (s3 !== peg$FAILED) {
            s2 = [
              s2,
              s3
            ];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s1 = peg$c25(s1);
        }
        s0 = s1;
      }
      return s0;
    }
    function peg$parsecommaWspNumber() {
      var s0, s1, s2;
      s0 = peg$currPos;
      s1 = peg$parsecommaWsp();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          s1 = peg$c26(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsecommaWspTwoNumbers() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = peg$parsecommaWsp();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecommaWsp();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsenumber();
            if (s4 !== peg$FAILED) {
              s1 = peg$c27(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsecommaWsp() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewsp();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsewsp();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomma();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsewsp();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsewsp();
          }
          if (s3 !== peg$FAILED) {
            s1 = [
              s1,
              s2,
              s3
            ];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsecomma();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s1 = [
              s1,
              s2
            ];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      return s0;
    }
    function peg$parsecomma() {
      var s0;
      if (input.charCodeAt(peg$currPos) === 44) {
        s0 = peg$c28;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c29);
        }
      }
      return s0;
    }
    function peg$parseintegerConstant() {
      var s0, s1;
      s0 = peg$currPos;
      s1 = peg$parsedigitSequence();
      if (s1 !== peg$FAILED) {
        s1 = peg$c30(s1);
      }
      s0 = s1;
      return s0;
    }
    function peg$parsefloatingPointConstant() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsefractionalConstant();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseexponent();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s2 = [
            s2,
            s3
          ];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c31(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsedigitSequence();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexponent();
          if (s3 !== peg$FAILED) {
            s2 = [
              s2,
              s3
            ];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s1 = peg$c32(s1);
        }
        s0 = s1;
      }
      return s0;
    }
    function peg$parsefractionalConstant() {
      var s0, s1, s2, s3;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsedigitSequence();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c34;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c35);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsedigitSequence();
          if (s3 !== peg$FAILED) {
            s1 = peg$c36(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsedigitSequence();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s2 = peg$c34;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c35);
            }
          }
          if (s2 !== peg$FAILED) {
            s1 = peg$c32(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c33);
        }
      }
      return s0;
    }
    function peg$parseexponent() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c37.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c38);
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsesign();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsedigitSequence();
          if (s4 !== peg$FAILED) {
            s2 = [
              s2,
              s3,
              s4
            ];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c39(s1);
      }
      s0 = s1;
      return s0;
    }
    function peg$parsesign() {
      var s0;
      if (peg$c40.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c41);
        }
      }
      return s0;
    }
    function peg$parsedigitSequence() {
      var s0, s1;
      s0 = [];
      s1 = peg$parsedigit();
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$parsedigit();
        }
      } else {
        s0 = peg$FAILED;
      }
      return s0;
    }
    function peg$parsedigit() {
      var s0;
      if (peg$c42.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c43);
        }
      }
      return s0;
    }
    function peg$parsewsp() {
      var s0;
      if (peg$c44.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c45);
        }
      }
      return s0;
    }
    var deg2rad = Math.PI / 180;
    function multiply_matrices(l, r) {
      var al = l[0];
      var cl = l[1];
      var el = l[2];
      var bl = l[3];
      var dl = l[4];
      var fl = l[5];
      var ar = r[0];
      var cr = r[1];
      var er = r[2];
      var br = r[3];
      var dr = r[4];
      var fr = r[5];
      var a = al * ar + cl * br;
      var c = al * cr + cl * dr;
      var e = al * er + cl * fr + el;
      var b = bl * ar + dl * br;
      var d = bl * cr + dl * dr;
      var f = bl * er + dl * fr + fl;
      return [
        a,
        c,
        e,
        b,
        d,
        f
      ];
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }
      throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
  }
  transform = {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
  };
  return transform;
}
requireTransform();
var transformToRn;
var hasRequiredTransformToRn;
function requireTransformToRn() {
  if (hasRequiredTransformToRn) return transformToRn;
  hasRequiredTransformToRn = 1;
  function peg$subclass(child, parent) {
    function C() {
      this.constructor = child;
    }
    C.prototype = parent.prototype;
    child.prototype = new C();
  }
  function peg$SyntaxError(message, expected, found, location) {
    var self = Error.call(this, message);
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(self, peg$SyntaxError.prototype);
    }
    self.expected = expected;
    self.found = found;
    self.location = location;
    self.name = "SyntaxError";
    return self;
  }
  peg$subclass(peg$SyntaxError, Error);
  function peg$padEnd(str, targetLength, padString) {
    padString = padString || " ";
    if (str.length > targetLength) {
      return str;
    }
    targetLength -= str.length;
    padString += padString.repeat(targetLength);
    return str + padString.slice(0, targetLength);
  }
  peg$SyntaxError.prototype.format = function(sources) {
    var str = "Error: " + this.message;
    if (this.location) {
      var src = null;
      var k;
      for (k = 0; k < sources.length; k++) {
        if (sources[k].source === this.location.source) {
          src = sources[k].text.split(/\r\n|\n|\r/g);
          break;
        }
      }
      var s = this.location.start;
      var offset_s = this.location.source && typeof this.location.source.offset === "function" ? this.location.source.offset(s) : s;
      var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
      if (src) {
        var e = this.location.end;
        var filler = peg$padEnd("", offset_s.line.toString().length, " ");
        var line = src[s.line - 1];
        var last = s.line === e.line ? e.column : line.length + 1;
        var hatLen = last - s.column || 1;
        str += "\n --> " + loc + "\n" + filler + " |\n" + offset_s.line + " | " + line + "\n" + filler + " | " + peg$padEnd("", s.column - 1, " ") + peg$padEnd("", hatLen, "^");
      } else {
        str += "\n at " + loc;
      }
    }
    return str;
  };
  peg$SyntaxError.buildMessage = function(expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
      literal: function(expectation) {
        return '"' + literalEscape(expectation.text) + '"';
      },
      class: function(expectation) {
        var escapedParts = expectation.parts.map(function(part) {
          return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
        });
        return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
      },
      any: function() {
        return "any character";
      },
      end: function() {
        return "end of input";
      },
      other: function(expectation) {
        return expectation.description;
      }
    };
    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }
    function literalEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
        return "\\x" + hex(ch);
      });
    }
    function classEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
        return "\\x" + hex(ch);
      });
    }
    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }
    function describeExpected(expected2) {
      var descriptions = expected2.map(describeExpectation);
      var i, j;
      descriptions.sort();
      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }
      switch (descriptions.length) {
        case 1:
          return descriptions[0];
        case 2:
          return descriptions[0] + " or " + descriptions[1];
        default:
          return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
      }
    }
    function describeFound(found2) {
      return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
    }
    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };
  function peg$parse(input, options) {
    options = options !== void 0 ? options : {};
    var peg$FAILED = {};
    var peg$source = options.grammarSource;
    var peg$startRuleFunctions = {
      start: peg$parsestart
    };
    var peg$startRuleFunction = peg$parsestart;
    var peg$c0 = "matrix(";
    var peg$c1 = ")";
    var peg$c2 = "translate(";
    var peg$c3 = "scale(";
    var peg$c4 = "rotate(";
    var peg$c5 = "skewX(";
    var peg$c6 = "skewY(";
    var peg$c7 = ".";
    var peg$c8 = "e";
    var peg$r0 = /^[ \t\n\r,]/;
    var peg$r1 = /^[ \t\n\r]/;
    var peg$r2 = /^[+\-]/;
    var peg$r3 = /^[0-9]/;
    var peg$e0 = peg$otherExpectation("transform functions");
    var peg$e1 = peg$otherExpectation("transformFunctions");
    var peg$e2 = peg$otherExpectation("transform function");
    var peg$e3 = peg$otherExpectation("matrix");
    var peg$e4 = peg$literalExpectation("matrix(", false);
    var peg$e5 = peg$literalExpectation(")", false);
    var peg$e6 = peg$otherExpectation("translate");
    var peg$e7 = peg$literalExpectation("translate(", false);
    var peg$e8 = peg$otherExpectation("scale");
    var peg$e9 = peg$literalExpectation("scale(", false);
    var peg$e10 = peg$otherExpectation("rotate");
    var peg$e11 = peg$literalExpectation("rotate(", false);
    var peg$e12 = peg$otherExpectation("x, y");
    var peg$e13 = peg$otherExpectation("skewX");
    var peg$e14 = peg$literalExpectation("skewX(", false);
    var peg$e15 = peg$otherExpectation("skewY");
    var peg$e16 = peg$literalExpectation("skewY(", false);
    var peg$e17 = peg$otherExpectation("space or comma");
    var peg$e18 = peg$classExpectation([
      " ",
      "	",
      "\n",
      "\r",
      ","
    ], false, false);
    var peg$e19 = peg$otherExpectation("whitespace");
    var peg$e20 = peg$classExpectation([
      " ",
      "	",
      "\n",
      "\r"
    ], false, false);
    var peg$e21 = peg$classExpectation([
      "+",
      "-"
    ], false, false);
    var peg$e22 = peg$classExpectation([
      [
        "0",
        "9"
      ]
    ], false, false);
    var peg$e23 = peg$literalExpectation(".", false);
    var peg$e24 = peg$literalExpectation("e", false);
    var peg$f0 = function(head, tail) {
      const results = Array.isArray(head) ? head : [
        head
      ];
      tail.forEach((element) => {
        if (Array.isArray(element[1])) {
          results.push(...element[1]);
        } else {
          results.push(element[1]);
        }
      });
      return results;
    };
    var peg$f1 = function(a, b, c, d, e, f, g, h, i) {
      return {
        matrix: [
          a,
          b,
          c,
          d,
          e,
          f,
          g,
          h,
          i
        ]
      };
    };
    var peg$f2 = function(x, y) {
      if (y == void 0) {
        return {
          translate: x
        };
      }
      return {
        translate: [
          x,
          y
        ]
      };
    };
    var peg$f3 = function(x, y) {
      if (y == void 0) {
        return {
          scale: x
        };
      }
      return [
        {
          scaleX: x
        },
        {
          scaleY: y
        }
      ];
    };
    var peg$f4 = function(x, yz) {
      if (yz !== null) {
        return {
          rotate: `${x}deg`
        };
      }
      return [
        {
          rotate: `${x}deg`
        }
      ];
    };
    var peg$f5 = function(y, z) {
      return [
        y,
        z
      ];
    };
    var peg$f6 = function(x) {
      return [
        {
          skewX: `${x}deg`
        }
      ];
    };
    var peg$f7 = function(y) {
      return [
        {
          skewY: `${y}deg`
        }
      ];
    };
    var peg$f8 = function() {
      return parseFloat(text());
    };
    var peg$currPos = options.peg$currPos | 0;
    var peg$savedPos = peg$currPos;
    var peg$posDetailsCache = [
      {
        line: 1,
        column: 1
      }
    ];
    var peg$maxFailPos = peg$currPos;
    var peg$maxFailExpected = options.peg$maxFailExpected || [];
    var peg$silentFails = options.peg$silentFails | 0;
    var peg$result;
    if (options.startRule) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
      }
      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }
    function peg$literalExpectation(text2, ignoreCase) {
      return {
        type: "literal",
        text: text2,
        ignoreCase
      };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
      return {
        type: "class",
        parts,
        inverted,
        ignoreCase
      };
    }
    function peg$endExpectation() {
      return {
        type: "end"
      };
    }
    function peg$otherExpectation(description) {
      return {
        type: "other",
        description
      };
    }
    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos];
      var p;
      if (details) {
        return details;
      } else {
        if (pos >= peg$posDetailsCache.length) {
          p = peg$posDetailsCache.length - 1;
        } else {
          p = pos;
          while (!peg$posDetailsCache[--p]) {
          }
        }
        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };
        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }
          p++;
        }
        peg$posDetailsCache[pos] = details;
        return details;
      }
    }
    function peg$computeLocation(startPos, endPos, offset) {
      var startPosDetails = peg$computePosDetails(startPos);
      var endPosDetails = peg$computePosDetails(endPos);
      var res = {
        source: peg$source,
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
      return res;
    }
    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }
      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }
      peg$maxFailExpected.push(expected);
    }
    function peg$buildStructuredError(expected, found, location) {
      return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
    }
    function peg$parsestart() {
      var s0;
      peg$silentFails++;
      s0 = peg$parsetransformFunctions();
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        if (peg$silentFails === 0) {
          peg$fail(peg$e0);
        }
      }
      return s0;
    }
    function peg$parsetransformFunctions() {
      var s0, s1, s2, s3, s4, s5;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsefunction();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parse_();
        s5 = peg$parsefunction();
        if (s5 !== peg$FAILED) {
          s4 = [
            s4,
            s5
          ];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parse_();
          s5 = peg$parsefunction();
          if (s5 !== peg$FAILED) {
            s4 = [
              s4,
              s5
            ];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        peg$savedPos = s0;
        s0 = peg$f0(s1, s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e1);
        }
      }
      return s0;
    }
    function peg$parsefunction() {
      var s0;
      peg$silentFails++;
      s0 = peg$parsematrix();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetranslate();
        if (s0 === peg$FAILED) {
          s0 = peg$parsescale();
          if (s0 === peg$FAILED) {
            s0 = peg$parserotate();
            if (s0 === peg$FAILED) {
              s0 = peg$parseskewX();
              if (s0 === peg$FAILED) {
                s0 = peg$parseskewY();
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        if (peg$silentFails === 0) {
          peg$fail(peg$e2);
        }
      }
      return s0;
    }
    function peg$parsematrix() {
      var s0, s2, s4, s6, s8, s10, s12, s14, s16, s18, s20, s22;
      peg$silentFails++;
      s0 = peg$currPos;
      peg$parse_();
      if (input.substr(peg$currPos, 7) === peg$c0) {
        s2 = peg$c0;
        peg$currPos += 7;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e4);
        }
      }
      if (s2 !== peg$FAILED) {
        peg$parse_();
        s4 = peg$parseNUM();
        if (s4 !== peg$FAILED) {
          peg$parsespaceOrComma();
          s6 = peg$parseNUM();
          if (s6 !== peg$FAILED) {
            peg$parsespaceOrComma();
            s8 = peg$parseNUM();
            if (s8 !== peg$FAILED) {
              peg$parsespaceOrComma();
              s10 = peg$parseNUM();
              if (s10 !== peg$FAILED) {
                peg$parsespaceOrComma();
                s12 = peg$parseNUM();
                if (s12 !== peg$FAILED) {
                  peg$parsespaceOrComma();
                  s14 = peg$parseNUM();
                  if (s14 !== peg$FAILED) {
                    peg$parsespaceOrComma();
                    s16 = peg$parseNUM();
                    if (s16 !== peg$FAILED) {
                      peg$parsespaceOrComma();
                      s18 = peg$parseNUM();
                      if (s18 !== peg$FAILED) {
                        peg$parsespaceOrComma();
                        s20 = peg$parseNUM();
                        if (s20 !== peg$FAILED) {
                          peg$parse_();
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s22 = peg$c1;
                            peg$currPos++;
                          } else {
                            s22 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$e5);
                            }
                          }
                          if (s22 !== peg$FAILED) {
                            peg$parse_();
                            peg$savedPos = s0;
                            s0 = peg$f1(s4, s6, s8, s10, s12, s14, s16, s18, s20);
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        if (peg$silentFails === 0) {
          peg$fail(peg$e3);
        }
      }
      return s0;
    }
    function peg$parsetranslate() {
      var s0, s2, s4, s6, s8;
      peg$silentFails++;
      s0 = peg$currPos;
      peg$parse_();
      if (input.substr(peg$currPos, 10) === peg$c2) {
        s2 = peg$c2;
        peg$currPos += 10;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e7);
        }
      }
      if (s2 !== peg$FAILED) {
        peg$parse_();
        s4 = peg$parseNUM();
        if (s4 !== peg$FAILED) {
          peg$parsespaceOrComma();
          s6 = peg$parseNUM();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          peg$parse_();
          if (input.charCodeAt(peg$currPos) === 41) {
            s8 = peg$c1;
            peg$currPos++;
          } else {
            s8 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e5);
            }
          }
          if (s8 !== peg$FAILED) {
            peg$parse_();
            peg$savedPos = s0;
            s0 = peg$f2(s4, s6);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        if (peg$silentFails === 0) {
          peg$fail(peg$e6);
        }
      }
      return s0;
    }
    function peg$parsescale() {
      var s0, s2, s4, s6, s8;
      peg$silentFails++;
      s0 = peg$currPos;
      peg$parse_();
      if (input.substr(peg$currPos, 6) === peg$c3) {
        s2 = peg$c3;
        peg$currPos += 6;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e9);
        }
      }
      if (s2 !== peg$FAILED) {
        peg$parse_();
        s4 = peg$parseNUM();
        if (s4 !== peg$FAILED) {
          peg$parsespaceOrComma();
          s6 = peg$parseNUM();
          if (s6 === peg$FAILED) {
            s6 = null;
          }
          peg$parse_();
          if (input.charCodeAt(peg$currPos) === 41) {
            s8 = peg$c1;
            peg$currPos++;
          } else {
            s8 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e5);
            }
          }
          if (s8 !== peg$FAILED) {
            peg$parse_();
            peg$savedPos = s0;
            s0 = peg$f3(s4, s6);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        if (peg$silentFails === 0) {
          peg$fail(peg$e8);
        }
      }
      return s0;
    }
    function peg$parserotate() {
      var s0, s2, s4, s5, s7;
      peg$silentFails++;
      s0 = peg$currPos;
      peg$parse_();
      if (input.substr(peg$currPos, 7) === peg$c4) {
        s2 = peg$c4;
        peg$currPos += 7;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e11);
        }
      }
      if (s2 !== peg$FAILED) {
        peg$parse_();
        s4 = peg$parseNUM();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsetwoNumbers();
          if (s5 === peg$FAILED) {
            s5 = null;
          }
          peg$parse_();
          if (input.charCodeAt(peg$currPos) === 41) {
            s7 = peg$c1;
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e5);
            }
          }
          if (s7 !== peg$FAILED) {
            peg$parse_();
            peg$savedPos = s0;
            s0 = peg$f4(s4, s5);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        if (peg$silentFails === 0) {
          peg$fail(peg$e10);
        }
      }
      return s0;
    }
    function peg$parsetwoNumbers() {
      var s0, s2, s4;
      peg$silentFails++;
      s0 = peg$currPos;
      peg$parsespaceOrComma();
      s2 = peg$parseNUM();
      if (s2 !== peg$FAILED) {
        peg$parsespaceOrComma();
        s4 = peg$parseNUM();
        if (s4 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f5(s2, s4);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        if (peg$silentFails === 0) {
          peg$fail(peg$e12);
        }
      }
      return s0;
    }
    function peg$parseskewX() {
      var s0, s2, s4, s6;
      peg$silentFails++;
      s0 = peg$currPos;
      peg$parse_();
      if (input.substr(peg$currPos, 6) === peg$c5) {
        s2 = peg$c5;
        peg$currPos += 6;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e14);
        }
      }
      if (s2 !== peg$FAILED) {
        peg$parse_();
        s4 = peg$parseNUM();
        if (s4 !== peg$FAILED) {
          peg$parse_();
          if (input.charCodeAt(peg$currPos) === 41) {
            s6 = peg$c1;
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e5);
            }
          }
          if (s6 !== peg$FAILED) {
            peg$parse_();
            peg$savedPos = s0;
            s0 = peg$f6(s4);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        if (peg$silentFails === 0) {
          peg$fail(peg$e13);
        }
      }
      return s0;
    }
    function peg$parseskewY() {
      var s0, s2, s4, s6;
      peg$silentFails++;
      s0 = peg$currPos;
      peg$parse_();
      if (input.substr(peg$currPos, 6) === peg$c6) {
        s2 = peg$c6;
        peg$currPos += 6;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e16);
        }
      }
      if (s2 !== peg$FAILED) {
        peg$parse_();
        s4 = peg$parseNUM();
        if (s4 !== peg$FAILED) {
          peg$parse_();
          if (input.charCodeAt(peg$currPos) === 41) {
            s6 = peg$c1;
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e5);
            }
          }
          if (s6 !== peg$FAILED) {
            peg$parse_();
            peg$savedPos = s0;
            s0 = peg$f7(s4);
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        if (peg$silentFails === 0) {
          peg$fail(peg$e15);
        }
      }
      return s0;
    }
    function peg$parsespaceOrComma() {
      var s0, s1;
      peg$silentFails++;
      s0 = [];
      s1 = input.charAt(peg$currPos);
      if (peg$r0.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e18);
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = input.charAt(peg$currPos);
        if (peg$r0.test(s1)) {
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e18);
          }
        }
      }
      peg$silentFails--;
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e17);
      }
      return s0;
    }
    function peg$parse_() {
      var s0, s1;
      peg$silentFails++;
      s0 = [];
      s1 = input.charAt(peg$currPos);
      if (peg$r1.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e20);
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = input.charAt(peg$currPos);
        if (peg$r1.test(s1)) {
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e20);
          }
        }
      }
      peg$silentFails--;
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e19);
      }
      return s0;
    }
    function peg$parseNUM() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;
      s1 = input.charAt(peg$currPos);
      if (peg$r2.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e21);
        }
      }
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      s2 = peg$currPos;
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r3.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e22);
        }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = input.charAt(peg$currPos);
        if (peg$r3.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e22);
          }
        }
      }
      if (input.charCodeAt(peg$currPos) === 46) {
        s4 = peg$c7;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e23);
        }
      }
      if (s4 !== peg$FAILED) {
        s5 = [];
        s6 = input.charAt(peg$currPos);
        if (peg$r3.test(s6)) {
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e22);
          }
        }
        if (s6 !== peg$FAILED) {
          while (s6 !== peg$FAILED) {
            s5.push(s6);
            s6 = input.charAt(peg$currPos);
            if (peg$r3.test(s6)) {
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e22);
              }
            }
          }
        } else {
          s5 = peg$FAILED;
        }
        if (s5 !== peg$FAILED) {
          s3 = [
            s3,
            s4,
            s5
          ];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = [];
        s3 = input.charAt(peg$currPos);
        if (peg$r3.test(s3)) {
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e22);
          }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = input.charAt(peg$currPos);
            if (peg$r3.test(s3)) {
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e22);
              }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 101) {
          s4 = peg$c8;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e24);
          }
        }
        if (s4 !== peg$FAILED) {
          s5 = input.charAt(peg$currPos);
          if (peg$r2.test(s5)) {
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e21);
            }
          }
          if (s5 === peg$FAILED) {
            s5 = null;
          }
          s6 = [];
          s7 = input.charAt(peg$currPos);
          if (peg$r3.test(s7)) {
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e22);
            }
          }
          if (s7 !== peg$FAILED) {
            while (s7 !== peg$FAILED) {
              s6.push(s7);
              s7 = input.charAt(peg$currPos);
              if (peg$r3.test(s7)) {
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e22);
                }
              }
            }
          } else {
            s6 = peg$FAILED;
          }
          if (s6 !== peg$FAILED) {
            s4 = [
              s4,
              s5,
              s6
            ];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        peg$savedPos = s0;
        s0 = peg$f8();
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      return s0;
    }
    peg$result = peg$startRuleFunction();
    if (options.peg$library) {
      return (
        /** @type {any} */
        {
          peg$result,
          peg$currPos,
          peg$FAILED,
          peg$maxFailExpected,
          peg$maxFailPos
        }
      );
    }
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }
      throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
  }
  transformToRn = {
    StartRules: [
      "start"
    ],
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
  };
  return transformToRn;
}
requireTransformToRn();
function transformsArrayToProps(transformObjectsArray) {
  const props = {};
  transformObjectsArray === null || transformObjectsArray === void 0 || transformObjectsArray.forEach((transformObject) => {
    const keys = Object.keys(transformObject);
    if (keys.length !== 1) {
      console.error("You must specify exactly one property per transform object.");
    }
    const key = keys[0];
    const value = transformObject[key];
    props[key] = value;
  });
  return props;
}
const hasTouchableProperty = (props) => props.onPress || props.onPressIn || props.onPressOut || props.onLongPress;
const camelCaseToDashed = (camelCase) => {
  return camelCase.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
};
function stringifyTransformProps(transformProps) {
  const transformArray = [];
  if (transformProps.translate != null) {
    transformArray.push(`translate(${transformProps.translate})`);
  }
  if (transformProps.translateX != null || transformProps.translateY != null) {
    transformArray.push(`translate(${transformProps.translateX || 0}, ${transformProps.translateY || 0})`);
  }
  if (transformProps.scale != null) {
    transformArray.push(`scale(${transformProps.scale})`);
  }
  if (transformProps.scaleX != null || transformProps.scaleY != null) {
    transformArray.push(`scale(${transformProps.scaleX || 1}, ${transformProps.scaleY || 1})`);
  }
  if (transformProps.rotation != null) {
    transformArray.push(`rotate(${transformProps.rotation})`);
  }
  if (transformProps.skewX != null) {
    transformArray.push(`skewX(${transformProps.skewX})`);
  }
  if (transformProps.skewY != null) {
    transformArray.push(`skewY(${transformProps.skewY})`);
  }
  return transformArray;
}
function parseTransformProp(transform2, props) {
  const transformArray = [];
  props && transformArray.push(...stringifyTransformProps(props));
  if (Array.isArray(transform2)) {
    if (typeof transform2[0] === "number") {
      transformArray.push(`matrix(${transform2.join(" ")})`);
    } else {
      const stringifiedProps = transformsArrayToProps(
        // @ts-expect-error FIXME
        transform2
      );
      transformArray.push(...stringifyTransformProps(stringifiedProps));
    }
  } else if (typeof transform2 === "string") {
    transformArray.push(transform2);
  }
  return transformArray.length ? transformArray.join(" ") : void 0;
}
const getBoundingClientRect = (node) => {
  if (node) {
    const isElement = node.nodeType === 1;
    if (isElement && typeof node.getBoundingClientRect === "function") {
      return node.getBoundingClientRect();
    }
  }
  throw new Error("Can not get boundingClientRect of " + node || "undefined");
};
const measureLayout = (node, callback) => {
  const relativeNode = node === null || node === void 0 ? void 0 : node.parentNode;
  if (relativeNode) {
    setTimeout(() => {
      const relativeRect = getBoundingClientRect(relativeNode);
      const { height, left, top, width } = getBoundingClientRect(node);
      const x = left - relativeRect.left;
      const y = top - relativeRect.top;
      callback(x, y, width, height, left, top);
    }, 0);
  }
};
function remeasure() {
  const tag = this.state.touchable.responderID;
  if (tag === null) {
    return;
  }
  measureLayout(tag, this._handleQueryLayout);
}
function encodeSvg(svgString) {
  return svgString.replace("<svg", ~svgString.indexOf("xmlns") ? "<svg" : '<svg xmlns="http://www.w3.org/2000/svg"').replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/{/g, "%7B").replace(/}/g, "%7D").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function resolve(styleProp, cleanedProps) {
  if (styleProp) {
    return cjsExports.StyleSheet ? [
      styleProp,
      cleanedProps
    ] : (
      // Compatibility for arrays of styles in plain react web
      styleProp[Symbol.iterator] ? Object.assign({}, ...styleProp, cleanedProps) : Object.assign({}, styleProp, cleanedProps)
    );
  } else {
    return cleanedProps;
  }
}
var registry;
var hasRequiredRegistry;
function requireRegistry() {
  if (hasRequiredRegistry) return registry;
  hasRequiredRegistry = 1;
  var assets = [];
  function registerAsset(asset) {
    return assets.push(asset);
  }
  function getAssetByID(assetId) {
    return assets[assetId - 1];
  }
  registry = {
    registerAsset,
    getAssetByID
  };
  return registry;
}
var registryExports = requireRegistry();
const svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;
function resolveAssetUri(source) {
  let src = {};
  if (typeof source === "number") {
    const asset = registryExports.getAssetByID(source);
    if (asset == null) {
      throw new Error(`Image: asset with ID "${source}" could not be found. Please check the image source or packager.`);
    }
    src = {
      width: asset.width,
      height: asset.height,
      scale: asset.scales[0]
    };
    if (asset.scales.length > 1) {
      const preferredScale = cjsExports.PixelRatio.get();
      src.scale = asset.scales.reduce((prev, curr) => Math.abs(curr - preferredScale) < Math.abs(prev - preferredScale) ? curr : prev);
    }
    const scaleSuffix = src.scale !== 1 ? `@${src.scale}x` : "";
    src.uri = asset ? `${asset.httpServerLocation}/${asset.name}${scaleSuffix}.${asset.type}` : "";
  } else if (typeof source === "string") {
    src.uri = source;
  } else if (source && !Array.isArray(source) && typeof source.uri === "string") {
    src.uri = source.uri;
  }
  if (src.uri) {
    var _src;
    const match = (_src = src) === null || _src === void 0 || (_src = _src.uri) === null || _src === void 0 ? void 0 : _src.match(svgDataUriPattern);
    if (match) {
      const [, prefix, svg] = match;
      const encodedSvg = encodeURIComponent(svg);
      src.uri = `${prefix}${encodedSvg}`;
      return src;
    }
  }
  return src;
}
const prepare = (self, props = self.props) => {
  const { transform: transform2, origin, originX, originY, fontFamily, fontSize, fontWeight, fontStyle, style, forwardedRef, gradientTransform, patternTransform, onPress, ...rest } = props;
  const clean = {
    ...hasTouchableProperty(props) ? {
      onStartShouldSetResponder: self.touchableHandleStartShouldSetResponder,
      onResponderTerminationRequest: self.touchableHandleResponderTerminationRequest,
      onResponderGrant: self.touchableHandleResponderGrant,
      onResponderMove: self.touchableHandleResponderMove,
      onResponderRelease: self.touchableHandleResponderRelease,
      onResponderTerminate: self.touchableHandleResponderTerminate
    } : null,
    ...rest
  };
  if (origin != null) {
    clean["transform-origin"] = origin.toString().replace(",", " ");
  } else if (originX != null || originY != null) {
    clean["transform-origin"] = `${originX || 0} ${originY || 0}`;
  }
  const parsedTransform = parseTransformProp(transform2, props);
  if (parsedTransform) {
    clean.transform = parsedTransform;
  }
  const parsedGradientTransform = parseTransformProp(gradientTransform);
  if (parsedGradientTransform) {
    clean.gradientTransform = parsedGradientTransform;
  }
  const parsedPatternTransform = parseTransformProp(patternTransform);
  if (parsedPatternTransform) {
    clean.patternTransform = parsedPatternTransform;
  }
  clean.ref = (el) => {
    self.elementRef.current = el;
    if (typeof forwardedRef === "function") {
      forwardedRef(el);
    } else if (forwardedRef) {
      forwardedRef.current = el;
    }
  };
  const styles = {};
  if (fontFamily != null) {
    styles.fontFamily = fontFamily;
  }
  if (fontSize != null) {
    styles.fontSize = fontSize;
  }
  if (fontWeight != null) {
    styles.fontWeight = fontWeight;
  }
  if (fontStyle != null) {
    styles.fontStyle = fontStyle;
  }
  clean.style = resolve(style, styles);
  if (onPress !== null) {
    clean.onClick = props.onPress;
  }
  if (props.href !== null && props.href !== void 0) {
    var _resolveAssetUri;
    clean.href = (_resolveAssetUri = resolveAssetUri(props.href)) === null || _resolveAssetUri === void 0 ? void 0 : _resolveAssetUri.uri;
  }
  return clean;
};
function convertInt32ColorToRGBA(color) {
  const r = color >> 16 & 255;
  const g = color >> 8 & 255;
  const b = color & 255;
  const a = (color >> 24 & 255) / 255;
  const alpha = a.toFixed(2);
  return `rgba(${r},${g},${b},${alpha})`;
}
const PRESS_RETENTION_OFFSET = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 30
};
const { Mixin } = cjsExports.Touchable;
const { touchableHandleStartShouldSetResponder, touchableHandleResponderTerminationRequest, touchableHandleResponderGrant, touchableHandleResponderMove, touchableHandleResponderRelease, touchableHandleResponderTerminate, touchableGetInitialState } = Mixin;
const SvgTouchableMixin = {
  ...Mixin,
  touchableHandleStartShouldSetResponder(e) {
    const { onStartShouldSetResponder } = this.props;
    if (onStartShouldSetResponder) {
      return onStartShouldSetResponder(e);
    } else {
      return touchableHandleStartShouldSetResponder.call(this, e);
    }
  },
  touchableHandleResponderTerminationRequest(e) {
    const { onResponderTerminationRequest } = this.props;
    if (onResponderTerminationRequest) {
      return onResponderTerminationRequest(e);
    } else {
      return touchableHandleResponderTerminationRequest.call(this, e);
    }
  },
  touchableHandleResponderGrant(e) {
    const { onResponderGrant } = this.props;
    if (onResponderGrant) {
      return onResponderGrant(e);
    } else {
      return touchableHandleResponderGrant.call(this, e);
    }
  },
  touchableHandleResponderMove(e) {
    const { onResponderMove } = this.props;
    if (onResponderMove) {
      return onResponderMove(e);
    } else {
      return touchableHandleResponderMove.call(this, e);
    }
  },
  touchableHandleResponderRelease(e) {
    const { onResponderRelease } = this.props;
    if (onResponderRelease) {
      return onResponderRelease(e);
    } else {
      return touchableHandleResponderRelease.call(this, e);
    }
  },
  touchableHandleResponderTerminate(e) {
    const { onResponderTerminate } = this.props;
    if (onResponderTerminate) {
      return onResponderTerminate(e);
    } else {
      return touchableHandleResponderTerminate.call(this, e);
    }
  },
  touchableHandlePress(e) {
    const { onPress } = this.props;
    onPress && onPress(e);
  },
  touchableHandleActivePressIn(e) {
    const { onPressIn } = this.props;
    onPressIn && onPressIn(e);
  },
  touchableHandleActivePressOut(e) {
    const { onPressOut } = this.props;
    onPressOut && onPressOut(e);
  },
  touchableHandleLongPress(e) {
    const { onLongPress } = this.props;
    onLongPress && onLongPress(e);
  },
  touchableGetPressRectOffset() {
    const { pressRetentionOffset } = this.props;
    return pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },
  touchableGetHitSlop() {
    const { hitSlop } = this.props;
    return hitSlop;
  },
  touchableGetHighlightDelayMS() {
    const { delayPressIn } = this.props;
    return delayPressIn || 0;
  },
  touchableGetLongPressDelayMS() {
    const { delayLongPress } = this.props;
    return delayLongPress === 0 ? 0 : delayLongPress || 500;
  },
  touchableGetPressOutDelayMS() {
    const { delayPressOut } = this.props;
    return delayPressOut || 0;
  }
};
const touchKeys = Object.keys(SvgTouchableMixin);
const touchVals = touchKeys.map((key) => SvgTouchableMixin[key]);
const numTouchKeys = touchKeys.length;
const SvgTouchableMixin$1 = (target) => {
  for (let i = 0; i < numTouchKeys; i++) {
    const key = touchKeys[i];
    const val = touchVals[i];
    if (typeof val === "function") {
      target[key] = val.bind(target);
    } else {
      target[key] = val;
    }
  }
  target.state = touchableGetInitialState();
};
function _define_property$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class WebShape extends React.Component {
  prepareProps(props) {
    return props;
  }
  /**
  * disclaimer: I am not sure why the props are wrapped in a `style` attribute here, but that's how reanimated calls it
  */
  setNativeProps(props) {
    const merged = Object.assign({}, this.props, this.lastMergedProps, props.style);
    this.lastMergedProps = merged;
    const clean = prepare(this, this.prepareProps(merged));
    const current = this.elementRef.current;
    if (current) {
      for (const cleanAttribute of Object.keys(clean)) {
        const cleanValue = clean[cleanAttribute];
        switch (cleanAttribute) {
          case "ref":
          case "children":
            break;
          case "style":
            for (const partialStyle of [].concat(clean.style ?? [])) {
              Object.assign(current.style, partialStyle);
            }
            break;
          case "fill":
            if (cleanValue && typeof cleanValue === "object") {
              const value = cleanValue;
              current.setAttribute("fill", convertInt32ColorToRGBA(value.payload));
            }
            break;
          case "stroke":
            if (cleanValue && typeof cleanValue === "object") {
              const value = cleanValue;
              current.setAttribute("stroke", convertInt32ColorToRGBA(value.payload));
            }
            break;
          default:
            current.setAttribute(camelCaseToDashed(cleanAttribute), cleanValue);
            break;
        }
      }
    }
  }
  render() {
    if (!this.tag) {
      throw new Error("When extending `WebShape` you need to overwrite either `tag` or `render`!");
    }
    this.lastMergedProps = {};
    return cjsExports.unstable_createElement(this.tag, prepare(this, this.prepareProps(this.props)));
  }
  constructor(props) {
    super(props), _define_property$1(this, "elementRef", /* @__PURE__ */ React.createRef()), _define_property$1(this, "lastMergedProps", {});
    if (hasTouchableProperty(props)) {
      SvgTouchableMixin$1(this);
    }
    this._remeasureMetricsOnActivation = remeasure.bind(this);
  }
}
function _define_property(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class Path extends WebShape {
  constructor(...args) {
    super(...args), _define_property(this, "tag", "path");
  }
}
class Polyline extends WebShape {
  constructor(...args) {
    super(...args), _define_property(this, "tag", "polyline");
  }
}
class Svg extends WebShape {
  toDataURL(callback, options = {}) {
    const ref = this.elementRef.current;
    if (ref === null) {
      return;
    }
    const rect = getBoundingClientRect(ref);
    const width = Number(options.width) || rect.width;
    const height = Number(options.height) || rect.height;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));
    svg.appendChild(ref.cloneNode(true));
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context === null || context === void 0 || context.drawImage(img, 0, 0);
      callback(canvas.toDataURL().replace("data:image/png;base64,", ""));
    };
    img.src = `data:image/svg+xml;utf8,${encodeSvg(new window.XMLSerializer().serializeToString(svg))}`;
  }
  constructor(...args) {
    super(...args), _define_property(this, "tag", "svg");
  }
}
console.error.bind(console);
React.keep;
function themed(Component, optsIn = {}) {
  const opts = {
    defaultThemeColor: process.env.DEFAULT_ICON_THEME_COLOR || "$color",
    defaultStrokeWidth: 2,
    fallbackColor: "#000",
    resolveValues: process.env.TAMAGUI_ICON_COLOR_RESOLVE || "auto",
    ...optsIn
  };
  return (propsIn) => {
    const [props, style, theme] = usePropsAndStyle(propsIn, {
      ...opts,
      forComponent: Text,
      resolveValues: opts.resolveValues
    }), defaultColor = opts.defaultThemeColor, colorIn = style.color || (defaultColor ? theme[defaultColor] : void 0) || (props.disableTheme ? null : theme.color) || opts.fallbackColor, color = getVariable(colorIn), size = typeof props.size == "string" ? getTokenValue(props.size, "size") : props.size, strokeWidth = typeof props.strokeWidth == "string" ? getTokenValue(props.strokeWidth, "size") : props.strokeWidth ?? `${opts.defaultStrokeWidth}`, finalProps = {
      ...props,
      color,
      size,
      strokeWidth,
      style
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Component, {
      ...finalProps
    });
  };
}
const Home = themed(reactExports.memo(function(props) {
  const { color = "black", size = 24, ...otherProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Svg, {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...otherProps,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Path, {
        d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        stroke: color
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Polyline, {
        points: "9 22 9 12 15 12 15 22",
        stroke: color
      })
    ]
  });
}));
function loginGithub() {
  reactExports.useEffect(() => {
    authClient.signIn.social({
      provider: "github"
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Home, {});
}
export {
  loginGithub as default
};
