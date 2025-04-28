class EditView {
    constructor() {
        this.modal = document.getElementById('edit-modal');
        this.container = document.getElementById('edit-form-container');
        this.closeBtn = this.modal.querySelector('.close-btn');
    }

    render(password) {
        const formHTML = `
            <div class="form-container">
                <input type="hidden" id="edit-id" value="${password.id}">
                <div class="form-group">
                    <label for="edit-website">Website</label>
                    <input type="text" id="edit-website" required value="${password.website}">
                </div>
                <div class="form-group">
                    <label for="edit-username">Username</label>
                    <input type="text" id="edit-username" required value="${password.username}">
                </div>
                <div class="form-group">
                    <label for="edit-password">Password</label>
                    <input type="password" id="edit-password" required value="${password.password}">
                    <div class="password-strength">
                        <div class="password-strength-fill" id="edit-strength-bar"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="edit-notes">Notes (optional)</label>
                    <input type="text" id="edit-notes" value="${password.notes || ''}">
                </div>
                <div class="modal-actions">
                    <button type="button" class="google-btn secondary" id="cancel-edit">Cancel</button>
                    <button type="submit" class="google-btn" id="submit-edit">Save changes</button>
                </div>
            </div>
        `;

        this.container.innerHTML = formHTML;
        this.updateStrengthBar(password.password);
        this.bindPasswordStrength();
    }

    show() {
        this.modal.style.display = 'flex';
        document.getElementById('edit-website').focus();
    }

    hide() {
        this.modal.style.display = 'none';
    }

    updateStrengthBar(password) {
        const strengthBar = document.getElementById('edit-strength-bar');
        if (!strengthBar) return;
        
        const strength = this.calculateStrength(password);
        strengthBar.style.width = `${strength.score * 25}%`;
        strengthBar.style.backgroundColor = strength.color;
    }

    bindPasswordStrength() {
        const passwordInput = document.getElementById('edit-password');
        const strengthBar = document.getElementById('edit-strength-bar');
        
        passwordInput?.addEventListener('input', () => {
            const strength = this.calculateStrength(passwordInput.value);
            strengthBar.style.width = `${strength.score * 25}%`;
            strengthBar.style.backgroundColor = strength.color;
        });
    }

    calculateStrength(password) {
        let score = 0;
        
        // Length
        if (password.length > 0) score += 1;
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        
        // Complexity
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        
        // Cap at 4
        score = Math.min(score, 4);
        
        // Determine color
        let color;
        if (score < 2) color = '#d93025'; // Red
        else if (score < 4) color = '#f4b400'; // Yellow
        else color = '#0f9d58'; // Green
        
        return { score, color };
    }

    bindEditPassword(handler) {
        const submitBtn = document.getElementById('submit-edit');
        submitBtn?.addEventListener('click', () => {
            const id = document.getElementById('edit-id').value;
            const website = document.getElementById('edit-website').value.trim();
            const username = document.getElementById('edit-username').value.trim();
            const password = document.getElementById('edit-password').value;
            const notes = document.getElementById('edit-notes').value.trim();
            
            if (id && website && username && password) {
                handler({ id, website, username, password, notes });
            }
        });
    }

    bindCloseModal(handler) {
        // Close button
        this.closeBtn.addEventListener('click', handler);
        
        // Cancel button
        document.getElementById('cancel-edit')?.addEventListener('click', handler);
        
        // Click outside modal
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                handler();
            }
        });
    }
}