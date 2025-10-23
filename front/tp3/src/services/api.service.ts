import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, of } from "rxjs";
import { environment } from "../environnements/environment.dev";
import { Pollution } from "../models/pollution";


@Injectable()
export class ApiService {
    private readonly STORAGE_KEY = 'pollutions_data';

    constructor(private http: HttpClient) {
        // Initialiser le localStorage avec les données du JSON au premier chargement
        this.initializeLocalStorage();
    }

    // Initialiser le localStorage si vide
    private initializeLocalStorage() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (!stored) {
            this.http.get<Pollution[]>(environment.apiUrl).subscribe(pollutions => {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pollutions));
            });
        }
    }

    // Récupérer les données depuis le localStorage ou le JSON
    private getStoredPollutions(): Observable<Pollution[]> {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            return of(JSON.parse(stored));
        }
        return this.http.get<Pollution[]>(environment.apiUrl);
    }

    // Sauvegarder dans le localStorage
    private savePollutions(pollutions: Pollution[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pollutions));
    }

    // READ - Récupérer toutes les pollutions
    getPollutions(): Observable<Pollution[]> {
        return this.getStoredPollutions();
    }

    // READ - Récupérer une pollution par id
    getPollutionById(id: number): Observable<Pollution> {
        return this.getStoredPollutions().pipe(
            map(pollutions => {
                const pollution = pollutions.find(p => p.id === id);
                if (!pollution) {
                    throw new Error(`Pollution with id ${id} not found`);
                }
                return pollution;
            })
        );
    }

    // CREATE - Créer une nouvelle pollution
    createPollution(pollution: Pollution): Observable<Pollution> {
        return this.getStoredPollutions().pipe(
            map(pollutions => {
                // Générer un nouvel ID
                const newId = pollutions.length > 0 
                    ? Math.max(...pollutions.map(p => p.id)) + 1 
                    : 1;
                const newPollution = { ...pollution, id: newId };
                
                // Ajouter la nouvelle pollution
                pollutions.push(newPollution);
                this.savePollutions(pollutions);
                
                return newPollution;
            })
        );
    }

    // UPDATE - Mettre à jour une pollution existante
    updatePollution(id: number, pollution: Pollution): Observable<Pollution> {
        return this.getStoredPollutions().pipe(
            map(pollutions => {
                const index = pollutions.findIndex(p => p.id === id);
                if (index === -1) {
                    throw new Error(`Pollution with id ${id} not found`);
                }
                
                // Mettre à jour la pollution
                pollutions[index] = { ...pollution, id };
                this.savePollutions(pollutions);
                
                return pollutions[index];
            })
        );
    }

    // DELETE - Supprimer une pollution
    deletePollution(id: number): Observable<void> {
        return this.getStoredPollutions().pipe(
            map(pollutions => {
                const filtered = pollutions.filter(p => p.id !== id);
                if (filtered.length === pollutions.length) {
                    throw new Error(`Pollution with id ${id} not found`);
                }
                
                this.savePollutions(filtered);
                return undefined;
            })
        );
    }

    // BONUS - Réinitialiser les données depuis le JSON
    resetData(): Observable<Pollution[]> {
        return this.http.get<Pollution[]>(environment.apiUrl).pipe(
            map(pollutions => {
                this.savePollutions(pollutions);
                return pollutions;
            })
        );
    }
}