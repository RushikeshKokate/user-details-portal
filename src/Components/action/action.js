 export const SAVE_FORM_DATA = 'SAVE_FROM_DATA'
 export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA'

 export const saveFormData =(data)=>({
    type: SAVE_FORM_DATA,
    payload: data
 })

 export const updateFormData=(data)=>({
   type: UPDATE_FORM_DATA,
   payload: data
 })