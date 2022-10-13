/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { IExam } from '../../entities/exam/exam.model';
import { ExamService } from '../../entities/exam/service/exam.service';
import { faEnvelope, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-resultatstudentcourse',
  templateUrl: './resultatstudentcourse.component.html',
  styleUrls: ['./resultatstudentcourse.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ResultatStudentcourseComponent implements OnInit {
  blocked = false;
  examid: string | undefined = undefined;
  studentsresult: any[] = [];
  showEmail = false;
  mailSubject = '';
  mailBody = '';
  exam: IExam | undefined;

  faEnvelope = faEnvelope;
  fatemperaturethreequarters = faTemperatureThreeQuarters;

  constructor(
    protected applicationConfigService: ApplicationConfigService,
    private http: HttpClient,
    private translate: TranslateService,
    private messageService: MessageService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    public confirmationService: ConfirmationService,
    public examService: ExamService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('examid') !== null) {
        this.examid = params.get('examid')!;

        this.examService.find(+this.examid).subscribe(e => {
          this.translate.get('scanexam.mailtemplate').subscribe(data => {
            this.exam = e.body!;
            this.mailSubject = this.translate.instant('scanexam.mailsubjecttemplate') + this.exam.name;
            this.mailBody = data;
          });
          this.loadEtudiants();
        });
        this.translate.onLangChange.subscribe(() => {
          this.translate.get('scanexam.mailtemplate').subscribe(data => {
            if (this.exam !== undefined) {
              this.mailSubject = this.translate.instant('scanexam.mailsubjecttemplate') + this.exam.name;
              this.mailBody = data;
            }
          });
        });
      }
    });
  }

  showEmailStudent(): void {
    this.showEmail = true;
  }

  envoiEmailEtudiant(): void {
    const mail = {
      subject: this.mailSubject,
      body: this.mailBody,
    };
    this.blocked = true;
    this.http.post(this.applicationConfigService.getEndpointFor('api/sendResult/' + this.examid), mail).subscribe(() => {
      this.showEmail = false;

      this.translate.get('scanexam.mailsent').subscribe(
        data => {
          this.blocked = false;
          this.messageService.add({
            severity: 'success',
            summary: data,
            detail: this.translate.instant('scanexam.mailsentdetails'),
          });
        },
        () => {
          this.blocked = false;
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('scanexam.mailnotsent'),
            detail: this.translate.instant('scanexam.mailnotsentdetails'),
          });
        }
      );
    });
  }
  gotoUE(): void {
    this.router.navigateByUrl('/exam/' + this.examid);
  }
  loadEtudiants(): void {
    this.blocked = true;
    this.http.get(this.applicationConfigService.getEndpointFor('api/showResult/' + this.examid)).subscribe(s => {
      // eslint-disable-next-line no-console
      this.studentsresult = s as any;
      this.blocked = false;
    });
  }

  exportExcel(): void {
    import('xlsx').then(xlsx => {
      let maxQuestion = 0;
      this.studentsresult.forEach(res => {
        // eslint-disable-next-line no-console
        for (const key in res.notequestions) {
          // eslint-disable-next-line no-prototype-builtins
          if (res.notequestions.hasOwnProperty(key)) {
            if (+key > maxQuestion) {
              maxQuestion = +key;
            }
          }
        }
      });
      this.studentsresult.forEach(res => {
        for (let i = 1; i <= maxQuestion; i++) {
          res['Q' + i] = undefined;
        }
      });

      this.studentsresult.forEach(res => {
        if (res['note'] !== undefined) {
          res['note'] = parseFloat(res['note'].replaceAll(',', '.'));
        }
        if (res['abi'] !== undefined) {
          res['abi'] = !!res['abi'];
        }
        for (const key in res.notequestions) {
          // eslint-disable-next-line no-prototype-builtins
          if (res.notequestions.hasOwnProperty(key)) {
            res['Q' + key] = parseFloat(res.notequestions[key].replaceAll(',', '.'));
          }
        }
      });
      const worksheet = xlsx.utils.json_to_sheet(this.studentsresult);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'students');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
