/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { RaffleComponent } from './raffle.component';

describe('Component: Raffle', () => {
  it('should create an instance', () => {
    let component = new RaffleComponent();
    expect(component).toBeTruthy();
  });
});
