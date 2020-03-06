namespace App {
    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }

    export function validateInput(validatableInput: Validatable): boolean {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().length !== 0;
        }
        if ( // Because if `!= null` is also include check for undefine!!
            validatableInput.minLength != null &&
            typeof validatableInput.value === 'string'
        ) {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (
            validatableInput.maxLength != null &&
            typeof validatableInput.value === 'string'
        ) {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }

        if (validatableInput.min != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value >= validatableInput.min
        }
        if (validatableInput.max != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value <= validatableInput.max
        }
        return isValid
    }
}