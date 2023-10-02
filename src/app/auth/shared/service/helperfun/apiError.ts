import { HttpResponse } from '@angular/common/http';

export const apiError = (reserror: any) => {
  let errors = [{ title: 'Error', detail: 'Ooops, something went wrong' }];

  if (reserror && reserror.error && reserror.error.errors) {
    errors = reserror.error.errors;
  }
  return errors;
};
