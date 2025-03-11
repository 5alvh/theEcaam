import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoemsService } from '../service/poems.service';
import { Poem } from '../common/poem';
import { Category } from '../common/category';
import { PoemComponent } from "../poem/poem.component";
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-home',
  imports: [FormsModule, NgIf, PoemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  poems: Poem[] = [];
  searchText: string = '';
  dropdownOpen: boolean = false;
  poemsService = inject(PoemsService);
  errorText: string = 'Busca una categoría del menú desplegable o busca un categoría en particular';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCategory(category: Category|string) {
    this.searchText = category.toString();
    this.dropdownOpen = false; 

    this.poemsService.getPoemsByCategory(category).subscribe(
      (response) => {
        this.poems = response;
      }
      ,(error) => {
        this.errorText = 'No se encontraron poemas de esta categoría';
        console.error('Error al obtener poemas por categoría:', error);
      }
    );
    
  } 
    
}
