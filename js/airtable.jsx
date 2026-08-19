/* Airtable delivery — writes each completed quiz (and each consultation request
   from the results page) straight into an Airtable base.

   SETUP: fill in token + baseId below. See "Airtable setup.html" for the exact
   table and field names to create, and how to make a write-only token. */
const GTG_AIRTABLE = {
  token: '',                    // Personal access token, scope: data.records:write
  baseId: '',                   // e.g. appXXXXXXXXXXXXXX
  quizTable: 'Quiz responses',
  requestTable: 'Consultation requests',
};

/* Short, readable column names for each quiz question, in order. */
const GTG_QUIZ_COLUMNS = [
  'Q1 How she is doing',
  'Q2 What is missing',
  'Q3 Sense of direction',
  'Q4 Perfect day',
  'Q5 What success looks like',
  'Q6 Openness',
  'Q7 Environment',
  'Q8 Feelings on solo',
  'Q9 Planning style',
  'Q10 When plans slip',
  'Q11 What is holding her back',
  'Q12 Departing from',
];

function gtgAirtableReady() {
  return Boolean(GTG_AIRTABLE.token && GTG_AIRTABLE.baseId);
}

/* Turn the quiz's internal tags into the full answer text a human can read. */
function gtgQuizFields(tags, email, result) {
  const fields = {
    'Submitted': new Date().toISOString(),
    'Email': email || '',
  };
  GTG_WB_QUESTIONS.forEach((q, i) => {
    const tag = tags['q' + (i + 1)];
    const opt = tag ? q.opts.filter((o) => o.tag === tag)[0] : null;
    fields[GTG_QUIZ_COLUMNS[i] || q.id] = opt ? opt.label : '';
    fields['Tag ' + q.id.toUpperCase()] = tag || '';
  });
  if (result) {
    fields['Match — closer to home'] = result.near || '';
    fields['Match — further afield'] = result.far || '';
    fields['Suggested first move'] = result.actName || '';
  }
  fields['Completed'] = Object.keys(tags).length + ' of ' + GTG_WB_QUESTIONS.length;
  return fields;
}

async function gtgAirtableCreate(table, fields) {
  if (!gtgAirtableReady()) return { ok: false, error: 'not-configured' };
  try {
    const url = 'https://api.airtable.com/v0/' + GTG_AIRTABLE.baseId + '/' + encodeURIComponent(table);
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + GTG_AIRTABLE.token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: [{ fields: fields }], typecast: true }),
    });
    if (res.ok) return { ok: true };
    const data = await res.json().catch(() => ({}));
    return { ok: false, error: (data.error && (data.error.message || data.error.type)) || 'Airtable rejected the record.' };
  } catch (e) {
    return { ok: false, error: 'Could not reach Airtable.' };
  }
}

/* Queue anything that fails so nothing is silently lost. */
function gtgQueueLocally(kind, fields) {
  try {
    const key = 'gtg_unsent';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push({ kind: kind, fields: fields, at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list.slice(-50)));
  } catch (e) {}
}

async function sendQuizToAirtable(tags, email, result) {
  const fields = gtgQuizFields(tags, email, result);
  const res = await gtgAirtableCreate(GTG_AIRTABLE.quizTable, fields);
  if (!res.ok) gtgQueueLocally('quiz', fields);
  return res;
}

async function sendRequestToAirtable(req, tags, result) {
  const fields = {
    'Submitted': new Date().toISOString(),
    'Name': req.name || '',
    'Email': req.email || '',
    'WhatsApp': req.whatsapp || '',
    'Message': req.message || '',
    'Match — closer to home': (result && result.near) || '',
    'Match — further afield': (result && result.far) || '',
  };
  if (tags) {
    GTG_WB_QUESTIONS.forEach((q, i) => {
      const tag = tags['q' + (i + 1)];
      const opt = tag ? q.opts.filter((o) => o.tag === tag)[0] : null;
      if (opt) fields[GTG_QUIZ_COLUMNS[i] || q.id] = opt.label;
    });
  }
  const res = await gtgAirtableCreate(GTG_AIRTABLE.requestTable, fields);
  if (!res.ok) gtgQueueLocally('request', fields);
  return res;
}

Object.assign(window, {
  GTG_AIRTABLE, GTG_QUIZ_COLUMNS, gtgAirtableReady, gtgQuizFields,
  sendQuizToAirtable, sendRequestToAirtable,
});
