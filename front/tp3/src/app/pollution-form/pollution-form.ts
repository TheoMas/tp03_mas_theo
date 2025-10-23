import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Pollution } from '../../models/pollution';

@Component({
  selector: 'app-pollution-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pollution-form.html',
  styleUrl: './pollution-form.css',
})
export class PollutionForm implements OnInit {
  pollutionForm!: FormGroup;
  isEditMode: boolean = false;
  pollutionId: number | null = null;
  isLoading: boolean = false;
  submitError: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Initialiser le formulaire réactif
    this.initializeForm();

    // Vérifier si on est en mode édition
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.pollutionId = Number(id);
        this.loadPollutionData(this.pollutionId);
      }
    });
  }

  initializeForm() {
    this.pollutionForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      lieu: ['', [Validators.required]],
      dateObservation: ['', [Validators.required]],
      typePollution: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]]
    });
  }

  loadPollutionData(id: number) {
    this.isLoading = true;
    this.apiService.getPollutionById(id).subscribe({
      next: (pollution) => {
        // Remplir le formulaire avec les données existantes
        this.pollutionForm.patchValue({
          nom: pollution.nom,
          lieu: pollution.lieu,
          dateObservation: pollution.dateObservation,
          typePollution: pollution.typePollution,
          description: pollution.description,
          latitude: pollution.latitude,
          longitude: pollution.longitude,
          imageUrl: pollution.imageUrl
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la pollution:', error);
        this.submitError = 'Erreur lors du chargement des données';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.pollutionForm.valid) {
      this.isLoading = true;
      this.submitError = '';

      const pollutionData: Pollution = {
        id: this.pollutionId || 0,
        ...this.pollutionForm.value
      };

      if (this.isEditMode && this.pollutionId) {
        // Mode édition - mettre à jour
        this.apiService.updatePollution(this.pollutionId, pollutionData).subscribe({
          next: () => {
            alert('Pollution modifiée avec succès!');
            this.router.navigate(['/accueil']);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
            this.submitError = 'Erreur lors de la modification de la pollution';
            this.isLoading = false;
          }
        });
      } else {
        // Mode création - créer une nouvelle pollution
        this.apiService.createPollution(pollutionData).subscribe({
          next: () => {
            alert('Pollution créée avec succès!');
            this.router.navigate(['/accueil']);
          },
          error: (error) => {
            console.error('Erreur lors de la création:', error);
            this.submitError = 'Erreur lors de la création de la pollution';
            this.isLoading = false;
          }
        });
      }
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.pollutionForm.controls).forEach(key => {
        this.pollutionForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel() {
    this.router.navigate(['/accueil']);
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get nom() { return this.pollutionForm.get('nom'); }
  get lieu() { return this.pollutionForm.get('lieu'); }
  get dateObservation() { return this.pollutionForm.get('dateObservation'); }
  get typePollution() { return this.pollutionForm.get('typePollution'); }
  get description() { return this.pollutionForm.get('description'); }
  get latitude() { return this.pollutionForm.get('latitude'); }
  get longitude() { return this.pollutionForm.get('longitude'); }
  get imageUrl() { return this.pollutionForm.get('imageUrl'); }
}
