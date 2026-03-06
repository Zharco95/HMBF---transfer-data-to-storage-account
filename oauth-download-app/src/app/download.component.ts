import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DirectoryModel } from './models';

@Component({
    selector: 'app-download',
    standalone: true,
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.scss']
})
export class DownloadComponent {
    code: string | null = null;
    jwtToken: string | null = null;
    directories: DirectoryModel[] = [];
    documentNames: string[] = [];
    tenantId: string = 'dr:20800';

    constructor(private authService: AuthService, private httpClient: HttpClient) {
        const params = new URLSearchParams(window.location.search);
        this.code = params.get('code');
        if (this.code) {
            this.authService.getToken(this.code).subscribe({
                next: (result) => {
                    this.jwtToken = result.access_token || null;
                },
                error: (err) => {
                    this.jwtToken = null;
                }
            });
        }
    }
    uploadToAzure(blob: Blob, fileName: string, sasUrl: string): Observable<any> {
        const parsedSasUrl = new URL(sasUrl);
        const containerPath = parsedSasUrl.pathname.replace(/\/$/, '');
        const encodedFileName = encodeURIComponent(fileName);
        const uploadUrl = `${parsedSasUrl.origin}${containerPath}/${encodedFileName}${parsedSasUrl.search}`;

        return this.httpClient.put(uploadUrl, blob, {
            headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': blob.type || 'application/octet-stream'
            }
        });
    }

    download() {
        if (!this.jwtToken || !this.tenantId) return;
        this.authService.getDirectories(this.tenantId, this.jwtToken).subscribe({
            next: (dirs) => {
                const firstdoc = dirs[0]?.documents[0];
                if (!firstdoc) {
                    this.directories = dirs;
                    this.documentNames = [];
                    return;
                }

                this.authService.downloadDocumentFile(this.tenantId, firstdoc.id, this.jwtToken!).subscribe({
                    next: (fileBlob) => {
                        const sasUrl = 'https://bdodtddssa.blob.core.windows.net/virtual-vaults-hackathon?sv=2023-01-03&st=2026-02-27T09%3A52%3A31Z&se=2026-02-28T09%3A52%3A31Z&sr=c&sp=racwlf&sig=KgjQZOO%2FOuED7aIExXHdjO9VBxQRnAxuG4Jplt74Rpo%3D';
                        console.log(fileBlob);
                        this.uploadToAzure(fileBlob, firstdoc.name, sasUrl).subscribe({
                            next: () => {
                                console.log('File uploaded successfully');
                            },
                            error: () => {
                            }
                        });


                        this.directories = dirs;
                        this.documentNames = dirs.flatMap(d => d.documents.map(doc => doc.name));
                    },
                    error: (err) => {
                        this.directories = [];
                        this.documentNames = [];
                    }
                });
            }
        });
    }
}