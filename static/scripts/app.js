(function(d) {
  const updateCSSVars = function(e) {
    const { dataset: { cssVar }, value } = e.target;
    document.documentElement.style.setProperty(cssVar, value);
  };

  const resetStyles = function(e) {
    document.documentElement.removeAttribute('style');
  };

  const inputs = d.querySelectorAll('input[type="color"]');
  for (const input of inputs) {
    input.addEventListener('change', updateCSSVars);
  }

  const form = d.querySelector('form');
  form.addEventListener('reset', resetStyles);
}(document));