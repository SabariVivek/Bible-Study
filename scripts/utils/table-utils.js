/**
 * TABLE-UTILS.JS - Common table utility functions with pagination
 * Reusable table components for Bible Study application
 */

class TableManager {
    constructor(config) {
        this.config = {
            containerId: config.containerId,
            tableId: config.tableId,
            tableBodyId: config.tableBodyId,
            paginationId: config.paginationId,
            showingCountId: config.showingCountId,
            prevBtnId: config.prevBtnId,
            nextBtnId: config.nextBtnId,
            paginationControlsId: config.paginationControlsId,
            itemsPerPage: config.itemsPerPage || 10,
            columns: config.columns || [],
            onRowClick: config.onRowClick || null,
            data: [],
            currentPage: 1,
            filteredData: [],
            sortColumn: null,
            sortDirection: 'asc'
        };
        
        this.init();
    }

    init() {
        this.renderTable();
        this.setupEventListeners();
    }

    renderTable() {
        const container = document.getElementById(this.config.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="table-container">
                <table class="table" id="${this.config.tableId}">
                    <thead>
                        <tr>
                            ${this.config.columns.map(col => {
                                if (col.sortable) {
                                    return `<th class="sortable" data-column="${col.key}">
                                        ${col.header}
                                        <span class="sort-icon">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
                                                <path d="M7 14L12 9L17 14H7Z" fill="currentColor" opacity="0.4"/>
                                            </svg>
                                        </span>
                                    </th>`;
                                } else {
                                    return `<th>${col.header}</th>`;
                                }
                            }).join('')}
                        </tr>
                    </thead>
                    <tbody id="${this.config.tableBodyId}">
                        <!-- Table content will be populated by JavaScript -->
                    </tbody>
                </table>
            </div>
        `;
        
        // Setup sorting event listeners
        this.setupSortingListeners();
    }

    setupEventListeners() {
        // Store this instance globally for onclick handlers
        if (!window.tableManagers) {
            window.tableManagers = {};
        }
        window.tableManagers[this.config.containerId] = this;
    }

    setData(data) {
        this.config.data = data;
        this.config.filteredData = [...data];
        this.config.currentPage = 1;
        this.updateTable();
    }
    
    filterData(filterFn) {
        this.config.filteredData = this.config.data.filter(filterFn);
        this.config.currentPage = 1;
        this.updateTable();
    }

    updateTable() {
        const tbody = document.getElementById(this.config.tableBodyId);
        if (!tbody) {
            // If table doesn't exist, re-render it completely
            this.renderTable();
            return;
        }

        tbody.innerHTML = '';

        // Show all items without pagination
        const itemsToShow = this.config.filteredData;

        itemsToShow.forEach((item, index) => {
            const row = document.createElement('tr');
            row.className = 'table-row';
            row.style.cursor = 'pointer';
            
            if (this.config.onRowClick) {
                row.onclick = () => this.config.onRowClick(item, index);
            }

            // Generate cells based on column configuration
            const cells = this.config.columns.map(col => {
                if (col.render) {
                    return col.render(item, index);
                } else {
                    return `<td class="${col.className || ''}">${this.getNestedValue(item, col.key) || ''}</td>`;
                }
            }).join('');

            row.innerHTML = cells;
            tbody.appendChild(row);
        });

        this.updateShowingCount();
        
        // Ensure sorting listeners are attached
        this.setupSortingListeners();
        
        // Update sort indicators if a column is sorted
        if (this.config.sortColumn) {
            this.updateSortIndicators();
        }
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    updateShowingCount() {
        const showingCount = document.getElementById(this.config.showingCountId);
        if (showingCount) {
            showingCount.textContent = `Showing ${this.config.filteredData.length}`;
        }
    }

    getCurrentData() {
        return this.config.filteredData;
    }

    getTotalPages() {
        return Math.ceil(this.config.filteredData.length / this.config.itemsPerPage);
    }

    getCurrentPage() {
        return this.config.currentPage;
    }

    setupSortingListeners() {
        const tableElement = document.getElementById(this.config.tableId);
        if (!tableElement) return;

        const sortableHeaders = tableElement.querySelectorAll('.sortable');
        sortableHeaders.forEach(th => {
            th.style.cursor = 'pointer';
            
            // Remove old event listener if exists by cloning the node
            const newTh = th.cloneNode(true);
            th.parentNode.replaceChild(newTh, th);
            
            // Add new event listener
            newTh.addEventListener('click', () => {
                const column = newTh.getAttribute('data-column');
                this.handleSort(column);
            });
        });
    }

    handleSort(column) {
        // Toggle direction if clicking the same column, otherwise start with ascending
        if (this.config.sortColumn === column) {
            this.config.sortDirection = this.config.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.config.sortColumn = column;
            this.config.sortDirection = 'asc';
        }

        // Sort the data
        this.sortData(column, this.config.sortDirection);

        // Update sort indicators
        this.updateSortIndicators();

        // Re-render table
        this.updateTable();
    }

    sortData(column, direction) {
        const columnConfig = this.config.columns.find(col => col.key === column);
        
        this.config.filteredData.sort((a, b) => {
            let valueA = this.getNestedValue(a, column);
            let valueB = this.getNestedValue(b, column);

            // Handle numeric sorting for verses
            if (column === 'verses') {
                valueA = parseInt(valueA) || 0;
                valueB = parseInt(valueB) || 0;
                return direction === 'asc' ? valueA - valueB : valueB - valueA;
            }

            // Handle string sorting (for name, etc.)
            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (direction === 'asc') {
                return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
            } else {
                return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
            }
        });
    }

    updateSortIndicators() {
        const tableElement = document.getElementById(this.config.tableId);
        if (!tableElement) return;

        const unsortedIcon = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
                <path d="M7 14L12 9L17 14H7Z" fill="currentColor" opacity="0.4"/>
            </svg>
        `;
        
        const ascendingIcon = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 14L12 9L17 14H7Z" fill="currentColor"/>
            </svg>
        `;
        
        const descendingIcon = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
            </svg>
        `;

        // Reset all sort icons
        const sortableHeaders = tableElement.querySelectorAll('.sortable');
        sortableHeaders.forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
            const icon = th.querySelector('.sort-icon');
            if (icon) {
                icon.innerHTML = unsortedIcon;
            }
        });

        // Set active sort indicator
        if (this.config.sortColumn) {
            const activeHeader = tableElement.querySelector(`.sortable[data-column="${this.config.sortColumn}"]`);
            if (activeHeader) {
                activeHeader.classList.add(this.config.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
                const icon = activeHeader.querySelector('.sort-icon');
                if (icon) {
                    icon.innerHTML = this.config.sortDirection === 'asc' ? ascendingIcon : descendingIcon;
                }
            }
        }
    }
}

// Utility function to create status badges
function createStatusBadge(status, type = 'default') {
    const statusMap = {
        'righteous': { class: 'status-righteous', text: 'Righteous' },
        'good': { class: 'status-good', text: 'Good' },
        'evil': { class: 'status-evil', text: 'Evil' },
        'wicked': { class: 'status-wicked', text: 'Wicked' },
        'mixed': { class: 'status-mixed', text: 'Mixed' },
        'bold': { class: 'status-righteous', text: 'Bold' },
        'gentle': { class: 'status-good', text: 'Gentle' },
        'faithful': { class: 'status-neutral', text: 'Faithful' }
    };

    const statusKey = status.toLowerCase();
    const statusInfo = statusMap[statusKey] || { class: 'status-neutral', text: status };
    
    return `<span class="status-badge ${statusInfo.class}">${statusInfo.text}</span>`;
}

// Utility function to create info button
function createInfoButton(onClickHandler, index) {
    return `<td class="info-cell">
        <button class="info-btn audio-btn" onclick="event.stopPropagation(); ${onClickHandler}(${index})">
            <div class="audio-icon-animated">
                <div class="sound-bar bar1"></div>
                <div class="sound-bar bar2"></div>
                <div class="sound-bar bar3"></div>
                <div class="sound-bar bar4"></div>
            </div>
        </button>
    </td>`;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TableManager, createStatusBadge, createInfoButton };
}

// Make available globally
window.TableManager = TableManager;
window.createStatusBadge = createStatusBadge;
window.createInfoButton = createInfoButton;
