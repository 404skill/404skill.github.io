
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ProjectMarkdownContentProps {
  filePath: string;
  className?: string;
}

const ProjectMarkdownContent: React.FC<ProjectMarkdownContentProps> = ({ filePath, className = '' }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        
        // Get the markdown content based on the file path
        const markdownContent = getMarkdownContent(filePath);
        
        if (markdownContent) {
          setContent(markdownContent);
        } else {
          throw new Error("Failed to load markdown content");
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading markdown:", err);
        setError("Failed to load content");
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [filePath]);

  // Helper function to get markdown content based on file path
  const getMarkdownContent = (path: string): string => {
    // Import all markdown files statically
    const markdownFiles: Record<string, string> = {
      'library_management/0_overview.md': getLibraryManagementOverview(),
      'library_management/1_storing_users.md': getStoringUsers(),
      'library_management/2_creating_items.md': getCreatingItems(),
      'library_management/3_borrowing_and_returning.md': getBorrowingAndReturning(),
      'library_management/4_add_new_item_cds.md': getAddNewItemCds(),
      'library_management/5_promotion_system.md': getPromotionSystem(),
    };
    
    return markdownFiles[path] || '';
  };

  if (isLoading) {
    return <div className="animate-pulse p-4 bg-slate-100 rounded-md h-32"></div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 border border-red-300 rounded-md">{error}</div>;
  }

  return (
    <div className={`markdown-content prose prose-slate max-w-none ${className}`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

// Helper functions to return the markdown content as strings
function getLibraryManagementOverview(): string {
  return `# Library Management System — Overview

## Project Goal

In this project, you will build a backend system that manages a library's collection of items (books, magazines, DVDs, and CDs) and handles user memberships, borrowing, returning, and a promotion system. You'll apply Object-Oriented Programming (OOP) principles, containerize your application with Docker, and use a database (SQLite or a multi-service Docker Compose setup) to store data.

## Key Features

1. User Management
    * Create users with different membership levels (Student, Basic, Premium).
    * Track their borrowing history.

2. Item Catalog
    * Add various library items (books, magazines, DVDs, CDs).
    * Store each item's title, type, and availability status.

3. Borrowing & Returning
    * Implement borrowing rules based on membership limits.
    * Enforce due dates and item availability.

4. Promotion System
    * Grant users who have borrowed 15+ books in the last year a double book limit.

## Prerequisites

* Basic Programming Knowledge
You should be comfortable writing APIs in your chosen language (Node.js, Python, Java, etc.).

* Fundamental Database Skills
You'll need to read and write data to SQLite or another database.

* Familiarity with Docker
You must containerize your app. If you need a DB container (e.g., Postgres), you'll spin it up with Docker Compose.

## Learning Objectives

1. OOP Principles & API Design

    * Learn how to structure your backend around clear entities (User, Item, Borrowing Records, etc.).
    * Practice building RESTful endpoints for core CRUD operations.

2. Complex Business Rules
    * Enforce membership-based borrowing limits.
    * Track return dates and history.
    * Implement a promotion system based on borrowing frequency.

3. Environment Setup & Deployment
    * Gain experience creating a production-like environment using Docker.
    * Optionally orchestrate multiple services (API, DB) with Docker Compose.

4. Extensibility & Maintenance
    * Understand how modular architecture and clean code practices enable easier feature additions (e.g., new item types, membership tiers).

## What You'll End Up With

By the end of the project, you'll have a fully containerized backend that can:

* Create and manage library users with different memberships.
* Store and categorize library items (books, magazines, DVDs, and CDs).
* Handle borrowing and returning with membership limits enforced.
* Apply promotions to frequent borrowers (double book limit).
* Persist data in a database of your choice.

## Next Steps
* Review Your Environment: Make sure Docker is installed, and you're comfortable running images.
* Check Docker Compose: If you plan to use a separate DB, confirm you can spin up multi-container setups.
* Pick Your Language: If unsure, start with what you know best. Node.js or Python often have simpler boilerplates for junior developers.
* Move on to Step 1: Begin by setting up the core User and Item models, endpoints, and container configuration.`;
}

function getStoringUsers(): string {
  return `# Storing Users

## 1. Overview

Users in the Library Management System have:

- A **unique ID** (e.g., UUID).
- **Basic details**: \`name\` (string), \`email\` (string).
- A **membership type**: one of \`["student", "basic", "premium"]\`.

Each membership type enforces different borrowing limits (books, magazines, DVDs, CDs). You'll integrate these rules in later pages when implementing borrowing logic. For now, focus on **storing user data** and providing CRUD endpoints (if needed).

---

## 2. Data Model

### 2.1 Minimal Fields

1. \`user_id\`: Unique identifier (UUID or auto-increment integer).  
2. \`name\`: User's full name (string).  
3. \`email\`: User's email (string).  
4. \`membership_type\`: \`"student"\`, \`"basic"\`, or \`"premium"\`.

### 2.2 Optional Fields

- \`created_at\`: Timestamp of user creation (useful for auditing/logs).
- \`updated_at\`: Timestamp of last update.

> **Note**: Depending on your language or framework, you might use classes (\`class User\`), structs, or just plain objects. If you're using a SQL database, you'll likely define a \`users\` table.

---

## 3. Database Options

### 3.1 Storing Users with SQLite

If you're choosing **SQLite**:
- Create a \`.db\` file in your Docker container or on your local machine.
- Define a \`users\` table, for example:

  \`\`\`sql
  CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    membership_type TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  \`\`\`

- **Pros**: Self-contained, no extra Docker services needed.  
- **Cons**: Limited concurrency for large-scale apps.

### 3.2 Storing Users with Postgres/MySQL (Docker Compose)

If you prefer a more robust DB (Postgres, MySQL, etc.):

- Define your \`docker-compose.yml\` with both \`app\` and \`db\` services.  
- Create a \`users\` table in your DB. For example, in PostgreSQL:

  \`\`\`sql
  CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    membership_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  \`\`\`

- Make sure your app container can **connect** to the database container using environment variables (e.g., \`DB_HOST\`, \`DB_USER\`, etc.).

### 3.3 In-Memory or JSON File (for Prototyping)

- If you're just getting started or want a **quick prototype**, you can store users in a simple array or JSON file:

  \`\`\`js
  // Example for Node.js
  const users = [];

  function addUser(user) {
    users.push(user);
  }
  \`\`\`

- **Warning**: This won't persist data after your application restarts (unless you're reading/writing to a file). It's fine for local practice but less realistic.

> **Tip for Junior/Mid-Level**: If you're new to SQL, try SQLite first; if you're comfortable spinning up multi-container setups, go for Postgres or MySQL.  

---

## 4. Creating Users (Endpoint Design)

### 4.1 \`POST /users\`

**Goal**: Create a new user record in your data store (DB, in-memory, etc.).

1. **Request Body** example:
   \`\`\`json
   {
     "name": "Alice",
     "email": "alice@example.com",
     "membership_type": "student"
   }
   \`\`\`
2. **Validation**:
   - Check \`name\` and \`email\` are provided.
   - Check \`membership_type\` is one of \`["student", "basic", "premium"]\`.
3. **Implementation**:
   - Generate a unique ID (UUID or auto increment).
   - Insert the user into the **users** table (SQL) or array/file (non-SQL).
4. **Response** example:
   \`\`\`json
   {
     "user_id": "123e4567-e89b-12d3-a456-426614174000",
     "name": "Alice",
     "email": "alice@example.com",
     "membership_type": "student"
   }
   \`\`\`
5. **Status Codes**:
   - **201 Created** if successful.
   - **400 Bad Request** if validation fails.
   - **409 Conflict** if you want to handle duplicate emails with a special code (optional).

---

## 5. Reading Users (Optionally Expose More Endpoints)

Depending on your requirements, you may also provide endpoints to list or retrieve user details:

### 5.1 \`GET /users\`

- **Description**: Returns a list of all users.
- **Response**: An array of user objects.

### 5.2 \`GET /users/:id\`

- **Description**: Returns a single user by \`user_id\`.
- **Response**: The user object, or a 404 if not found.

---

## 6. Updating or Deleting Users (Optional)

You might want to allow membership changes or the ability to delete users entirely. Decide if that's relevant to your library system.

### 6.1 \`PUT /users/:id\` (Update)

- **Request Body** could include fields like \`membership_type\` if you allow changes.
- **Response**: The updated user.

### 6.2 \`DELETE /users/:id\`

- **Response**: Some success message if the user was removed, or 404 if not found.

---

## 7. Ensuring Data Integrity & Best Practices

1. **Unique Email**: Consider making \`email\` unique in your DB. Helps avoid duplicate accounts.
2. **Indexing**: If using SQL, index your \`email\` or \`membership_type\` if queries rely on them often.
3. **Timestamps**: \`created_at\` and \`updated_at\` can be automatically managed by your DB (using default values, triggers, or ORM features).
4. **Validation**: Always validate membership types to avoid data inconsistencies (\`"student"\`, \`"basic"\`, \`"premium"\` only).

---

## 8. Docker & Database Integration

### 8.1 SQLite in One Container

- Add SQLite to your Docker image (e.g., for Node.js: \`RUN npm install sqlite3\`).
- Store the \`.db\` file inside your container's filesystem.  
- **Pros**: Single container, no Compose needed.

### 8.2 Docker Compose with Postgres (Example)

- Add a \`db\` service to your \`docker-compose.yml\`.  
- In your \`app\` service, set environment variables (\`DB_HOST=db\`, \`DB_NAME=library\`, etc.).
- **Migrate** or create tables automatically on startup (using migration tools or custom scripts).

---

## 9. Testing User Storage

Before moving on to item storage or borrowing logic, **test** your user endpoints thoroughly:

1. **POST /users** to create new users.
2. **GET /users\`** or \`GET /users/:id\` to confirm user data is stored correctly.
3. (Optional) **PUT /users/:id** to edit user membership.
4. (Optional) **DELETE /users/:id** if supporting user removal.

Use a tool like **Postman**, **Insomnia**, or just **curl** to verify correct responses (including status codes).

---

## 10. Conclusion

You have now laid a **solid foundation** for user management in your Library Management System. With **unique user records** and basic membership types in place, you're ready to integrate the **next component**: **storing items** (books, magazines, DVDs, CDs) and eventually handling the **borrowing** logic that ties users to items.

**Next Page**: [Storing Items & Basic Catalog Management](#)  
*(Link to the next part of the instructions where you define item data models and implement endpoints for adding and viewing library items.)*

---

**Recap**: On this page, you learned how to:
- Create a \`users\` table or data structure.
- Implement an endpoint to add new users.
- Optionally retrieve/update/delete users as needed.
- Integrate database logic with Docker or Docker Compose.

With your users properly stored, you can move on to the **item** side of the library and eventually combine these to manage borrowing and returning.`;
}

function getCreatingItems(): string {
  return `# Creating Items

## Overview  
   In this second section of the Library Management System, you'll focus on defining and managing items that the library offers for borrowing. At this stage, the core item types are:
   - Books  
   - Magazines  
   - DVDs  

   Later, you'll add **CDs** (and potentially more) to the system. For now, make sure you can create, store, and retrieve these items in your chosen database or data structure.

## Data Model  
   - **item_id**  
     A unique identifier for each item (UUID, auto-increment integer, etc.).  
   - **name**  
     The title or name of the item (e.g., "Harry Potter and the Chamber of Secrets," "National Geographic," "The Lion King" DVD).  
   - **type**  
     One of ["book", "magazine", "dvd"] at this point. (You'll add "cd" later.)  
   - **status** (optional at this stage, but recommended)  
     Indicates if an item is "available" or "borrowed." This will be critical once you implement borrowing and returning logic.

## Database Options
   Similar to user storage, you can use:
   - A SQL database table, for example:
     \`\`\`
     CREATE TABLE items (
       item_id TEXT PRIMARY KEY,
       name TEXT NOT NULL,
       type TEXT NOT NULL,
       status TEXT DEFAULT 'available'
     );
     \`\`\`
   - SQLite or an in-memory approach if you want something simpler.  
   - A JSON file or in-memory array for quick prototyping.  

   Whichever method you choose, the structure should support at least the four fields listed above.

## Endpoints  

   a. **POST /items**  
   - **Purpose**: Create a new item record.  
   - **Request Body** example:
     \`\`\`
     {
       "name": "National Geographic - June Edition",
       "type": "magazine"
     }
     \`\`\`
   - **Implementation**:  
     1. Validate that \`name\` and \`type\` exist.  
     2. Ensure \`type\` is one of ["book", "magazine", "dvd"].  
     3. Generate a unique \`item_id\`.  
     4. Insert the item into your items table (SQL) or data store.  
   - **Response** example:
     \`\`\`
     {
       "item_id": "123e4567-e89b-12d3-a456-426614174020",
       "name": "National Geographic - June Edition",
       "type": "magazine",
       "status": "available"
     }
     \`\`\`
   - **Status Codes**:  
     - 201 Created if successful.  
     - 400 Bad Request if validation fails.  

   b. **GET /items** (optional but helpful)  
   - **Purpose**: Retrieve a list of all items.  
   - **Implementation**: Return an array of item objects from your data store.  
   - **Response** example:
     \`\`\`
     [
       {
         "item_id": "abc123",
         "name": "Harry Potter and the Chamber of Secrets",
         "type": "book",
         "status": "available"
       },
       {
         "item_id": "def456",
         "name": "Madagascar",
         "type": "dvd",
         "status": "available"
       }
     ]
     \`\`\`

   c. **GET /items/:id** (optional)  
   - **Purpose**: Retrieve a single item by its ID.  
   - **Response**: The item object, or a 404 if not found.

## Data Validation  
   - Make sure you only accept valid types ("book", "magazine", "dvd").  
   - You can extend your validation (for example, ensuring \`name\` is not empty).  

## Testing Your Item Endpoints  
   - Use Postman, curl, or a similar tool to create items via \`POST /items\`.  
   - Verify you can retrieve them with \`GET /items\` and optionally \`GET /items/:id\`.  
   - Check that your application handles error cases (missing name, invalid type, etc.) gracefully.

## Next Steps  
   After setting up item creation and retrieval, you'll be ready to tackle borrowing logic, which brings together Users and Items. You'll enforce membership-based borrowing limits and track which items are out on loan vs. available. That's where the \`status\` field on each item will become essential.  

   Continue to the next section where you'll learn how to implement and manage the borrowing/returning functionality.`;
}

function getBorrowingAndReturning(): string {
  return `# Borrowing & Returning Items

## Overview  
   Now that you can create and store both **users** and **items**, the next step is to implement the **core library functionality**: borrowing and returning. This is where you enforce membership limits, track which items are on loan, and manage due dates or borrowing durations (if your design includes them).  

## Membership Limits  
   Recall that each membership type has different borrowing limits for books, magazines, DVDs, and (later) CDs. For example:
   - **Student**: Up to 5 books, 5 magazines, 2 DVDs  
   - **Basic**: Up to 3 books, 3 magazines, 2 DVDs  
   - **Premium**: Up to 10 books, 5 magazines, 5 DVDs  

   In subsequent steps, you'll add CDs with their own limits.  

## Data Model Considerations  
   - **User**:  
     - Already has \`membership_type\`.  
     - You may want a convenient way to check how many items of each type the user currently holds.  
   - **Item**:  
     - Has \`status\`, which can be \`"available"\` or \`"borrowed"\`.  
   - **Borrowing Records** (optional):  
     - To track the date/time of borrowing, due dates, or return dates.  
     - This can be a dedicated SQL table (e.g., \`borrowings\`) or a sub-array of "history" within the user record, or both—depending on your design.

## Borrowing an Item

   **Endpoint**: \`POST /items/:id/borrow\`  

   **Request Body** (example):
   \`\`\`json
   {
     "user_id": "123e4567-e89b-12d3-a456-426614174000",
     "item_type": "book"
   }
   \`\`\`
   **Implementation Steps**:
   1. **Validate the user**: Confirm the \`user_id\` exists.  
   2. **Check membership limits**: How many items of this type does the user currently hold? Compare to allowed limit.  
   3. **Check the item**: Verify that the item with \`:id\` is found, and that \`type\` matches \`"book"\` (or user's requested item type).  
   4. **Check item availability**: Is \`status\` \`"available"\`? If not, return an error (e.g., 400 or 409).  
   5. **Borrow**:  
      - Update the item's \`status\` to \`"borrowed"\`.  
      - Optionally store a "borrowed_date" somewhere (item record or a separate "borrowing history" table/array).  
   6. **Respond** with 200 or 201 status code and a message indicating success (and possibly the new due date or borrowed date).

   **Error Handling** Examples:
   - 400 Bad Request if membership limit reached or item is already borrowed.  
   - 404 Not Found if user or item doesn't exist.

## Returning an Item

   **Endpoint**: \`POST /items/:id/return\`  

   **Request Body** (example):
   \`\`\`json
   {
     "user_id": "123e4567-e89b-12d3-a456-426614174000"
   }
   \`\`\`
   **Implementation Steps**:
   1. **Validate the user**: Confirm the \`user_id\` exists.  
   2. **Check the item**: Ensure the item with \`:id\` is found and is actually \`borrowed\`.  
   3. **Confirm who borrowed it**: Optionally verify that the item is borrowed by this specific user (if you're tracking that detail).  
   4. **Return**:  
      - Update \`status\` to \`"available"\`.  
      - Store a "returned_date" in the borrowing record or history.  
   5. **Respond** with a success code (200 OK).

   **Error Handling** Examples:
   - 400 Bad Request or 409 if item is not currently borrowed.  
   - 404 Not Found if user or item doesn't exist.

## Tracking Borrowing History  
   - **Goal**: Keep a record of all items a user has borrowed, including borrowed date and return date.  
   - **Possible Approaches**:  
     1. **Dedicated "History" Table**: Each row represents one borrow-return cycle (with \`borrowed_date\` and \`returned_date\`).  
     2. **Embedded Array in User**: For each borrow event, push an object into the user's \`history\`. Upon return, update that object's \`returned_date\`.  
   - **GET /users/:id/history** Example Response:
     \`\`\`json
     [
       {
         "item_id": "abc123",
         "item_type": "book",
         "borrowed_date": "2023-01-01",
         "returned_date": "2023-02-01"
       },
       {
         "item_id": "xyz789",
         "item_type": "dvd",
         "borrowed_date": "2023-03-10",
         "returned_date": null
       }
     ]
     \`\`\`

## Due Dates & Borrow Durations (Optional)  
   - Books: up to 3 months  
   - Magazines: 1 month  
   - DVDs: 1 month  
   - This is optional if you just want to track availability. But if you do, you might store a \`due_date\` during the borrow step and check if it's overdue on return.  

## Practical Tips  
   - **Updating Limits**: You might keep a count of how many items each user currently has borrowed per item type. This can be calculated in real-time from a "borrowings" table or stored as fields in the user record and updated each time something is borrowed or returned.  
   - **Conflicts**: If multiple users try to borrow the same item at once, ensure your code handles concurrency gracefully (if your project context requires it).  

## Testing Your Borrow/Return Logic  
   - Create a few users with different membership types.  
   - Create multiple items (books, magazines, DVDs).  
   - Attempt to borrow items until you hit the membership limit—ensure your API returns an error.  
   - Return items and verify they become available again.  
   - (Optional) Log or display due dates if you're implementing them.  

## Next Steps  
   With borrowing and returning logic in place, you have the **foundation** for a functioning library system. The next pages will cover:  
   - **Adding a new item type** (CDs).  
   - **Promotion System** that doubles book limits for power users (who borrow 15+ books).  
   - **Fines, Overdue Handling,** or other advanced features (optional).  

By the end of this section, your library should be able to handle the **core workflow** of checking out and returning library materials, respecting membership limits and item availability.`;
}

function getAddNewItemCds(): string {
  return `# Adding Music CDs

## Overview
   By now, your system can handle **books**, **magazines**, and **DVDs**. In this section, you'll **extend** your library catalog by introducing **music CDs** as a new item type. You'll also update membership rules so that each user type can borrow a certain number of CDs.

## New Item Type: "CD"  
   - **Borrow Duration** (if you're tracking): Up to 2 months.  
   - **Item Model**: Same structure as your existing items (\`item_id\`, \`name\`, \`type\`, \`status\`). You simply add \`"cd"\` as an allowed type.

## Membership Limits for CDs  
   - **Student**: Up to 2 CDs  
   - **Basic**: Up to 2 CDs  
   - **Premium**: Up to 4 CDs  
   Make sure you **enforce** these limits the same way you do for books, magazines, and DVDs.

## API Changes  

   - **POST /items**  
     - Accept \`"cd"\` in the \`type\` field.  
     - Example:
       \`\`\`json
       {
         "name": "Greatest Hits by Queen",
         "type": "cd"
       }
       \`\`\`
     - Store and return the item with \`status = "available"\` by default.

   - **Borrowing and Returning**  
     - Update any logic that checks membership limits so it includes CDs.  
     - Example: A Student can now hold 2 CDs at a time. If they already have 2 CDs borrowed, borrowing another CD should return a 400 Bad Request.

   - **Borrow Duration** (Optional)
     - If you're tracking durations, store a \`due_date\` for CDs that's 2 months from the borrowing date.

## Implementation Tips  
   - In your **borrow logic**, when a user requests a \`"cd"\`, your code should:
     1. Confirm user hasn't hit the CD borrowing limit.  
     2. Verify the item is actually \`"cd"\` and is \`"available"\`.  
     3. Mark it as \`"borrowed"\`, update user's borrowed count or borrowing record.  
   - In your **return logic**, ensure the item type \`"cd"\` is handled exactly like the others—just update the item's status to \`"available"\` and record a return date if you're tracking it.

## Testing with CDs  
   - **Create multiple CD items** via \`POST /items\` with \`"type": "cd"\`.  
   - **Borrow them** from different users (Student, Basic, Premium) to confirm each membership type's new limit is enforced.  
   - **Try exceeding the CD limit** to ensure your system returns an appropriate error.  
   - **Return** CDs to verify items become available again.

## Optional Additional Features  
   - **Genre or Artist Field**: Add fields like \`artist\` or \`genre\` if you want to practice more complex item attributes.  
   - **Extended Validation**: Maybe disallow empty \`name\` or enforce a pattern for \`artist\`.

## Next Steps
   With CDs integrated, your Library Management System now supports:
   - Multiple item types (books, magazines, DVDs, CDs).  
   - Different membership limits for each type.  
   - Borrowing and returning logic for all items.  

   The **final** major feature (in the core specification) is the **Promotion System**—which allows users who have borrowed 15+ books in the last year to double their book limit. Move on to the **next section** to implement promotions and see how it integrates with your existing borrowing logic.`;
}

function getPromotionSystem(): string {
  return `# Promotion System

## Overview
   You've successfully built a system where users can borrow and return items (books, magazines, DVDs, and CDs) with membership-specific limits. Now, you'll add a **promotion feature** that rewards avid readers by **doubling** their **book** borrowing limit if they meet certain criteria.

## Promotion Rules  
   - If a user has borrowed **15 or more books in the last year**, their book borrowing limit is **doubled**.  
   - This applies to all membership types. For example:
     - A Student can normally hold 5 books. If they're promotion-eligible, they can hold **10** books.  
     - A Premium member with a 10-book limit can borrow **20** books if they qualify.  

## Defining Promotion Eligibility  
   - **Time Window**: Count how many books were borrowed in the **past 12 months** (or 365 days from now).  
   - **Threshold**: If borrowed \`>= 15\` books in that period, set a "promotion-eligible" flag for the user.  

   **Implementation Approaches**  
   - **On-The-Fly Check**:  
     1. Each time a user attempts to borrow a **book**, look at their borrowing history for the last year.  
     2. If it's 15 or more, consider them promotion-eligible right away.  
   - **Cached/Stored Flag**:  
     1. When they borrow a book, calculate if they've reached the threshold.  
     2. Store a boolean (e.g., \`isPromotionEligible\`) on the user record.  
     3. Update it periodically or whenever a borrow action happens.

## Borrowing Logic
   - When a user attempts to borrow a **book**:
     1. Check how many books they've borrowed in the past 12 months.  
     2. If **>= 15**, override the standard membership limit with the **double** limit.  
     3. Continue normal checks (e.g., item availability).  

   **Example**:  
   - Student limit for books = 5.  
   - With promotion, limit = 10.  
   - If the user is promotion-eligible, treat their book limit as 10 instead of 5.

## Implementation Details  
   - **Borrowing History** is crucial. You need to store not just *whether* they borrowed items, but also *when*.  
   - If you're using a dedicated "borrowings" table, you might run a query like:
     \`\`\`sql
     SELECT COUNT(*) 
       FROM borrowings
      WHERE user_id = :userId
        AND item_type = 'book'
        AND borrowed_date >= :oneYearAgo
     \`\`\`
     If the result is \`>= 15\`, they're eligible.  
   - If you're storing history in-memory or in a JSON file, loop through the user's history entries, filter out those older than a year, and count how many are \`"book"\`.

## Endpoints (Optional Enhancements)  
   - **GET /users/:id/promotion-status**  
     - Returns an object indicating if the user is promotion-eligible and (if yes) what their new limit is.  
     - Example Response:
       \`\`\`json
       {
         "user_id": "123e4567-e89b-12d3-a456-426614174000",
         "promotion_eligible": true,
         "effective_book_limit": 10
       }
       \`\`\`
   - **PUT /users/:id/promotion-reset** (completely optional)  
     - If you want an admin to manually reset or revoke the promotion status for any reason.

## Testing Promotion Logic
   - Create a user and borrow **15 books** (you can do this quickly by auto-generating the borrow history if you want).  
   - Attempt to borrow a **16th** book:
     - Without the promotion, the user would normally be blocked if their limit is 5 or 10.  
     - With the promotion in effect, they should be allowed to exceed the normal membership cap.  
   - Ensure that the rule only applies to **books** (magazines, DVDs, and CDs remain unchanged).

## Performance Considerations (for the curious)  
   - If you're frequently checking large borrowing histories, you might need indexing or caching.  
   - For this project, a straightforward solution (counting rows or iterating over an array) is typically fine.

## Next Steps
   - With promotions in place, you have a **fully-featured** system covering user creation, item storage, borrowing/returning, and specialized membership logic.  
   - You can now:
     - Add **fines**, **overdue fees**, or **notifications**.  
     - Improve **search** functionality (e.g., find items by name).  
     - Implement **authentication** if you want to secure these endpoints.  

**Congratulations!**  
You've built a robust **Library Management System** that demonstrates real-world backend challenges—database design, membership logic, containerization, and advanced features like promotions. Whether you stop here or keep adding more features, you've laid a solid foundation.`;
}

export default ProjectMarkdownContent;
