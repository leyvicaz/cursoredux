import { SAVE_DETAILS, SAVE_ERRORS, CLEAR_ERROS} from './actionsTypes';
import { emptyCart } from '../cart';
import { goToThankYou } from '../route';


function validate(details) {
    const {firstName, lastName, email, address } = details;
    let errors = {};

    if(!firstName){
        errors.firstName = 'Debe introducir su nombre';
    }
    if(!lastName){
        errors.lastName = 'Debe instroducir su apellido';
    }
    if(!email){
        errors.email = 'El email es obligatorio';
    }
    if(!address){
        errors.address = 'Debes especificar una dirección de envío';
    }

    return errors;
}

export function saveDetails(patch) {
    return {
        type : SAVE_DETAILS,
        payload : patch
    }
}

export function saveOrder(details){
    return (dispatch, getState) => {
        const errors = validate(details);
        if(Object.keys(errors).length > 0){
            dispatch({
                type: SAVE_ERRORS,
                errors
            })
        }else{
            dispatch({
                type: CLEAR_ERROS
            });
            dispatch(emptyCart());
            dispatch(goToThankYou());
        }
    }
}