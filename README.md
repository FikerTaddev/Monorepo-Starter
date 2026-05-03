# Monorepo Platform — Control Plane Boilerplate

## Overview

This repository provides a monorepo structure with a control plane system and modular service architecture.

---

## Architecture

```
apps/
  api/           → sample backend service
  web/           → sample frontend service

  admin-api/     → control plane backend
  admin-web/     → control plane frontend

packages/
  shared utilities and libraries
```

---

## System Design

The system is divided into two layers.

### Control Plane

* admin-api
* admin-web

Responsible for system management functions including users, roles, permissions, logs, and service control.

### Application Layer

* api
* web

Base applications used as starting points for custom implementations.

---

## Admin System Responsibilities

* user management
* role and permission management
* system orchestration
* audit logging
* service monitoring

---

## Core Concepts

### Services as entities

Each application is treated as an independent service.

### Central control

The admin system provides a unified interface for managing system state.

### Separation of concerns

Control logic is isolated from application logic.

---

## Tech Stack

* TurboRepo with pnpm
* NestJS for backend services
* Next.js for frontend applications
* JWT authentication
* PostgreSQL database

---

## Features

* authentication
* role-based access control
* user management
* service management
* audit logs

---

## Environment Setup

Each application contains its own environment configuration:

```
apps/api/.env
apps/web/.env
apps/admin-api/.env
apps/admin-web/.env
```

---

## Development

Run all services:

```
pnpm dev
```

Run a specific service:

```
pnpm --filter admin-api dev
pnpm --filter web dev
```

---

## Adding Applications

New applications can be added under the apps directory.

Typical structure:

```
apps/<app-name>/
  src/
  package.json
```

Each application is independent and follows the same runtime structure.

---

## Adding Shared Packages

Reusable code is placed in the packages directory.

```
packages/<package-name>/
  src/
  package.json
```

Packages are imported across applications.

---

## Contributing

### Bug fixes

* create a branch
* reproduce the issue
* apply minimal fix
* commit with descriptive message

### Shared packages

Add reusable logic inside packages and avoid application-specific code.

---

## Rules

* no cross application runtime coupling
* shared logic must go through packages
* each service must run independently
* keep changes isolated

---
export const TokenType = { // Single-character tokens LEFT_PAREN: "LEFT_PAREN", RIGHT_PAREN: "RIGHT_PAREN", LEFT_BRACE: "LEFT_BRACE", RIGHT_BRACE: "RIGHT_BRACE", COMMA: "COMMA", DOT: "DOT", SEMICOLON: "SEMICOLON",

// Operators PLUS: "PLUS", MINUS: "MINUS", STAR: "STAR", SLASH: "SLASH", PERCENT: "PERCENT",

ASSIGN: "ASSIGN", EQUAL_EQUAL: "EQUAL_EQUAL", BANG: "BANG", BANG_EQUAL: "BANG_EQUAL",

GREATER: "GREATER", GREATER_EQUAL: "GREATER_EQUAL", LESS: "LESS", LESS_EQUAL: "LESS_EQUAL",

// Literals IDENTIFIER: "IDENTIFIER", NUMBER: "NUMBER", STRING: "STRING",

// Keywords LET: "LET", CONST: "CONST", FUNC: "FUNC", IF: "IF", ELSE: "ELSE", WHILE: "WHILE", RETURN: "RETURN", TRUE: "TRUE", FALSE: "FALSE", NULL: "NULL", PRINT: "PRINT",

EOF: "EOF", };

export class Token { constructor(type, lexeme, literal, line, column) { this.type = type; this.lexeme = lexeme; this.literal = literal; this.line = line; this.column = column; }

toString() { return ${this.type} ${this.lexeme} ${this.literal}; } }

export default class Lexer { constructor(source) { this.source = source; this.tokens = [];

this.start = 0;
this.current = 0;

this.line = 1;
this.column = 1;

this.keywords = {
  let: TokenType.LET,
  const: TokenType.CONST,
  func: TokenType.FUNC,
  if: TokenType.IF,
  else: TokenType.ELSE,
  while: TokenType.WHILE,
  return: TokenType.RETURN,
  true: TokenType.TRUE,
  false: TokenType.FALSE,
  null: TokenType.NULL,
  print: TokenType.PRINT,
};

}

tokenize() { while (!this.isAtEnd()) { this.start = this.current; this.scanToken(); }

this.tokens.push(
  new Token(TokenType.EOF, "", null, this.line, this.column)
);

return this.tokens;

}

scanToken() { const char = this.advance();

switch (char) {
  case "(":
    this.addToken(TokenType.LEFT_PAREN);
    break;

  case ")":
    this.addToken(TokenType.RIGHT_PAREN);
    break;

  case "{":
    this.addToken(TokenType.LEFT_BRACE);
    break;

  case "}":
    this.addToken(TokenType.RIGHT_BRACE);
    break;

  case ",":
    this.addToken(TokenType.COMMA);
    break;

  case ".":
    this.addToken(TokenType.DOT);
    break;

  case ";":
    this.addToken(TokenType.SEMICOLON);
    break;

  case "+":
    this.addToken(TokenType.PLUS);
    break;

  case "-":
    this.addToken(TokenType.MINUS);
    break;

  case "*":
    this.addToken(TokenType.STAR);
    break;

  case "%":
    this.addToken(TokenType.PERCENT);
    break;

  case "!":
    this.addToken(
      this.match("=")
        ? TokenType.BANG_EQUAL
        : TokenType.BANG
    );
    break;

  case "=":
    this.addToken(
      this.match("=")
        ? TokenType.EQUAL_EQUAL
        : TokenType.ASSIGN
    );
    break;

  case "<":
    this.addToken(
      this.match("=")
        ? TokenType.LESS_EQUAL
        : TokenType.LESS
    );
    break;

  case ">":
    this.addToken(
      this.match("=")
        ? TokenType.GREATER_EQUAL
        : TokenType.GREATER
    );
    break;

  case "/":
    if (this.match("/")) {
      while (this.peek() !== "\n" && !this.isAtEnd()) {
        this.advance();
      }
    } else {
      this.addToken(TokenType.SLASH);
    }
    break;

  case " ":
  case "\r":
  case "\t":
    break;

  case "\n":
    this.line++;
    this.column = 1;
    break;

  case '"':
    this.string();
    break;

  default:
    if (this.isDigit(char)) {
      this.number();
    } else if (this.isAlpha(char)) {
      this.identifier();
    } else {
      throw new Error(
        `Unexpected character '${char}' at line ${this.line}, column ${this.column}`
      );
    }
}

}

identifier() { while (this.isAlphaNumeric(this.peek())) { this.advance(); }

const text = this.source.slice(this.start, this.current);

const type = this.keywords[text] || TokenType.IDENTIFIER;

this.addToken(type);

}

number() { while (this.isDigit(this.peek())) { this.advance(); }

if (this.peek() === "." && this.isDigit(this.peekNext())) {
  this.advance();

  while (this.isDigit(this.peek())) {
    this.advance();
  }
}

const value = this.source.slice(this.start, this.current);

this.addToken(TokenType.NUMBER, Number(value));

}

string() { while (this.peek() !== '"' && !this.isAtEnd()) { if (this.peek() === "\n") { this.line++; this.column = 1; }

this.advance();
}

if (this.isAtEnd()) {
  throw new Error(`Unterminated string at line ${this.line}`);
}

this.advance();

const value = this.source.slice(this.start + 1, this.current - 1);

this.addToken(TokenType.STRING, value);

}

match(expected) { if (this.isAtEnd()) { return false; }

if (this.source[this.current] !== expected) {
  return false;
}

this.current++;
this.column++;

return true;

}

peek() { if (this.isAtEnd()) { return "\0"; }

return this.source[this.current];

}

peekNext() { if (this.current + 1 >= this.source.length) { return "\0"; }

return this.source[this.current + 1];

}

isAlpha(char) { return ( (char >= "a" && char <= "z") || (char >= "A" && char <= "Z") || char === "_" ); }

isDigit(char) { return char >= "0" && char <= "9"; }

isAlphaNumeric(char) { return this.isAlpha(char) || this.isDigit(char); }

isAtEnd() { return this.current >= this.source.length; }

advance() { const char = this.source[this.current];

this.current++;
this.column++;

return char;

}

addToken(type, literal = null) { const text = this.source.slice(this.start, this.current);

this.tokens.push(
  new Token(type, text, literal, this.line, this.column)
);

} }

// Example usage

const source = const x = 10; let y = x + 20; print(y);;

const lexer = new Lexer(source);

const tokens = lexer.tokenize();

console.log(tokens);


