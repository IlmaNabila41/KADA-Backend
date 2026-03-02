# 🛍️ Product CRUD API

A simple RESTful API built with **Node.js, Express, and MongoDB (Mongoose)** that implements full CRUD functionality. This project was created as a backend learning exercise focusing on routing, database integration, and basic error handling.

---

## 🚀 Features

* Create new products
* Read all products
* Read product by ID
* Update product
* Delete product
* Basic error handling (404 & 500 responses)

---

## 🧠 API Concept

This API represents a **Product Catalog / Entertainment Media Product**, where each product stores metadata such as title, genre, and rating. It can be used as a base for a watchlist or catalog system.

### Example Fields

* `title` – Name of the product/media
* `type` – Media type (e.g., K-Drama, Movie)
* `genre` – Category
* `author` – Creator or director
* `year` – Release year (Number)
* `rating` – User rating (Number)
* `isFavorite` – Boolean flag

---

## 🛠 Tech Stack

* Node.js (ES Modules)
* Express.js
* MongoDB
* Mongoose

---

## 📂 Project Structure

```
KADA-BACKEND
│
├── config/
│   └── connection.js        # MongoDB connection setup
│
├── controllers/
│   └── controller.js        # Express router (CRUD endpoints)
│
├── models/
│   ├── schemas/
│   │   └── product.js       # Mongoose schema definition
│   ├── index.js             # Model export aggregator
│   └── model.js             # Product model entry point
│
├── node_modules/
├── .env
├── .gitignore
├── data.json
├── index.js                 # Main server entry
├── package.json
└── package-lock.json
```

---

## 📡 API Endpoints

> Base route depends on how the router is mounted (e.g., `/products`).

### 🔹 Get All Products

**GET** `/products`

Returns all products from the database.

---

### 🔹 Get Product by ID

**GET** `/products/:id`

Returns a single product by MongoDB ObjectId.

**Responses:**

* `200` → Product found
* `404` → Data not found
* `500` → Server error

---

### 🔹 Create Product

**POST** `/products`

Create a new product.

**Required fields:**

* title
* type
* genre
* author
* year (Number)
* rating (Number)

---

### 🔹 Update Product

**PUT** `/products/:id`

Update an existing product by ID.
Returns the updated document using `{ new: true }`.

---

### 🔹 Delete Product

**DELETE** `/products/:id`

Deletes a product by ID.

**Response**

```json
{
  "message": "Data deleted successfully"
}
```

---

## ⚠️ Error Handling

This API includes basic error handling:

* `404 Not Found` → Returned when data does not exist
* `500 Internal Server Error` → Returned for unexpected errors

Some endpoints use async/await with try-catch, while others use promise `.then().catch()` handling.

---

## 📌 Learning Goals

This project was built to practice:

* REST API fundamentals
* MongoDB CRUD operations
* Mongoose modeling
* Async vs Promise handling
* Basic backend folder structure
* Error handling in Express

---

## 👩‍💻 Author

Built as part of a backend learning journey and portfolio development.
