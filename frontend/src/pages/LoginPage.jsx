import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';
import { getOAuthUrl, verifyOAuth } from '../api.js';

const COUNTRY_CODES = ['+1', '+44', '+61', '+86', '+81', '+65'];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [method, setMethod] = useState('mobile');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [code, setCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [authorizing, setAuthorizing] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please read and agree to the User Agreement and Applicant Privacy Policy.');
      return;
    }
    const account = method === 'email' ? email : `${countryCode} ${mobile}`;
    login(account);
    navigate('/usds/resume');
  };

  const socialLogin = async (provider) => {
    if (!agreed) {
      setError('Please read and agree to the User Agreement and Applicant Privacy Policy.');
      return;
    }
    if (authorizing) return;
    setError('');
    setAuthorizing(provider);

    // Open the popup synchronously so the browser doesn't block it.
    const popup = window.open('', 'oauth', 'width=460,height=620');
    if (popup) popup.document.write('Loading authorization…');

    try {
      const authUrl = await getOAuthUrl(provider);
      if (popup) popup.location.href = authUrl;
      else throw new Error('Popup blocked. Please allow popups and try again.');

      // Wait for the popup to finish authorization and post back a token.
      const token = await new Promise((resolve, reject) => {
        const onMessage = (event) => {
          const data = event.data;
          if (data && data.type === 'oauth-token' && data.provider === provider) {
            cleanup();
            resolve(data.token);
          }
        };
        const timer = setInterval(() => {
          if (popup && popup.closed) {
            cleanup();
            reject(new Error('Authorization was cancelled.'));
          }
        }, 500);
        const cleanup = () => {
          window.removeEventListener('message', onMessage);
          clearInterval(timer);
        };
        window.addEventListener('message', onMessage);
      });

      // Only now — after authorization completes — do we verify and sign in.
      const result = await verifyOAuth(provider, token);
      login(result.user.email, {
        display: result.user.name,
        name: result.user.name,
        provider,
      });
      navigate('/usds/resume');
    } catch (err) {
      if (popup && !popup.closed) popup.close();
      setError(err.message || 'Authorization failed. Please try again.');
    } finally {
      setAuthorizing('');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-tabs">
          <button
            className={method === 'email' ? 'active' : ''}
            onClick={() => setMethod('email')}
          >
            Sign in with Email
          </button>
          <button
            className={method === 'mobile' ? 'active' : ''}
            onClick={() => setMethod('mobile')}
          >
            Sign in with Mobile
          </button>
        </div>

        <form onSubmit={submit}>
          {method === 'email' ? (
            <>
              <input
                className="login-field"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="password-row">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 3l18 18M10.6 10.7a2 2 0 002.8 2.8M9.9 5.2A9.5 9.5 0 0112 5c6.5 0 10 7 10 7a17 17 0 01-3.2 3.9M6.1 6.2A17 17 0 002 12s3.5 7 10 7c1.2 0 2.3-.2 3.3-.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className="forgot-row">
                <a href="#">Forgot password?</a>
              </div>
            </>
          ) : (
            <>
              <div className="phone-row">
                <select
                  className="country-code"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="code-row">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button type="button" className="get-code">
                  Get code
                </button>
              </div>
            </>
          )}

          <button type="submit" className="login-submit">
            Sign in
          </button>

          {method === 'mobile' ? (
            <p className="login-note">
              No account? An account will be created upon mobile number verification.
            </p>
          ) : (
            <p className="login-note">
              Need an email account? <a href="#">Create account</a>
            </p>
          )}

          <div className="social-divider">
            <span>Sign in with</span>
          </div>
          <div className="social-login">
            <button
              type="button"
              className="social-btn social-facebook"
              aria-label="Sign in with Facebook"
              disabled={!!authorizing}
              onClick={() => socialLogin('facebook')}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.09 24 12.07z" fill="#fff" />
              </svg>
            </button>
            <button
              type="button"
              className="social-btn social-linkedin"
              aria-label="Sign in with LinkedIn"
              disabled={!!authorizing}
              onClick={() => socialLogin('linkedin')}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z" fill="#fff" />
              </svg>
            </button>
            <button
              type="button"
              className="social-btn social-google"
              aria-label="Sign in with Google"
              disabled={!!authorizing}
              onClick={() => socialLogin('google')}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6 12.2c0-.7-.06-1.4-.18-2.05H12v3.88h5.4a4.6 4.6 0 01-2 3.02v2.5h3.24c1.9-1.75 2.96-4.33 2.96-7.35z" fill="#4285F4" />
                <path d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.58-4.12H3.06v2.58A10 10 0 0012 22z" fill="#34A853" />
                <path d="M6.42 13.9a6 6 0 010-3.8V7.52H3.06a10 10 0 000 8.96l3.36-2.58z" fill="#FBBC05" />
                <path d="M12 6c1.47 0 2.78.5 3.82 1.5l2.86-2.86A10 10 0 0012 2a10 10 0 00-8.94 5.52l3.36 2.58C7.2 7.74 9.4 6 12 6z" fill="#EA4335" />
              </svg>
            </button>
          </div>

          <label className={`agree ${error ? 'agree-error' : ''}`}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (e.target.checked) setError('');
              }}
            />
            <span>
              I have read and agree to the <a href="#">User Agreement</a> and{' '}
              <a href="#">Applicant Privacy Policy</a>
            </span>
          </label>
          {error && <p className="agree-tip">{error}</p>}
        </form>
      </div>
    </div>
  );
}
