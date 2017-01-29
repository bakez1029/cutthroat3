/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarbersComponent } from './barbers.component';

describe('BarbersComponent', () => {
  let component: BarbersComponent;
  let fixture: ComponentFixture<BarbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
