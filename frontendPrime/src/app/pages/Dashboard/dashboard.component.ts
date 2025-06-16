import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TextareaModule } from 'primeng/textarea';

interface Chamado {
  id: string;
  titulo: string;
  descricao: string;
  dataAbertura: Date;
  dataFechamento?: Date;
  nivelProblema: string;
  status: string;
  tecnico: string;
}

@Component({
  selector: 'app-table-chamados',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, ConfirmationService],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    TagModule,
    ConfirmDialogModule,
    IconFieldModule,
    DialogModule,
    DropdownModule,
    TextareaModule,
  ],
})
export class TableChamadosComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  chamados: Chamado[] = [];
  chamadoDialog: boolean = false;
  chamado!: Chamado;
  submitted: boolean = false;

  niveisProblema = [
    { label: 'N1', value: 'N1' },
    { label: 'N2', value: 'N2' },
    { label: 'N3', value: 'N3' },
  ];

  statuses = [
    { label: 'Aberto', value: 'Aberto' },
    { label: 'Em Andamento', value: 'Em Andamento' },
    { label: 'Fechado', value: 'Fechado' },
  ];

  tecnicos = [
    { nome: 'João Silva', id: '1' },
    { nome: 'Maria Santos', id: '2' },
    { nome: 'Pedro Oliveira', id: '3' },
  ];

  ngOnInit() {
    this.loadChamados();
  }

  loadChamados() {
    this.chamados = [
      {
        id: 'CH001',
        titulo: 'Erro ao acessar o sistema',
        descricao: 'Não consigo acessar o sistema principal',
        dataAbertura: new Date('2025-06-01'),
        dataFechamento: undefined,
        nivelProblema: 'N1',
        status: 'Aberto',
        tecnico: '1'
      },
      {
        id: 'CH002',
        titulo: 'Solicitação de atualização',
        descricao: 'Preciso atualizar o software',
        dataAbertura: new Date('2025-06-05'),
        dataFechamento: new Date('2025-06-10'),
        nivelProblema: 'N2',
        status: 'Fechado',
        tecnico: '2'
      },
    ];
  }

  openNew() {
    this.chamado = {
      id: '',
      titulo: '',
      descricao: '',
      dataAbertura: new Date(),
      dataFechamento: undefined,
      nivelProblema: '',
      status: '',
      tecnico: '',
    };
    this.submitted = false;
    this.chamadoDialog = true;
  }

openEncaminhamento(chamado: Chamado) {
  this.chamado = { ...chamado };
  this.chamado.nivelProblema = 'N2';
  this.chamadoDialog = true;
}

openFinalizar(chamado: Chamado) {
  this.chamado = { ...chamado };
  this.chamado.status = 'Fechado';
  this.chamadoDialog = true;
}
openAtender(chamado: Chamado) {
  this.chamado = { ...chamado };
  this.chamado.status = 'Em Andamento';
  this.chamadoDialog = true;
}

  editChamado(chamado: Chamado) {
    this.chamado = { ...chamado };
    this.chamadoDialog = true;
  }

  deleteChamado(chamado: Chamado) {
    this.chamados = this.chamados.filter((c) => c.id !== chamado.id);
  }

  saveChamado() {
    this.submitted = true;

    if (this.chamado.titulo.trim()) {
      if (this.chamado.id) {
        const index = this.chamados.findIndex((c) => c.id === this.chamado.id);
        if (index !== -1) this.chamados[index] = this.chamado;
      } else {
        this.chamado.id = this.gerarId();
        this.chamados.push(this.chamado);
      }

      this.chamados = [...this.chamados];
      this.chamadoDialog = false;
      this.chamado = {} as Chamado;
    }
  }

  hideDialog() {
    this.chamadoDialog = false;
    this.submitted = false;
  }

  gerarId(): string {
    return (
      'CH' +
      Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0')
    );
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'Aberto':
        return 'success';
      case 'Em Andamento':
        return 'warn';
      case 'Fechado':
        return 'danger';
      default:
        return 'info';
    }
  }

  getSeverity(nivel: string) {
    switch (nivel) {
      case 'N1':
        return 'success';
      case 'N2':
        return 'warn';
      case 'N3':
        return 'danger';
      default:
        return '';
    }
  }
}

