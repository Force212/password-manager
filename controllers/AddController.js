class AddController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.initialize();
    }
    
    initialize() {
        this.view.render();
        this.setupEventHandlers();
        
        // Bind the add button in the main UI
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
        return true; // Notify success to App controller
    }
    
    handleCloseModal() {
        this.view.hide();
        this.view.clear();
    }
}