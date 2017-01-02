module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "airbnb",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "import",
        "jsx-a11y"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/extensions": [0, {".jsx": "always"}],
        "arrow-body-style": [0, ["error", "as-needed"]],
        "react/no-did-mount-set-state": [0, ['disallow-in-func']],
        "no-underscore-dangle": ["error",  { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }]
    }
};