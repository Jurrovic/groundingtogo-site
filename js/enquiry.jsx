/* Enquiry delivery — posts form submissions straight to the inbox via FormSubmit
   (no server needed). Every enquiry arrives at GTG_ENQUIRY.to with the sender's
   address as Reply-To, so replying in your mail client goes direct to her. */
const GTG_ENQUIRY = {
  to: 'hello@groundingtogo.com',
  endpoint: (to) => 'https://formsubmit.co/ajax/' + encodeURIComponent(to),
};

/* Field order + labels as they appear in the email. */
const GTG_ENQUIRY_FIELDS = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['destination', 'Planned destination'],
  ['when', 'When'],
  ['style', 'Quiz result'],
  ['message', 'Message'],
];

function buildEnquiryPayload(form, source) {
  const p = {
    _subject: 'New enquiry from ' + (form.name || 'the website').trim(),
    _template: 'table',
    _captcha: 'false',
    _replyto: form.email || '',
  };
  GTG_ENQUIRY_FIELDS.forEach(([k, label]) => {
    const v = (form[k] || '').trim();
    if (v) p[label] = v;
  });
  p['Sent from'] = source || 'Website';
  return p;
}

/* Returns { ok: true } or { ok: false, error: 'message' } */
async function sendEnquiry(form, source) {
  try {
    const res = await fetch(GTG_ENQUIRY.endpoint(GTG_ENQUIRY.to), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(buildEnquiryPayload(form, source)),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && String(data.success) === 'true') return { ok: true };
    return { ok: false, error: data.message || 'That didn\u2019t go through. Please email hello@groundingtogo.com directly.' };
  } catch (e) {
    return { ok: false, error: 'No connection. Please email hello@groundingtogo.com directly.' };
  }
}

Object.assign(window, { GTG_ENQUIRY, GTG_ENQUIRY_FIELDS, buildEnquiryPayload, sendEnquiry });
