module.exports = {
    "extends": ["airbnb", "prettier", "prettier/react"],
    "plugins": ["prettier"],
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 2016,
      "sourceType": "module"
    },
    "env": {
      "es6": true,
      "browser": true,
      "node": true
    },
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "class-methods-use-this": [0],
      "linebreak-style": [0],
      "arrow-body-style": [0],
      "no-underscore-dangle": [0],
      "no-lonely-if": [0]
    }
  }