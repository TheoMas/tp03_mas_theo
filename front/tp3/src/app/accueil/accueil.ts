import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule, FormsModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {
  searchTerm: string = '';
  pollutions: any[] = [];

  constructor(private apiService: ApiService) {}
  
  ngOnInit() {
    this.loadPollutions();
  }

  loadPollutions() {
    this.apiService.getPollutions().subscribe(pollutions => {
      this.pollutions = pollutions;
    });
  }

  viewDetails(nom: string) {
    this.apiService.getPollutionByName(nom).subscribe(pollution => {
      // Logic to view details of the pollution
    });
  }

  modifyPollution(nom: string) {
    this.apiService.getPollutionByName(nom).subscribe(pollution => {
      // Logic to modify the pollution
    });
  }

  deletePollution(nom: string) {
    // Logic to delete the pollution
  }

  getFilteredPollutions() {
    return this.pollutions.filter(pollution =>
      pollution.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
