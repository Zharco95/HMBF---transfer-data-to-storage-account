import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-bg">
      <div class="login-card">
        <div class="icon-circle">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path fill="#00eaff" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg>
        </div>
        <h2>Sign in to Download</h2>
        <p class="subtitle">Authenticate securely with OAuth to access your files.</p>
        <button class="tech-btn" (click)="login()">Login with OAuth</button>
      </div>
    </div>
  `,
  styles: [`
    .login-bg {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f2027 0%, #2c5364 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login-card {
      background: #181f2a;
      border-radius: 18px;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      padding: 2.5rem 2.5rem 2rem 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 340px;
      max-width: 90vw;
    }
    .icon-circle {
      background: linear-gradient(135deg, #00eaff 0%, #005bea 100%);
      border-radius: 50%;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.2rem;
      box-shadow: 0 2px 16px #00eaff44;
    }
    h2 {
      color: #fff;
      margin-bottom: 0.5rem;
      font-weight: 600;
      letter-spacing: 0.01em;
    }
    .subtitle {
      color: #b0c4d6;
      margin-bottom: 2rem;
      font-size: 1.05em;
      text-align: center;
    }
    .tech-btn {
      background: linear-gradient(90deg, #00eaff 0%, #005bea 100%);
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 0.9em 2.2em;
      font-size: 1.1em;
      font-weight: 600;
      letter-spacing: 0.03em;
      box-shadow: 0 2px 8px #00eaff33;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
    }
    .tech-btn:hover {
      background: linear-gradient(90deg, #005bea 0%, #00eaff 100%);
      transform: translateY(-2px) scale(1.03);
    }
  `]
})
export class LoginComponent {
  login() {
    const tenantId = 'dr:20800'; // Replace with actual tenant ID
    window.location.href = this.authService.getVirtualVaultsOAuthUrl(tenantId);
  }
  constructor(private authService: AuthService) { }
}