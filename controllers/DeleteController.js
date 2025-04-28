class DeleteController {
    constructor(model, view, listController) {
        this.model = model;
        this.view = view;
        this.listController = listController;
        this.currentId = null;
        
        this.initialize();
    }
    
    initialize() {
        this.setupEventHandlers();
    }
    
    setupEventHandlers() {
        this.view.bindConfirmDelete(this.handleConfirmDelete.bind(this));
        this.view.bindCancelDelete(this.handleCancelDelete.bind(this));
    }
    
    showDeleteModal(id) {
        this.currentId = id;
        this.view.show();
    }
    
    handleConfirmDelete() {
        if (this.currentId) {
            this.model.deletePassword(this.currentId);
            this.view.hide();
            this.listController.displayPasswords();
            this.currentId = null;
        }
    }
    
    handleCancelDelete() {
        this.view.hide();
        this.currentId = null;
    }
}