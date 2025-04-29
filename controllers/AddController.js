class AddController {
    constructor(model, view, listController) {
        this.model = model;
        this.view = view;
        this.listController = listController;
        
        this.initialize();
    }
    
    initialize() {
        this.view.render();
        this.setupEventHandlers();
        
        document.getElementById('add-btn').addEventListener('click', () => {
            this.view.clear();
            this.view.show();
        });
    }
    
    setupEventHandlers() {
        this.view.bindAddPassword(this.handleAddPassword.bind(this));
        this.view.bindCloseModal(this.handleCloseModal.bind(this));
    }
    
    handleAddPassword(passwordData) {
        this.model.addPassword(passwordData);
        this.view.hide();
        this.view.clear();
        this.listController.displayPasswords(); // Явное обновление списка
        return true;
    }
    
    handleCloseModal() {
        this.view.hide();
        this.view.clear();
    }
}