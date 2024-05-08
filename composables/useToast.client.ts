import { assign } from 'lodash'
import Swal, { SweetAlertOptions } from 'sweetalert2'

export default (options: SweetAlertOptions) => {
  const defaultOptions: SweetAlertOptions = {
    toast: true,
    position: 'top',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    target: '.main-content',
  }
  return Swal.fire(assign(defaultOptions, options))
}
