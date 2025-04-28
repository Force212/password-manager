class EditController {
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
        this.view.bindEditPassword(this.handleEditPassword.bind(this));
        this.view.bindCloseModal(this.handleCloseModal.bind(this));
    }
    
    showEditModal(id) {
        this.currentId = id;
        const password = this.model.getPasswordById(id);
        if (password) {
            this.view.render(password);
            this.view.show();
        }
    }
    
    handleEditPassword(updatedData) {
        if (this.currentId) {
            this.model.updatePassword(this.currentId, updatedData);
            this.view.hide();
            this.listController.displayPasswords();
            this.currentId = null;
        }
    }
    
    handleCloseModal() {
        this.view.hide();
        this.currentId = null;
    }
}