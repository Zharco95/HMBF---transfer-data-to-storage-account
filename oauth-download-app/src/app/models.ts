export interface DirectoryModel {
    id: string;
    index: string | null;
    name: string;
    documents: DocumentModel[];
    directories: DirectoryModel[];
}
export interface DocumentModel {
    id: string;
    index: string | null;
    name: string;
    canDownload: boolean;
    fileExtension: string;
    lastModifiedAt: string;
    size: number | null;
}

export interface DocumentsResponse {
    documents: DocumentModel[];
}
