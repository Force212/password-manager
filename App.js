class App {
    constructor() {
        // Initialize model
        this.model = new PasswordModel();
        
        // Initialize views
        this.listView = new ListView();
        this.addView = new AddView();
        this.editView = new EditView();
        this.deleteView = new DeleteView();
        
        // Initialize controllers
        this.listController = new ListController(this.model, this.listView);
        this.addController = new AddController(this.model, this.addView);
        this.editController = new EditController(
            this.model, 
            this.editView, 
            this.listController
        );
        this.deleteController = new DeleteController(
            this.model,
            this.deleteView,
            this.listController
        );
        
        // Connect list view actions to controllers
        this.listView.bindEditPassword(id => {
            this.editController.showEditModal(id);
        });
        
        this.listView.bindDeletePassword(id => {
            this.deleteController.showDeleteModal(id);
        });
        
        // Listen for add password success to refresh list
        this.addController.handleAddPassword = (passwordData) => {
            this.model.addPassword(passwordData);
            this.addView.hide();
            this.addView.clear();
            this.listController.displayPasswords();
            return true;
        };
    }
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});