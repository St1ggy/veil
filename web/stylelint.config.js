import stylelintScss from '@st1ggy/linter-config/stylelint-scss'

export default {
  ...stylelintScss,
  rules: {
    ...stylelintScss.rules,
    // The site intentionally uses OKLCH and native controls with type selectors.
    'plugin/no-unsupported-browser-features': null,
    'selector-no-qualifying-type': null,
  },
}
