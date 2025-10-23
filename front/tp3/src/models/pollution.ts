export class Pollution {
    nom: string;
    lieu: string;
    dateObservation: string;
    typePollution: string;
    description: string;
    latitude: string;
    longitude: string;
    imageUrl: string;

    constructor(nom: string, lieu: string, dateObservation: string, typePollution: string, niveauPollution: number, description: string, latitude: string, longitude: string, imageUrl: string) {
        this.nom = nom;
        this.lieu = lieu;
        this.dateObservation = dateObservation;
        this.typePollution = typePollution;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.imageUrl = imageUrl;
    }
}