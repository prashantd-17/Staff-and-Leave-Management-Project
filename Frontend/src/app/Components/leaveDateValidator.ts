import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function leaveDateValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get('leaveFrom')?.value;
    const end = group.get('leaveTo')?.value;

    if (start && end) {
      const startDate = new Date(start.year, start.month - 1, start.day);
      const endDate = new Date(end.year, end.month - 1, end.day);

      if (startDate > endDate) {
        return { dateInvalid: true };
      }
    }

    return null;
  };
}
