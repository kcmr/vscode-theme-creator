(function(d) {
  const updateCSSVars = function(e) {
    const { dataset: { cssVar }, value } = e.target;
    d.documentElement.style.setProperty(cssVar, value);
  };

  const handleFormReset = function(e) {
    submitBtn.disabled = true;
    d.documentElement.removeAttribute('style');
    form.addEventListener('change', enableSubmit);
  };

  const enableSubmit = function() {
    submitBtn.disabled = false;
    form.removeEventListener('change', enableSubmit);
  };

  const inputs = d.querySelectorAll('input[type="color"]');
  const form = d.querySelector('form');
  const submitBtn = d.querySelector('button[type="submit"]');

  for (const input of inputs) {
    input.addEventListener('change', updateCSSVars);
  }

  form.addEventListener('reset', handleFormReset);
  form.addEventListener('change', enableSubmit);
}(document));