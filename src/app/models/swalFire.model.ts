/**
 * Model Use for set the default value of swal fire popup properties
 */

export class SwalFireModel {
    title: string;
    text: string;
    showCancelButton: boolean;
    showConfirmButton: boolean;
    cancelButtonColor: string;
    cancelButtonText: string;
    confirmButtonText: string;
    confirmButtonColor: string;
    reverseButtons: boolean;
    html: string;
    customClass: any;

    /**
     * Constructor block for assign a default value 
     * @param data 
     */
    constructor(data: Partial<SwalFireModel> = {}) {
        this.title = data.title || '';
        this.text = data.text || '';
        this.showCancelButton = data.showCancelButton !== undefined ? data.showCancelButton : true;
        this.cancelButtonColor = data.cancelButtonColor || '#72716f';
        this.showConfirmButton = data.showConfirmButton !== undefined ? data.showConfirmButton : true;
        this.confirmButtonText = data.confirmButtonText || 'OK';
        this.cancelButtonText = data.cancelButtonText || 'Cancel';
        this.confirmButtonColor = data.confirmButtonColor || '#2dcb31';
        this.reverseButtons = data.reverseButtons !== undefined ? data.reverseButtons : true;
        this.html = data.html || '';
        this.customClass = data.customClass || {
            cancelButton: 'sweet-alert-cancel-btn',
            title: 'sweet-alert-title',
            actions: 'sweet-alert-actions',
            htmlContainer: 'sweet-alert-html-container'
        }
    }
}