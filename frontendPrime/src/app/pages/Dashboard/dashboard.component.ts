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

interface Chamado {
  id: string;
  titulo: string;
  dataAbertura: Date;
  dataFechamento?: Date;
  nivel: string;
  status: string;
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
  ],
})
export class TableChamadosComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  chamados: Chamado[] = [];
  chamadoDialog: boolean = false;
  chamado!: Chamado;
  submitted: boolean = false;

  niveisProblema = [
    { label: 'Baixo', value: 'Baixo' },
    { label: 'Médio', value: 'Médio' },
    { label: 'Alto', value: 'Alto' },
    { label: 'Crítico', value: 'Crítico' },
  ];

  statusOptions = [
    { label: 'Aberto', value: 'Aberto' },
    { label: 'Em Andamento', value: 'Em Andamento' },
    { label: 'Fechado', value: 'Fechado' },
  ];

  ngOnInit() {
    this.loadChamados();
  }

  loadChamados() {
    this.chamados = [
      {
        id: 'CH001',
        titulo: 'Erro ao acessar o sistema',
        dataAbertura: new Date('2025-06-01'),
        dataFechamento: undefined,
        nivel: 'Crítico',
        status: 'Aberto',
      },
      {
        id: 'CH002',
        titulo: 'Solicitação de atualização',
        dataAbertura: new Date('2025-06-05'),
        dataFechamento: new Date('2025-06-10'),
        nivel: 'Médio',
        status: 'Fechado',
      },
    ];
  }

  openNew() {
    this.chamado = {
      id: '',
      titulo: '',
      dataAbertura: new Date(),
      dataFechamento: undefined,
      nivel: '',
      status: '',
    };
    this.submitted = false;
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
        return 'info';
      case 'Em Andamento':
        return 'warning';
      case 'Fechado':
        return 'success';
      default:
        return 'info';
    }
  }

  getSeverity(nivel: string) {
    switch (nivel) {
      case 'Crítico':
        return 'danger';
      case 'Alto':
        return 'warning';
      case 'Médio':
        return 'info';
      case 'Baixo':
        return 'success';
      default:
        return 'info';
    }
  }
}

