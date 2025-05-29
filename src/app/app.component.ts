import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

interface CampoOpcional {
  nombre: string;
  valor: string;
}

interface IdeaDeNegocio {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  estado: 'Borrador' | 'Validando' | 'Descartada';
  camposOpcionales?: CampoOpcional[];
}

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    CommonModule,   
    FormsModule    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ideas: IdeaDeNegocio[] = [];

  ideaActual: Partial<IdeaDeNegocio> = {
    titulo: '',
    descripcion: '',
    categoria: '',
    estado: 'Borrador',
    camposOpcionales: []
  };

  nuevoCampoOpcional: CampoOpcional = { nombre: '', valor: '' };

  editando: boolean = false;
  idIdeaEditar: number | null = null;

  categoriasDisponibles: string[] = ['Tecnología', 'Salud', 'Educación', 'Otro'];
  estadosDisponibles: ('Borrador' | 'Validando' | 'Descartada')[] = ['Borrador', 'Validando', 'Descartada'];

  private proximoId: number = 1;

  agregarCampoOpcional(): void {
    if (this.nuevoCampoOpcional.nombre && this.nuevoCampoOpcional.valor) {
      if (!this.ideaActual.camposOpcionales) {
        this.ideaActual.camposOpcionales = [];
      }
      this.ideaActual.camposOpcionales.push({ ...this.nuevoCampoOpcional });
      this.nuevoCampoOpcional = { nombre: '', valor: '' }; 
    } else {
      alert('Por favor, complete el nombre y valor del campo');
    }
  }



  guardarIdea(): void {
    if (!this.ideaActual.titulo || !this.ideaActual.descripcion || !this.ideaActual.categoria || !this.ideaActual.estado) {
      alert('Por favor, complete todos los campo');
      return;
    }

    if (this.editando && this.idIdeaEditar !== null) {
      const index = this.ideas.findIndex(idea => idea.id === this.idIdeaEditar);
      if (index !== -1) {
        this.ideas[index] = { ...this.ideaActual, id: this.idIdeaEditar } as IdeaDeNegocio;
      }
    } else {
      const nuevaIdea: IdeaDeNegocio = {
        ...this.ideaActual,
        id: this.proximoId++
      } as IdeaDeNegocio;
      this.ideas.push(nuevaIdea);
    }
    this.resetearFormulario();
  }

  editarIdea(idea: IdeaDeNegocio): void {
    this.editando = true;
    this.idIdeaEditar = idea.id;
    this.ideaActual = {
        ...idea,
        camposOpcionales: idea.camposOpcionales ? [...idea.camposOpcionales.map(c => ({...c}))] : []
    };
  }

  eliminarIdea(id: number): void {
    if (confirm('Esta seguro de que desea eliminar esta idea?')) {
      this.ideas = this.ideas.filter(idea => idea.id !== id);
      if (this.editando && this.idIdeaEditar === id) {
        this.resetearFormulario();
      }
    }
  }

  cancelarEdicion(): void {
    this.resetearFormulario();
  }

  resetearFormulario(): void {
    this.ideaActual = {
      titulo: '',
      descripcion: '',
      categoria: '',
      estado: 'Borrador',
      camposOpcionales: []
    };
    this.nuevoCampoOpcional = { nombre: '', valor: '' };
    this.editando = false;
    this.idIdeaEditar = null;
  }
}