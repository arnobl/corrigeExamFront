jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { describe, expect } from '@jest/globals';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CourseGroupService } from '../service/course-group.service';

import { CourseGroupDeleteDialogComponent } from './course-group-delete-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CourseGroup Management Delete Component', () => {
  let comp: CourseGroupDeleteDialogComponent;
  let fixture: ComponentFixture<CourseGroupDeleteDialogComponent>;
  let service: CourseGroupService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, CourseGroupDeleteDialogComponent],
      declarations: [],
      providers: [NgbActiveModal, provideHttpClient(), provideHttpClientTesting()],
    })
      .overrideTemplate(CourseGroupDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CourseGroupDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CourseGroupService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
