// Serfis contact form: no backend yet, so submitting opens the visitor's
// mail client with the message pre-filled, then shows a confirmation panel.
// Swap this for a real form endpoint once one exists.
(function () {
  var form = document.getElementById('contact-form');
  var confirmPanel = document.getElementById('confirm-panel');
  var sendAnother = document.getElementById('send-another');
  if (!form || !confirmPanel) return;

  var FIELD_LABELS = {
    name: 'Name',
    email: 'Work email',
    company: 'Company',
    companyUrl: 'Company URL',
    industry: 'Industry',
    stage: 'Company stage',
    sells: 'What the company sells',
    phone: 'Phone',
    help: 'What they are hoping Serfis helps with',
    source: 'Where they heard about Serfis'
  };

  function buildBody(data) {
    var lines = [];
    ['name', 'email', 'company', 'companyUrl', 'industry', 'stage', 'sells', 'phone'].forEach(function (key) {
      var value = (data.get(key) || '').toString().trim();
      if (value) lines.push(FIELD_LABELS[key] + ': ' + value);
    });
    lines.push('');
    lines.push(FIELD_LABELS.help + ':');
    lines.push((data.get('help') || '').toString().trim());
    var source = (data.get('source') || '').toString().trim();
    if (source) {
      lines.push('');
      lines.push(FIELD_LABELS.source + ': ' + source);
    }
    return lines.join('\n');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = new FormData(form);
    var company = (data.get('company') || '').toString().trim();
    var name = (data.get('name') || '').toString().trim();
    var subject = 'New inquiry from ' + (company || name || 'the Serfis site');
    var mailto = 'mailto:hello@serfis.ai'
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(buildBody(data));

    window.location.href = mailto;

    form.hidden = true;
    confirmPanel.hidden = false;
    confirmPanel.focus && confirmPanel.setAttribute('tabindex', '-1');
    confirmPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  if (sendAnother) {
    sendAnother.addEventListener('click', function () {
      form.reset();
      confirmPanel.hidden = true;
      form.hidden = false;
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();
