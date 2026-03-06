
import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { DownloadComponent } from './download.component';

export const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'auth/callback', component: LoginComponent }, // Handles OAuth callback
	{ path: 'download', component: DownloadComponent }
];
