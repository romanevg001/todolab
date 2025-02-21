import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

export function getRouteParam$(key: string) {
  return inject(ActivatedRoute).params.pipe(
    map((params) => params[key])
  )
}