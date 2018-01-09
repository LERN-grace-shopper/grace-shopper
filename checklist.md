# Project Overview / Checklist
---
---


## Unauthenticated Users
Similar to Amazon, your site should support browsing its products without having to create an account. All users who visit your site should be able to perform the following activities:

As a visitor, I want to...

**PRODUCTS**
+ ~~view the full list of products (the product catalog), so that I can see everything that's available~~
+ ~~refine product listings by category, so that I can narrow down my choices to see only the types of items I'm interested in~~
+ search product listings, so that I can find specific products I want by name
+ ~~view the details for an inidivdual product (including product descriptions, photos and reviews), so that I can determine whether that particular item fits my needs~~

**CART**
+ add items to my cart from the product listing or product detail pages, so that I can purchase them later
+ remove items from my cart, in case I decide I don't want an item anymore
+ edit/remove quantities of items in the cart, in case I decide I want more or less of a particular item
+ refresh the page and have the cart persist, so that I don't lose my work (you may use sessionStorage, localStorage, cookies or JWT for this)
+ be able to log in to my account and continue editing that same cart, so that I don't lose any progress I made before I logged in

**CHECKOUT**
+ purchase items in the cart, so that I can get the items I want
+ specify a shipping address and email address when I checkout, so that the items can arrive at the right place
+ receive a confirmation email after I checkout, so that I know my order is being looked at
+ receive a notification email when the order ships, and then when the order is delivered, so that I can stay up to date on when my order will arrive

**ACCOUNT MANAGEMENT**
+ be able to create an account, so that I can perform activities like leaving reviews
+ be able to login with either Google or Facebook, so that I don't need to remember a new password to have an account


## Authenticated Users
Once a user has created an account, they can continue to do everything that unauthenticated users can, plus the following activities:

As a logged-in user, I want to...

**ACCOUNT MANAGEMENT**
+ be able to log out, so that someone else can't just come along and use my account
+ view my list of previous orders, so that I can find and individual order I made in the past and review it
+ view the details of a past order, including...
```
Current order status
Items with quantity and subtotal
Link to the original product detail page
Date/time order was created -> so that I can remember exactly what I ordered and when
```

**REVIEWS**
+ be able to leave reviews for products (including text and a 5-star rating), so that I can share my experiences with other visitors

## Admin Users
Administrative users are employees of GraceShopper™ and can manage the site, product listing and currently available items. You can choose how you want to make this functionality available. You could choose to have a separate dashboard for admins, or perhaps an admin would visit similar views but with augmented capabilities. For example, perhaps if an admin clicks on a photo, they are prompted to change the photo by uploading a picture.

As an admin user, I want to...

**PRODUCT MANAGEMENT**
+ create and edit products with name, description, price and one or more photos, so that visitors can see the latest info on what we have to offer
+ create categories for items, so that users can continue to have useful filters as our inventory grows in variety
+ add/remove categories from items, so that users will see them when they refine their searches
Acceptance Criteria: items must have multiple categories
+ manage the availability of a product, so that users will know whether or not they can purchase that product
```
Acceptance Criteria: If a product is no longer available, users will not see it while browsing, but they can view the product detail page if they've ordered it previously or have a direct link. On that product detail page, it should say "Currently Unavailable"
```

**ORDER MANAGEMENT**
+ view a list of all orders, so that I can find specific orders to review
+ filter orders by status (Created, Processing, Cancelled, Completed), so that I can more easily find the orders I'm interested in
+ view details of a specific order, so that I can review it and update its status
+ change the status of the order (Created -> Processing, Processing -> Cancelled || Completed), so that others will know what stage of the process the order is in

**USER MANAGEMENT**
+ promote other user accounts to have admin status, so that new administrators can have the same privileges I have
+ delete a user, so users who should not be able to log in anymore cannot
+ trigger password reset for a user (that is, the next time they successfully log in with their old password, they are prompted for a new one), so that I can be proactive in getting users to change their passwords after a period of time

## Data Validations
As you work on your data models, please consider the types of data that you will receive, what you want to make required and how you will propagate those errors to the user.

**Products**
+ Must have title, description, price, and inventory quantity
+ Must belong to at least one category
+ If there is no photo, there must be a placeholder photo used

**Users**
+ Users must have a valid email address
+ Users email must be unique

**Order**
+ Orders must belong to a user OR guest session (authenticated vs unauthenticated)
+ Orders must contain line items that capture the price, current product ID and quantity
+ If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes

**Reviews**
+ All reviews must belong to a product
+ All reviews must belong to a user
+ All reviews must be at least X characters
