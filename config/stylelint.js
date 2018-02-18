module.exports = {
  defaultSeverity: 'warning',
  plugins: 'stylelint-scss',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines'
  ],
  rules: {
    'no-missing-end-of-source-newline': null,
    'order/properties-alphabetical-order': null,
    'number-leading-zero': null,
    'at-rule-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'color-named': null,
    'selector-list-comma-newline-after': null,
    'at-rule-no-unknown': null,
    'max-nesting-depth': null
  }
}