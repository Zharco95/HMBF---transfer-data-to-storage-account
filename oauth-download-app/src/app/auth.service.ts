import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectoryModel } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly clientId = 'HZUAfB9leOkCczrIaXg2hl3umwg20oM6';
    private readonly clientSecret = 'vryjBhpqBg4u_d885AQdmlisks5za9xXMmcK0x3TA0Fn3PpzgLEsp77XKqLHDd_P'; // Replace with actual secret
    private readonly redirectUri = 'http://localhost:4200/download';
    private readonly tokenUrl = 'https://login.vv-dev.nl/oauth/token';
    private readonly audience = 'https://api.vv-dev.nl';
    private readonly authorizeUrl = 'https://login.vv-dev.nl/authorize';


    constructor(private httpClient: HttpClient) { }

    getToken(code: string): Observable<any> {
        const body = {
            grant_type: 'authorization_code',
            client_id: this.clientId,
            client_secret: this.clientSecret,
            code,
            redirect_uri: this.redirectUri
        };
        return this.httpClient.post(this.tokenUrl, body, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    getVirtualVaultsOAuthUrl(tenantId: string): string {
        const state = Math.random().toString(36).substring(2);
        return `${this.authorizeUrl}?audience=${encodeURIComponent(this.audience)}&response_type=code&client_id=${this.clientId}&tenant_scope=${tenantId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&state=${state}`;
    }

    getDirectories(tenantId: string, accessToken: string): Observable<DirectoryModel[]> {
        const url = `https://api.vv-dev.nl/Tenants/${tenantId}/Documents`;
        return this.httpClient.get<DirectoryModel[]>(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    }

    downloadDocumentFile(tenantId: string, documentId: string, accessToken: string): Observable<Blob> {
    const url = `https://api.vv-dev.nl/Tenants/${tenantId}/Documents/${documentId}/File`;
    return this.httpClient.get(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        responseType: 'blob'
    });
}
}