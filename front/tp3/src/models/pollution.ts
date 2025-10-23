export class Pollution {
    id: number;
    nom: string;
    lieu: string;
    dateObservation: string;
    typePollution: string;
    description: string;
    latitude: string;
    longitude: string;
    imageUrl: string;

    constructor(id: number, nom: string, lieu: string, dateObservation: string, typePollution: string, description: string, latitude: string, longitude: string, imageUrl: string) {
        this.id = id;
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