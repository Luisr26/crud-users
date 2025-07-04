// Import necessary libraries for UI, HTTP requests, and notifications
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

// Base URL for the products API endpoint
const url = 'http://localhost:3000/products';

/**
 * Fetches all products from the API and renders them in the table
 * @param {string} url - The API endpoint URL
 */
async function getProducts(url) {
    try {
        const responseAPI = await axios.get(url);
        const products = responseAPI.data;
        // Iterate through each product and render it in the table
        products.forEach(product => {
            const { id, Product, Quantity, Price, Category, Company } = product;
            tableRendering(id, Product, Quantity, Price, Category, Company);
        });
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

/**
 * Creates a new product via API POST request
 * @param {string} url - The API endpoint URL
 * @param {Object} productData - The product data to be created
 * @returns {Object} The created product data
 */
async function createProduct(url, productData) {
    try {
        const response = await axios.post(url, productData);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error); // Changed from Spanish
        throw error;
    }
}

/**
 * Updates an existing product via API PUT request
 * @param {string} url - The API endpoint URL
 * @param {string} id - The product ID to update
 * @param {Object} productData - The updated product data
 * @returns {Object} The updated product data
 */
async function updateProducts(url, id, productData) {
    try {
        const response = await axios.put(`${url}/${id}`, productData);
        return response.data;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

/**
 * Deletes a product via API DELETE request
 * @param {string} url - The API endpoint URL
 * @param {string} id - The product ID to delete
 */
async function deleteProducts(url, id) {
    try {
        await axios.delete(`${url}/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error); // Changed from Spanish
    }
}

/**
 * Renders a product row in the HTML table
 * @param {string} id - Product ID
 * @param {string} nameProduct - Product name
 * @param {number} quantityProduct - Product quantity
 * @param {number} priceProduct - Product price
 * @param {string} categoryProduct - Product category
 * @param {string} companyProduct - Product company
 */
function tableRendering(id, nameProduct, quantityProduct, priceProduct, categoryProduct, companyProduct) {
    const tBody = document.querySelector('tbody');
    success("Product successfully loaded"); // Changed from Spanish
    // Insert HTML row with product data and action buttons
    tBody.insertAdjacentHTML("beforeend", `
        <tr class="table-active" data-id="${id}">
            <td class="name-product">${nameProduct}</td>
            <td class="quantity-product">${quantityProduct}</td>
            <td class="price-product">${priceProduct}</td>
            <td class="category-product">${categoryProduct}</td>
            <td class="company-product">${companyProduct}</td>
            <td>
                <div class="container-btn">
                    <button class="btn-form btn-update">Update</button>
                    <button class="btn-form btn-delete">Delete</button>
                </div>
            </td>
        </tr>
    `);
}

/**
 * Displays an error notification toast
 * @param {string} text - The error message to display
 */
function error(text) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({ icon: "error", title: text });
}

/**
 * Displays a success notification toast
 * @param {string} text - The success message to display
 */
function success(text) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({ icon: "success", title: text });
}

// Global variable to track which row is being edited
let rowToEdit = null;

// Main application logic - executed when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load all products when page loads
    getProducts(url);

    // Get DOM elements for form handling
    const btnSave = document.querySelector('#btn-save');
    const tBody = document.querySelector('tbody');
    const modalElement = document.getElementById('myModal');
    const options = { backdrop: 'static', keyboard: false };
    const myModal = new bootstrap.Modal(modalElement, options);

    // Event listener for saving new products
    btnSave.addEventListener('click', async (e) => {
        e.preventDefault();

        // Get form input values
        const Product = document.querySelector('#name-input').value.trim();
        const Quantity = document.querySelector('#quantity-input').value.trim();
        const Price = document.querySelector('#price-input').value.trim();
        const Category = document.querySelector('#category').value;
        const Company = document.querySelector('#company-input').value.trim();

        // Validate that all fields are filled
        if (!Product || !Quantity || !Price || !Category || !Company) {
            error("You must enter valid values to continue");
            return;
        }

        try {
            // Check if product with same name already exists
            const existingProducts = await axios.get(url);
            const exists = existingProducts.data.some(p => p.Product.toLowerCase() === Product.toLowerCase());

            if (exists) {
                error("A product with that name already exists.");
                return;
            }

            // Create new product object with generated UUID
            const id = uuidv4();
            const productData = {
                id,
                Product,
                Quantity: Number(Quantity),
                Price: Number(Price),
                Category,
                Company
            };

            // Save product to API and update UI
            await createProduct(url, productData);
            success("Product successfully created");
            tableRendering(id, Product, Quantity, Price, Category, Company);

            // Clear form inputs after successful creation
            document.querySelector('#name-input').value = "";
            document.querySelector('#quantity-input').value = "";
            document.querySelector('#price-input').value = "";
            document.querySelector('#category').value = "";
            document.querySelector('#company-input').value = "";
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    });

    // Event delegation for update and delete buttons in table rows
    tBody.addEventListener('click', (event) => {
        event.preventDefault();
        const clickedButton = event.target;

        // Handle update button click
        if (clickedButton.classList.contains('btn-update')) {
            const row = clickedButton.closest('tr');
            rowToEdit = row;

            // Populate modal form with current product data
            document.querySelector('#new-name').value = row.querySelector('.name-product').textContent.trim();
            document.querySelector('#new-quantity').value = row.querySelector('.quantity-product').textContent.trim();
            document.querySelector('#new-price').value = row.querySelector('.price-product').textContent.trim();
            document.querySelector('#new-category').value = row.querySelector('.category-product').textContent.trim();
            document.querySelector('#new-company').value = row.querySelector('.company-product').textContent.trim();

            // Show update modal
            myModal.show();
        }

        // Handle delete button click
        if (clickedButton.classList.contains('btn-delete')) {
            const row = clickedButton.closest('tr');
            const id = row.dataset.id;

            // Show confirmation dialog before deletion
            Swal.fire({
                title: "Are you sure you want to delete this?", // Changed from Spanish
                text: "This action cannot be undone",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Delete",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Delete from API and remove from UI
                    await deleteProducts(url, id);
                    row.remove();
                    Swal.fire("Deleted", "This product has been removed.", "success");
                }
            });
        }
    });

    // Event listener for update modal save button
    document.querySelector('.update-btn-modal').addEventListener('click', async (e) => {
        e.preventDefault();
        if (!rowToEdit) return;

        // Get updated values from modal form
        const updatedName = document.querySelector('#new-name').value.trim();
        const updatedQuantity = document.querySelector('#new-quantity').value.trim();
        const updatedPrice = document.querySelector('#new-price').value.trim();
        const updatedCategory = document.querySelector('#new-category').value;
        const updatedCompany = document.querySelector('#new-company').value.trim();

        // Validate updated values
        if (!updatedName || !updatedQuantity || !updatedPrice || !updatedCategory || !updatedCompany) {
            error("You must enter valid values to continue");
            return;
        }

        // Prepare updated product data
        const id = rowToEdit.dataset.id;
        const productData = {
            Product: updatedName,
            Quantity: Number(updatedQuantity),
            Price: Number(updatedPrice),
            Category: updatedCategory,
            Company: updatedCompany
        };

        try {
            // Update product via API
            await updateProducts(url, id, productData);

            // Update UI with new values
            rowToEdit.querySelector('.name-product').textContent = updatedName;
            rowToEdit.querySelector('.quantity-product').textContent = updatedQuantity;
            rowToEdit.querySelector('.price-product').textContent = updatedPrice;
            rowToEdit.querySelector('.category-product').textContent = updatedCategory;
            rowToEdit.querySelector('.company-product').textContent = updatedCompany;

            // Show success message and close modal
            success("Product updated successfully");
            myModal.hide();
            rowToEdit = null;
        } catch (error) {
            console.log(`Error: ${error}`);
            error("There was an issue updating the product.");
        }
    });
});