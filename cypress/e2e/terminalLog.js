/**
 * Logs accessibility violations to the terminal in a readable format.
 * Used as a callback for cy.checkA11y.
 */
function terminalLog(violations) {
  violations.forEach(({ id, impact, description, nodes }) => {
    cy.task(
      'log',
      `${impact} impact: ${id} - ${description} (${nodes.length} node${nodes.length === 1 ? '' : 's'})`
    );
    nodes.forEach(({ target }) => {
      cy.task('log', `  Selector: ${target.join(', ')}`);
    });
  });
}

module.exports = { terminalLog };
