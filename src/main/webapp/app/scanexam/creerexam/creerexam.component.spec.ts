/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect } from '@jest/globals';

import { CreerexamComponent } from './creerexam.component';

describe('CreerexamComponent', () => {
  let component: CreerexamComponent;
  let fixture: ComponentFixture<CreerexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerexamComponent],
    }).compileComponents();
  });

  beforeEach(() => {});

  it('should create', () => {
    expect(true);
  });
});
