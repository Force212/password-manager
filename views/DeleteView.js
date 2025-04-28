class DeleteView {
    constructor() {
        this.modal = document.getElementById('delete-modal');
        this.confirmBtn = document.getElementById('confirm-delete');
        this.cancelBtn = document.getElementById('cancel-delete');
    }

    show() {
        this.modal.style.display = 'flex';
    }

    hide() {
        this.modal.style.display = 'none';
    }

    bindConfirmDelete(handler) {
        this.confirmBtn.addEventListener('click', handler);
    }

    bindCancelDelete(handler) {
        this.cancelBtn.addEventListener('click', handler);
        
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                handler();
            }
        });
    }
}