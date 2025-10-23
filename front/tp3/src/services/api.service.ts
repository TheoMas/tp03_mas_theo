import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environnements/environment.dev";
import { Pollution } from "../models/pollution";


@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {}

    // READ - Récupérer toutes les pollutions
    getPollutions(): Observable<Pollution[]> {
        return this.http.get<Pollution[]>(environment.apiUrl);
    }

    // READ - Récupérer une pollution par nom
    getPollutionByName(nom: string): Observable<Pollution> {
        return this.http.get<Pollution>(`${environment.apiUrl}/${nom}`);
    }

    // CREATE - Créer une nouvelle pollution
    createPollution(pollution: Pollution): Observable<Pollution> {
        return this.http.post<Pollution>(environment.apiUrl, pollution);
    }

    // UPDATE - Mettre à jour une pollution existante
    updatePollution(nom: string, pollution: Pollution): Observable<Pollution> {
        return this.http.put<Pollution>(`${environment.apiUrl}/${nom}`, pollution);
    }

    // DELETE - Supprimer une pollution
    deletePollution(nom: string): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/${nom}`);
    }
}