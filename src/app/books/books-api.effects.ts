import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { BooksService } from '../shared/services';
import { BooksPageActions, BooksApiActions } from './actions';

@Injectable()
export class BooksApiEffects {
  constructor(private actions$: Actions, private booksService: BooksService) {}

  getAllBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.enter),
      mergeMap((action) => {
        return this.booksService
          .all()
          .pipe(map((books) => BooksApiActions.booksLoadedSuccess({ books }))),
          catchError((error) => of('Books Loaded Failure')
      })
    );
  });
}
