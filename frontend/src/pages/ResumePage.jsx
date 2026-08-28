import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const DEGREES = [
  'High School',
  "Associate's",
  "Bachelor's",
  "Master's",
  'PhD',
  'Other',
];

// Section keys that are simple repeatable free-text entries with a "+ Add".
const LIST_SECTIONS = [
  { key: 'work', title: 'Work Experience', placeholder: 'Company, role, dates, description' },
  { key: 'internship', title: 'Internship Experience', placeholder: 'Company, role, dates, description' },
  { key: 'project', title: 'Project Experience', placeholder: 'Project name, role, description' },
  { key: 'workSamples', title: 'Work Samples', placeholder: 'Link or description' },
  { key: 'honors', title: 'Honor and Awards', placeholder: 'Award name, issuer, date' },
  { key: 'languages', title: 'Language Skills', placeholder: 'Language, proficiency' },
  { key: 'selfIntro', title: 'Self Introduction', placeholder: 'Tell us about yourself' },
  { key: 'sns', title: 'SNS', placeholder: 'Platform, link' },
];

function splitAccount(account) {
  if (!account) return { code: '+1', number: '', email: '' };
  if (account.includes('@')) return { code: '+1', number: '', email: account };
  const m = /^(\+\d+)\s*(.*)$/.exec(account);
  if (m) return { code: m[1], number: m[2], email: '' };
  return { code: '+1', number: account, email: '' };
}

export default function ResumePage() {
  const navigate = useNavigate();
  const { user, resume, saveResume } = useAuth();

  const acct = splitAccount(user?.account);
  const [form, setForm] = useState(() =>
    resume || {
      fileName: '',
      name: '',
      countryCode: acct.code,
      mobile: acct.number,
      email: acct.email,
      education: [
        { school: '', degree: '', field: '', start: '', end: '' },
      ],
      lists: LIST_SECTIONS.reduce((acc, s) => ({ ...acc, [s.key]: [] }), {}),
    }
  );

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const setEdu = (idx, patch) =>
    setForm((f) => ({
      ...f,
      education: f.education.map((e, i) => (i === idx ? { ...e, ...patch } : e)),
    }));

  const addEdu = () =>
    setForm((f) => ({
      ...f,
      education: [...f.education, { school: '', degree: '', field: '', start: '', end: '' }],
    }));

  const addListItem = (key) =>
    setForm((f) => ({ ...f, lists: { ...f.lists, [key]: [...(f.lists[key] || []), ''] } }));

  const setListItem = (key, idx, value) =>
    setForm((f) => ({
      ...f,
      lists: { ...f.lists, [key]: f.lists[key].map((v, i) => (i === idx ? value : v)) },
    }));

  const removeListItem = (key, idx) =>
    setForm((f) => ({
      ...f,
      lists: { ...f.lists, [key]: f.lists[key].filter((_, i) => i !== idx) },
    }));

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (file) set({ fileName: file.name });
  };

  const done = () => {
    saveResume(form);
    navigate('/usds/applications');
  };

  return (
    <div className="resume-page">
      <div className="container">
        <h1 className="resume-title">Create Resume</h1>

        {/* Resume upload */}
        <section className="resume-section">
          <div className="resume-section-label">
            <h3>Resume</h3>
          </div>
          <div className="resume-section-body">
            <div className="resume-drop">
              <p className="drop-title">Drag your resume here</p>
              <label className="drop-btn">
                Select file
                <input type="file" hidden onChange={onFile} />
              </label>
              {form.fileName && <p className="drop-file">{form.fileName}</p>}
              <p className="drop-formats">
                Supported file formats: PDF, DOC, DOCX, PPT, PPTX, PNG, JPG, JPEG, HTML
              </p>
            </div>
          </div>
        </section>

        {/* Basic Information */}
        <section className="resume-section">
          <div className="resume-section-label">
            <h3>Basic Information</h3>
            <p className="section-hint">Please add basic information.</p>
          </div>
          <div className="resume-section-body">
            <div className="field">
              <label>Name</label>
              <input value={form.name} onChange={(e) => set({ name: e.target.value })} />
            </div>
            <div className="field">
              <label>Mobile</label>
              <div className="phone-row">
                <select
                  className="country-code"
                  value={form.countryCode}
                  onChange={(e) => set({ countryCode: e.target.value })}
                >
                  {['+1', '+44', '+61', '+86', '+81', '+65'].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input value={form.mobile} onChange={(e) => set({ mobile: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label>Email</label>
              <input value={form.email} onChange={(e) => set({ email: e.target.value })} />
            </div>
          </div>
        </section>

        {/* Work Experience (add-only) */}
        <ListSection
          section={LIST_SECTIONS[0]}
          items={form.lists.work}
          onAdd={() => addListItem('work')}
          onChange={(i, v) => setListItem('work', i, v)}
          onRemove={(i) => removeListItem('work', i)}
        />

        {/* Education */}
        <section className="resume-section">
          <div className="resume-section-label">
            <h3>Education</h3>
            <p className="section-hint">
              Please add education experience. If you are currently enrolled in school, please
              fill in your expected graduation date.
            </p>
          </div>
          <div className="resume-section-body">
            {form.education.map((edu, i) => (
              <div className="edu-block" key={i}>
                <div className="field">
                  <label>School name</label>
                  <input
                    value={edu.school}
                    onChange={(e) => setEdu(i, { school: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Degree</label>
                  <select value={edu.degree} onChange={(e) => setEdu(i, { degree: e.target.value })}>
                    <option value="">Select</option>
                    {DEGREES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Field of study</label>
                  <input
                    value={edu.field}
                    onChange={(e) => setEdu(i, { field: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Start &amp; end date</label>
                  <p className="section-hint">
                    If there is no accurate graduation date available, you can enter an estimated
                    graduation date
                  </p>
                  <div className="date-range">
                    <input
                      placeholder=""
                      value={edu.start}
                      onChange={(e) => setEdu(i, { start: e.target.value })}
                    />
                    <span className="dash">–</span>
                    <input
                      placeholder=""
                      value={edu.end}
                      onChange={(e) => setEdu(i, { end: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button className="add-link" onClick={addEdu}>
              + Add
            </button>
          </div>
        </section>

        {/* Remaining add-only sections */}
        {LIST_SECTIONS.slice(1).map((s) => (
          <ListSection
            key={s.key}
            section={s}
            items={form.lists[s.key]}
            onAdd={() => addListItem(s.key)}
            onChange={(i, v) => setListItem(s.key, i, v)}
            onRemove={(i) => removeListItem(s.key, i)}
          />
        ))}
      </div>

      <div className="resume-footer">
        <button className="done-btn" onClick={done}>
          Done
        </button>
      </div>
    </div>
  );
}

function ListSection({ section, items = [], onAdd, onChange, onRemove }) {
  return (
    <section className="resume-section list-section">
      <div className="resume-section-head">
        <h3>{section.title}</h3>
        <button className="add-link" onClick={onAdd}>
          + Add
        </button>
      </div>
      {items.length > 0 && (
        <div className="list-items">
          {items.map((v, i) => (
            <div className="list-item" key={i}>
              <textarea
                rows={2}
                placeholder={section.placeholder}
                value={v}
                onChange={(e) => onChange(i, e.target.value)}
              />
              <button className="remove-link" onClick={() => onRemove(i)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
