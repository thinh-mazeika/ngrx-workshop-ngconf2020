import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  exhaustMap,
  concatMap,
} from 'rxjs/operators';
import { BooksService } from '../shared/services';
import { BooksPageActions, BooksApiActions } from './actions';

@Injectable()
export class BooksApiEffects {
  constructor(private actions$: Actions, private booksService: BooksService) {}

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.enter),
      exhaustMap((action) => {
        return this.booksService.all().pipe(
          map((books) => BooksApiActions.booksLoadedSuccess({ books })),
          catchError((error) => of({ type: 'Books Loaded Failure' }))
        );
      })
    );
  });

  createBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.createBook),
      concatMap(({ book }) => {
        return this.booksService
          .create(book)
          .pipe(map((book) => BooksApiActions.bookCreated({ book })));
      })
    );
  });

  updateBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.updateBook),
      concatMap(({ bookId, changes }) => {
        return this.booksService
          .update(bookId, changes)
          .pipe(map((book) => BooksApiActions.bookUpdated({ book })));
      })
    );
  });

  deleteBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.deleteBook),
      mergeMap((action) => {
        return this.booksService
          .delete(action.bookId)
          .pipe(
            map(() => BooksApiActions.bookDeleted({ bookId: action.bookId }))
          );
      })
    );
  });
}
